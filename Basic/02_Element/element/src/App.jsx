import React from 'react'
import './App.css'

// 클래스형 컴포넌트
class App extends React.Component {
  render() {
    // React 엘리먼트 생성
    // 1️⃣ React Javascript 로 엘리먼트 생성
    const link = React.createElement('a',{
       href : 'http://google.com',
       target : '_blank',
       style: {color:'blue'}
    },'구글 사이트 바로 가기')

    const box = React.createElement('div',{
      className : 'box'
    }, 'Box')

    const element = React.createElement('div',null,
      React.createElement('h1',null,'hello Element'),
      React.createElement('p',null,'This is an Elemnet'),
      link,
      box
    )

    const element2 = (
      <div>
        <h1>Hello World</h1>
        <button>버튼</button>
        <a href="http://google.com">구글 바로가기</a>
      </div>
    )
    return element2
  }
}

export default App