import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='container allcenter flex-column'>
        <div>Home</div>
        <Link to='/boards'>게시판으로 이동</Link>
    </div>
  )
}

export default Home