import React, { useContext, useState } from 'react'
import "./UserForm.css"
import { LoginContext } from '../../contexts/LoginContextProvider'

const UserForm = ({ update , leave }) => {
  // 컨텍스트에 등록한 유저 정보 불러오기
  const { userInfo } = useContext(LoginContext)

  // 수정폼 전송
  const onSubmit = (e) => {
    e.preventDefault()   // submit 기본 동작 방지
    const form = e.target
    const username = form.username.value
    const password = form.password.value
    const name = form.name.value
    const email = form.email.value

    update({ username, password, name, email })
  }

  return (
    <div className="form">
      <h2>회원가입</h2>
      <form className="login-form" onSubmit={(e) => onSubmit(e)}>
        {/* 아이디 */}
        <div>
          <label htmlFor="username">username</label>
          <input type="text"
            name="username"
            id="username"
            placeholder='username'
            autoComplete='username'
            defaultValue={userInfo?.username}
            readOnly
            />
        </div>
        {/* 패스워드 */}
        <div>
          <label htmlFor="password">password</label>
          <input type="password"
            name="password"
            id="password"
            placeholder='password'
            autoComplete='password'
            required />
        </div>
        {/* 이름 */}
        <div>
          <label htmlFor="name">name</label>
          <input type="text"
            name="name"
            id="name"
            placeholder='name'
            autoComplete='name'
            defaultValue={userInfo?.name}
            required />
        </div>
        {/* 이메일 */}
        <div>
          <label htmlFor="email">email</label>
          <input type="email"
            name="email"
            id="email"
            placeholder='email'
            autoComplete='email'
            defaultValue={userInfo?.email}
            required />
        </div>
        <button type='submit' className='btn btn-form btn-login'>회원수정</button>
        <button type='button' onClick={()=>leave()} className='btn btn-form btn-leave'>회원탈퇴</button>
      </form>
    </div>
  )
}

export default UserForm