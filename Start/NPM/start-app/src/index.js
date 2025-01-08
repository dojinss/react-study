import React from 'react';
import ReactDOM from 'react-dom/client';

// package.json 에서 type 속성을 지우면 생략가능
// module 로 되어있으면 확장자까지 작성해야함
import App from "./App";

const root =  ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)