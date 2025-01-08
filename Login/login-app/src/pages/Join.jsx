import React from 'react'
import Header from '../components/Header/Header'
import JoinForm from '../components/join/JoinForm'
import * as user from '../apis/auth'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../apis/alert'

const Join = () => {
  const navigator = useNavigate()
  // 회원 가입 요청
  const join = async (form) => {

    console.log(form)

    let response
    let data
    let status
    try {
      response = await user.join(form)
    } catch (error) {
      console.error(error)
    }

    data = response.data
    status = response.status
    if (status == 201 || status == 200) {
      // console.log(`회원가입 성공! data : ${data}`)
      const title = `회원가입 성공`
      const text = `환영합니다.`
      const icon = `success`
      Swal.alert(
        title, text, icon, () => {
          navigator(`/login`)
        }
      )
    }
    else {
      // console.error(`가입 실패... data : ${data}`)
      const title = `회원가입 실패`
      const text = `가입에 실패했습니다.`
      const icon = `error`
      Swal.alert(title,text,icon)
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <JoinForm
          join={join}
        />
      </div>
    </>
  )
}

export default Join