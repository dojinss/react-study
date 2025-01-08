import React, { useEffect, useState } from 'react'
import Card from './Card'

const CardList = () => {
    // Card 컴포넌트에 전달할 데이터

    // 해당 변수를 세팅하는 함수 [변수, 함수] 함수 호출하면 변수를 변경시킨다
    // 바로 실시간으로 반영이된다.
    const [cardData, setData] = useState([]) 

    // async 비동기 선언
    // await 비동기 완료될때까지 기다림
    const productList = async () => {
        const response      = await fetch("http://localhost:8080/products") // await 는 함수 앞  = 뒤
        const productList   = await response.json()
        setData(productList)
    }

    // 훅 ?
    useEffect(() => {
        productList()
    }, []);


    return (
        <div>
            <h1>상품 목록</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                gap: "20px"
            }}>
                {
                    cardData.map((card, index) => {
                        return <Card
                            key={card.no}
                            card={card}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default CardList