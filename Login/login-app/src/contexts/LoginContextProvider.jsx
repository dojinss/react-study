import Cookies from 'js-cookie'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../apis/alert'
import api from '../apis/api'
import * as auth from '../apis/auth'

// Context 생성
export const LoginContext = createContext()

const LoginContextProvider = ({ children }) => {

  const navigator = useNavigate()
  // 로그인 여부
  const [isLogin, setIsLogin] = useState( localStorage.getItem("isLogin") ?? false)
  // 사용자 정보
  const [userInfo, setUserInfo] = useState( () =>{
    const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
    return savedUserInfo ?? null
  } )
  // 사용자 권한
  const [userRoles, setUserRoles] = useState(
    () =>{
      const savedUserRoles = JSON.parse( localStorage.getItem("userRoles") )
      return savedUserRoles ?? { isUser: false, isAdmin: false }
    }
  )
  console.log(`userInfo : ${userInfo}`)
  console.log(`userRoles : ${userRoles}`)
  console.log(`isLogin : ${isLogin}`)
  // 로그아웃 함수
  const logout = (force = false) => {
    if (force) {
      logoutSetting()
      navigator(`/`)
      return
    }
    else {
      Swal.confirm(`로그아웃 하시겠습니까?`, `로그아웃을 진행합니다`, `warning`,
        (result) => {
          if (result.isConfirmed) {
            Swal.alert(`로그아웃 성공`, `로그아웃 되었습니다.`, `success`)
            logoutSetting()
            navigator(`/`)
            return
          }
        }
      )
    }
  }

  // 로그아웃처리
  const logoutSetting = () => {
    api.defaults.headers.common.Authorization = undefined
    Cookies.remove(`jwt`)
    
    localStorage.removeItem("userInfo")
    localStorage.removeItem("userRoles")
    localStorage.removeItem("isLogin")

    setIsLogin(false)
    setUserInfo(null)
    setUserRoles({ isUser: false, isAdmin: false })
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
    localStorage.setItem("isLogin", "true")

    // 정보 등록
    setUserInfo(data)
    localStorage.setItem("userInfo",JSON.stringify(data))
    console.log(`[localStroage] userInfo : ${localStorage.getItem("userInfo")}`)

    // 권환 등록
    const updateRoles = { isUser: false, isAdmin: false }
    data.authList.forEach((obj) => {
      if (obj.auth == 'ROLE_USER') updateRoles.isUser = true
      if (obj.auth == 'ROLE_ADMIN') updateRoles.isAdmin = true
    })
    setUserRoles(updateRoles)
    localStorage.setItem("userRoles",JSON.stringify(updateRoles))
  }

  useEffect(() => {
    // 쿠키에서 JWT 꺼내기
    const jwt = Cookies.get('jwt')
    // Authorization 에 JWT 등록
    const authorization = `Bearer ${jwt}`
    api.defaults.headers.common.Authorization = authorization
    return () => {
      // 자동 로그인
      if (!localStorage.getItem("isLogin")) {
        autoLogin()
      }
    }
  },[])


  return (
    <LoginContext.Provider value={{ isLogin, logout, login, userInfo, userRoles }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider