import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/BoardInsertForm.module.css'

const BoardInsertForm = ({ onInsert }) => {

  // state 선언
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [mainFile, setMainFile] = useState(null)    // files state 추가
  const [subFiles, setSubFiles] = useState(null)    // files state 추가

  const changeTtile = (e) => { setTitle(e.target.value) }
  const changeWriter = (e) => { setWriter(e.target.value) }
  const changeContent = (e) => { setContent(e.target.value) }
  
  // 파일 변경 이벤트 핸들러
  const changeMainFile = (e) => { setMainFile(e.target.files[0]) }
  const changeSubFiles = (e) => { setSubFiles(e.target.files) }

  const onSubmit = () => {
    // Content-Type : application/json
    // onInsert(title, writer, content)

    // 파일 업로드
    // multipart/form-data
    const formData = new FormData()
    formData.append('title',title)
    formData.append('writer',writer)
    formData.append('content',content)
    if (mainFile) {
      formData.append('mainFile',mainFile)
    }
    // 파일 데이터 추가
    if( subFiles ){
      for (let i = 0; i < subFiles.length; i++) {
        const file = subFiles[i];
        formData.append('fileList',file)
      }
    }

    // 해더
    const headers = {
      'Content-Type' : 'multipart/form-data'
    }

    onInsert(formData,headers)

  }
  return (
    <div className="container">
      <h1 className="title">게시글 쓰기</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" onChange={changeTtile} className={styles['form-input']}/>
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" onChange={changeWriter} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols={40} rows={10} onChange={changeContent} className={styles['form-input']}></textarea>
            </td>
          </tr>
          <tr>
            <td>메인 파일</td>
            <td><input type="file" onChange={changeMainFile}/></td>
          </tr>
          <tr>
            <td>서브 파일</td>
            <td><input type="file" onChange={changeSubFiles} multiple/></td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <Link to='/boards' className="btn">목록</Link>
        <button className="btn" onClick={onSubmit}>등록</button>
      </div>
    </div>
  )
}

export default BoardInsertForm