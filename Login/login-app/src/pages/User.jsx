import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../apis/alert'
import * as auth from '../apis/auth'
import Header from '../components/Header/Header'
import UserForm from '../components/user/UserForm'
import { LoginContext } from '../contexts/LoginContextProvider'

const User = () => {
  const navigator = useNavigate()
  const { isLogin, logout, userInfo } = useContext(LoginContext)
  const isInitialRender = useRef(true);

  // 회원 수정 요청
  const update = async (form) => {

    console.log(form)

    let response
    let data
    let status
    try {
      response = await auth.update(form)
    } catch (error) {
      console.error(error)
    }

    data = response.data
    status = response.status
    if (status == 201 || status == 200) {
      console.log(`회원 정보 수정 성공! data : ${data}`)
      const title = `회원 정보 수정 성공`
      const text = `다시 로그인 해주세요.`
      const icon = `success`
      Swal.alert(
        title, text, icon, () => {
          logout(true)
        }
      )
    }
    else {
      // console.error(`수정 실패... data : ${data}`)
      const title = `회원 정보 수정 실패`
      const text = `회원 정보 수정에 실패했습니다.`
      const icon = `error`
      Swal.alert(title, text, icon)
    }
  }

  // 회원 정보 탈퇴 요청
  const leave = async () => {
    try {
      const response = await auth.remove(userInfo.username)
      const data = response.data
      const status = response.status

      if (status == 200) {
        logout(true)
        Swal.alert(`회원탈퇴에 성공하였습니다.`, `다음에 또 만나요`, `success`,
          () => { navigator(`/`) }
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!isLogin) {
      navigator(`/login`)
    }
  }, [isLogin])


  return (
    <>
      <Header />
      <div className="container">
        <UserForm
          update={update}
          leave={leave}
        />
      </div>
    </>
  )
}

export default User