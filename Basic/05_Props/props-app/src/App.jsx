import './App.css'
import ProductDetail from './Component/ProductDetail'

function App() {
   // 객체 선언
   const product = {
      id: 'P101',
      name: '야자수',
      price: 52000,
      stock: 6,
      img: "http://i.imgur.com/1vpSkbW.png"
  }

  return (
    <>
      <ProductDetail product={product}/>
    </>
  )
}

export default App
