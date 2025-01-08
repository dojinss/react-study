import React, { useState } from 'react'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import './Card.css'


const Card = ({card}) => {
    
    // state 선언
    const [like,setIcon] = useState(false)
    const [likeCount,setCount] = useState(card.likes)

    // 이벤트 핸들러
    const handleLike = () => {
        setIcon( !like )

        !like ?
        setCount( likeCount + 1)
        :
        setCount( likeCount - 1)

    }
    // 좋아요 DB호출
    // const likeUP = async () => {
    //     const response = await await fetch("http://localhost:8080/products/like/"+ card.id,{method:"put"}) 
    //     const 
    // }

    return (
        <div className='card'>
            <img style={{
                width:"250px",
                height:"200px",
                objectFit:"cover"
            }} src={card.img} alt="상품이미지" />
            <div className="info-box" 
            style={{
                padding:"10px",
                display : 'flex',
                flexDirection : "column",
                justifyContent : "center",
                gap:"5px"

            }}>
                <button style={{ 
                    border:"none",
                    backgroundColor:"transparent",
                    display:"flex",
                    placeItems:"center",
                    padding:"10px",
                    height:"50px",
                    width:"100px",
                    border:"none"
                }}
                onClick={handleLike}
                >
                    {
                        like ? 
                        <Favorite style={{color:"#fa3156"}}/>
                        :
                        <FavoriteBorder style={{color:"#fa3156"}}/>
                    }

                    <span style={{
                        color:"#353535",
                        fontSize:"15px",
                        padding:"15px"

                    }}>{likeCount}</span>
                </button>

                <h3 className='title-text' style={{padding:"0",margin:"15px"}}>{card.title}</h3>
                <div className="content-box" style={{padding:"0"}}>
                    <p style={{color:"#666",padding:"0",margin:"0"}} className='content-text'>{card.content}</p>
                </div>

                
                
            </div>
        </div>
    )
}

export default Card