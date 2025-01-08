package com.aloha.login.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.login.domain.AuthenticationRequest;
import com.aloha.login.security.constants.SecurityConstants;
import com.aloha.login.security.props.JwtProps;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys; // 추가: 새로운 방식으로 SecretKey 생성을 위한 클래스
import lombok.extern.slf4j.Slf4j;

/**
 * JWT 토큰 생성
 * - 로그인 요청 -> 인증 -> JWT 생성
 * 
 * JWT 해석
 * - 인증 자원 요청 -> JWT 해석
 */
@Slf4j
@RestController
public class LoginController {

    @Autowired
    private JwtProps jwtProps; // secretKey

    /**
     * 👩‍💼➡🔐 : 로그인 요청을 통해 인증 시, JWT 생성
     * [POST] - /login
     * 💌 body :
     * {
     * "username" : "aloha",
     * "password" : "123456"
     * }
     * 
     * @param authReq
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authReq) {
        // 아이디 비밀번호
        String username = authReq.getUsername();
        String password = authReq.getPassword();
        log.info("username : " + username);
        log.info("password : " + password);

        // 사용자 권환 정보 세팅
        List<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");
        roles.add("ROLE_ADMIN");

        // 서명에 사용할 키 생성
        String secretKey = jwtProps.getSecretKey();
        byte[] signingKey = secretKey.getBytes();

        int day5 = 1000 * 60 * 60 * 24 * 5;
        // 🔴 JWT 생성
        String jwt = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), Jwts.SIG.HS512) // 알고리즘 설정
                .header() // 해더 설정
                .add("typ", SecurityConstants.TOKEN_TYPE) // typ : "jwt"
                .and() // payload 설정
                .claim("uid", username) // 사용자아이디
                .claim("rol", roles) // 권한
                .expiration(new Date(System.currentTimeMillis() + (day5))) // 만료시간
                .compact(); // 토큰 생성

        log.info("jwt : " + jwt);
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    /**
     * JWT 해석
     * 💥->💌 JWT
     * 
     * @param header
     * @return
     */
    @GetMapping("/user")
    public ResponseEntity<?> user(@RequestHeader(name = "Authorization") String authorization) {
        log.info("authorization : " + authorization);
        // Authorization : "Bearer " + (jwt)
        String jwt = authorization.substring(7);
        log.info("jwt : " + jwt);

        String secretKey = jwtProps.getSecretKey();
        byte[] signingKey = secretKey.getBytes();

        // JWT 해석 : 💥 -> 🤦‍♂️
        Jws<Claims> parsedToken = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(signingKey))
                .build()
                .parseSignedClaims(jwt);
        
        String username = parsedToken.getPayload().get("uid").toString();
        log.info("username : " + username);

        Object roles = parsedToken.getPayload().get("rol");
        List<String> roleList = (List<String>) roles;
        log.info("roles : " + roles);
        log.info("roles<List> : " + roleList);



        return new ResponseEntity<>(parsedToken.toString(),HttpStatus.OK);
    }

}