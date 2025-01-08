import React, { createContext, useEffect, useState } from 'react'

// Context 생성
export const LoginContext = createContext()

const LoginContextProvider = ({children}) => {

  //  로그인 여부
  const [isLogin, setIsLogin] = useState(false)

  // 로그아웃 함수
  const logout = () => {
    setIsLogin(false)
  }

  useEffect(()=>{
    setTimeout(()=>{
      setIsLogin(true)
    },3000)
  },[])

  return (
    <LoginContext.Provider value={ {isLogin,logout}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider