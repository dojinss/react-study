import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContextProvider'
import * as Swal from '../../apis/alert'

const LoginForm = () => {
  const navigator = useNavigate()
  const {login} = useContext(LoginContext)
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const username = form.username.value
    const password = form.password.value
    const check =  await login(username,password)
    if (check) {
      Swal.alert(`로그인 성공!`,`로그인에 성공하였습니다.`,`success`,()=>{
        navigator(`/`)
      })
    }
    else{
      Swal.alert(`실패`,`로그인에 실패하였습니다.`,`error`)
    }
  }
  return (
    <div className="form">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text"
            name="username"
            id="username"
            placeholder='username'
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password"
            name="password"
            id="password"
            placeholder='password'
          />
        </div>
        <button type="submit" className="btn btn-form">로그인</button>
      </form>
    </div>
  )
}

export default LoginForm