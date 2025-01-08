import React, { createContext, useEffect, useState } from 'react'
import * as auth from '../apis/auth'
import Cookies from 'js-cookie'
import api from '../apis/api'

// Context 생성
export const LoginContext = createContext()

const LoginContextProvider = ({ children }) => {

  //  로그인 여부
  const [isLogin, setIsLogin] = useState(false)
  // 사용자 정보
  const [userInfo, setUserInfo] = useState(null)
  // 사용자 권한
  const [userRoles, setUserRoles] = useState({ isUser: false, isAdmin: false })

  // 로그아웃 함수
  const logout = () => {
    Cookies.set('jwt', '', { expires: 0 })
    api.defaults.headers.common.Authorization = null
    setIsLogin(false)
  }

  // 로그인 함수
  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password)
      const status = response.status
      const data = response.data
      const headers = response.headers
      const authorization = headers.authorization
      const jwt = headers.authorization.replace('Bearer ', '')
      console.log(`status : ${status}`)
      if (status == 200) {
        // console.log(`로그인 성공!`)
        // console.dir(data)
        // console.log(headers)
        // console.log(`jwt : ${jwt}`)

        // JWT 쿠키에 등록
        Cookies.set('jwt', jwt, { expires: 5 })

        // JWT 를 헤더에 등록
        api.defaults.headers.common.Authorization = authorization

        // 로그인처리
        loginSetting(data)

        return true
      } else {
        console.log(`아이디/비밀번호가 올바르지 않습니다.`)
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }

  }

  // 자동 로그인
  const autoLogin = async () => {
    // 쿠키에서 JWT 꺼내기
    const jwt = Cookies.get('jwt')

    // JWT 존재시
    if (jwt) {

      // Authorization 에 JWT 등록
      api.defaults.headers.common.Authorization = `Bearer ${jwt}`

      // 사용자 정보 요청
      try {
        const response = await auth.info()
        const status = response.status
        const data = response.data
        // 성공시 로그인처리
        if (status == 200) {
          loginSetting(data)
        }
        // 조회된 데이터가 없을시
        if (status == 401 || data == 'UNAUTHORIZED') {
          console.log(`탈퇴된 회원이거나 올바르지 않은 접근입니다.`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // 로그인처리
  const loginSetting = (data) => {
    // 로그인 여부
    setIsLogin(true)
      
    // 정보 등록
    setUserInfo(data)

    // 권환 등록
    const updateRoles = { isUser: false, isAdmin: false }
    data.authList.forEach((obj) => {
      if (obj.auth == 'ROLE_USER') updateRoles.isUser = true
      if (obj.auth == 'ROLE_ADMIN') updateRoles.isAdmin = true
    })
    setUserRoles(updateRoles)
  }

  useEffect(() => {
    // 자동 로그인
    autoLogin()
  }, [])
  

  return (
    <LoginContext.Provider value={{ isLogin, logout, login, userInfo, userRoles }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider