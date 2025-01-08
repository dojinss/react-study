import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react'


const App =() => {

  const count = (value) => {
    setData(data + value)
  }

  const [data, setData] = useState(0)
  return (
    <div className="container">
      <h1 className="header">카운터 앱</h1>
      <div className="counter">
        <button className='btn' onMouseDown={() => count(-1)}>-</button>
        <span className="count">{data}</span>
        <button className='btn' onMouseDown={() => count(1)}>+</button>
      </div>
    </div>
  )
}

export default App
