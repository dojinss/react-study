import React from 'react'
import { useState } from 'react'

// props { product } 객체 구조 분해 할당
const ProductDetail = ({ product }) => {



    // state 선언
    const [quantity, setQuantity] = useState(1)

    // 변수 설정
    const min = 1
    const max = product.stock
    const delivery = 3000
    const total = product.price * quantity + delivery
    // 함수 선언
    const increase = () => {
        if (quantity < max) {
            setQuantity(quantity + 1)
        }
    }
    const decrease = () => {
        if (quantity > min) {
            setQuantity(quantity - 1)
        }
    }



    return (
        <div className="product-detail">
            <div className="item img">
                <img src={product.img} alt={product.name} />
            </div>
            <div className="item info">
                <div className="title">
                    <h1>{product.name}</h1>
                </div>
                <p>
                    <span className="txt-pt">INFO</span><br />
                    -편안한 착용이 가능한 폴라 디자인 <br />
                    -체형 커버가 가능한 베이직한 실루엣 <br />
                </p>
                <p>
                    <span className="txt-pt">Color & Size</span>
                    Black, Navy, Red <br />
                    85, 90, 95, 100, 110 <br />
                    - 어깨 53, 가슴 59, 암홀 23, 소매 62, 총장 68 <br />
                    (측정 방법에 따라 1~3cm 오차가 있을 수 있습니다) <br />
                </p>
                <span className="line-lg"></span>
                <div className="text-group">
                    <div className="item">
                        <span className="txt-pt">판매가</span>
                    </div>
                    <div className="item">
                        <span className="txt-pt">{Number(product.price).toLocaleString()} 원</span>
                    </div>
                </div>
                <div className="text-group">
                    <div className="item">
                        <span>배송비</span>
                    </div>
                    <div className="item">
                        <span>{delivery.toLocaleString()}원</span>
                    </div>
                </div>
                <span className="line-lg"></span>
                <div className="text-group">
                    <div className="item">
                        <span>Color</span>
                    </div>
                    <div className="item">
                        <select name="corlor" id="color">
                            <option value="Black">Black</option>
                            <option value="Navy">Navy</option>
                            <option value="Red">Red</option>
                        </select>
                    </div>
                </div>
                <div className="text-group">
                    <div className="item">
                        <span>Size</span>
                    </div>
                    <div className="item">
                        <select name="size" id="size">
                            <option value="XL">XL</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="S">S</option>
                        </select>
                    </div>
                </div>
                <div className="text-group">
                    <div className="item">
                        <span>수량</span>
                    </div>
                    <div className="item flex">
                        <button className="btn btn-xs" onClick={decrease}>-</button>
                        <input type="text" className='quantity' min={min} max={max} value={quantity} />
                        <button className="btn btn-xs" onClick={increase}>+</button>
                    </div>
                </div>
                <span className="line-lg"></span>
                <div className="text-group">
                    <div className="item">
                        <span className="txt-pt">최종 가격</span>
                    </div>
                    <div className="item">
                        <span className="txt-pt">{total.toLocaleString()}원</span>
                    </div>
                </div>
                <div className="text-group flex gap-1">
                    <div className="item">
                        <button className="btn btn-lg">구매하기</button>
                    </div>
                    <div className="item flex">
                        <button className="btn btn-lg btn-outline">장바구니</button>
                        <button className="btn btn-lg btn-outline">관심상품</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail