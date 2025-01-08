import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter basename='/app'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route
          path='/boards/:id'
          element={<Board />}
        ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route
          path='/admin'
          element={isLoggedIn ? <Admin /> : <Navigate to='/login'/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to='/about'>About</Link>
      <br />
      <Link to='/boards/123'>Board</Link>
      <br />
      <Link to='/boards/123?category=공지사항&option=옵션'>BoardWithQuery</Link>
      <br />
      <Link to='/admin'>Admin</Link>
      <br />
      <Link to='/login'>Login</Link>
    </>
  )
}

function About() {
  return (
    <>
      <h1>About</h1>
      <Link to='/'>Home</Link>
    </>
  )
}

// 🔗 /boards/:id
function Board() {
  // useParams
  // : react-router v6 이상에서 부터 사용하는
  //   URL 경로에 정의된 파라미터를 가져오는 훅
  const { id } = useParams()

  // ?파라미터=값 가져오는 방법
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const category = query.get("category")
  const option = query.get("option")

  return (
    <>
      <h1>게시판</h1>
      <h5>게시물 ID : {id}</h5>
      <h5>카테고리 : {category}</h5>
      <h5>옵션 : {option}</h5>
      <Link to='/'>Home</Link>
    </>
  )
}

function Admin() {
  return (
    <>
      <h1>관리자</h1>
      <Link to='/'>Home</Link>
    </>
  )
}

function Login() {
  return (
    <>
      <h1>로그인</h1>
      <Link to='/'>Home</Link>
    </>
  )
}


export default App
