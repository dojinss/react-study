import React from 'react'
import { useState } from 'react'

const Product = () => {

  // state
  const [qunatity, setQunatity] = useState(1)
  const price = 1000
  const total = price * qunatity
  
  // 이벤트 함수
  const increase = () => {
    setQunatity(qunatity + 1)
  }
  const decrease = () => {
    if (qunatity > 1) {
      setQunatity(qunatity - 1)
    }
  }
  return (
    <div>
      <h2>상품 정보</h2>
      <ul>
        <li>가격 : {price}</li>
        <li>수량 : {qunatity}</li>
        <li>총 가격 : {total}</li>
      </ul>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  )
}

export default Product