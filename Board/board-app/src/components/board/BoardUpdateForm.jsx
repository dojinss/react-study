import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/BoardUpdateForm.module.css'
import * as format from '../../utils/format';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import Checkbox from '@mui/material/Checkbox';

const BoardUpdateForm = ({
  board,
  fileList,
  onDownload,
  onUpdate,
  onDelete,
  onFileDelete,
  onCheckedFilesDelete
}) => {
  // console.dir(board)
  // state 선언
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [checkedFiles, setCheckedFiles] = useState([])
  const [mainFile, setMainFile] = useState(null)    // files state 추가
  const [subFiles, setSubFiles] = useState(null)    // files state 추가
  const [existMain, setExistMain] = useState(board.file && true)
  const [mainChecked, setMainChecked] = useState(false)

  // id 값
  const id = board.id

  // onChage 함수
  const changeTtile = (e) => { setTitle(e.target.value) }
  const changeWriter = (e) => { setWriter(e.target.value) }
  const changeContent = (e) => { setContent(e.target.value) }

  // 파일 변경 이벤트 핸들러
  const changeMainFile = (e) => { setMainFile(e.target.files[0]) }
  const changeSubFiles = (e) => { setSubFiles(e.target.files) }

  // submit 함수
  const onSubmit = () => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)
    if (mainFile) {
      formData.append('mainFile', mainFile)
    }
    // 파일 데이터 추가
    if (subFiles) {
      for (let i = 0; i < subFiles.length; i++) {
        const file = subFiles[i];
        formData.append('fileList', file)
      }
    }

    // 해더
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    onUpdate(formData, headers)
  }
  // 글 삭제
  const handleDelete = () => {
    const check = window.confirm(`정말로 삭제하시겠습니까?`)
    if (check) {
      onDelete(id)
      
    }
  }
  // 파일 삭제
  const handleFileDelete = (fileId,type) => {
    const check = window.confirm(`해당 파일을 삭제하시겠습니까?`)
    if (check) {
      onFileDelete(fileId)
      if(type == 'MAIN')
        setExistMain(false)
    }
  }

  // 체크 박스 클릭 핸들러
  const checkFileId = (fileId,type) => {

    let checked = false

    // 체크 여부 확인
    for (let i = 0; i < checkedFiles.length; i++) {
      const selectedFileId = checkedFiles[i];

      if (selectedFileId == fileId) {
        checkedFiles.splice(i, 1)
        checked = true
      }
    }

    if (!checked) {
      checkedFiles.push(fileId)
    }
    console.log(`체크한 아이디 : ${checkedFiles}`)
    setCheckedFiles(checkedFiles)
  }

  // 체크한 파일 삭제 핸들러
  const handleCheckedDelete = () => {
    const fileCount = checkedFiles.length
    const check = window.confirm(`선택한 파일 ${fileCount}개를 삭제하시겠습니까?`)
    if (check && onCheckedFilesDelete(checkedFiles)) {
      setCheckedFiles([])
    }
  }

  useEffect(() => {
    if (board) {
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
    return () => {
    }
  }, [board])


  return (
    <div className="container">
      <h1 className="title">게시글 수정</h1>
      <h4>번호 : {board.id}</h4>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" defaultValue={title} onChange={changeTtile} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" defaultValue={writer} onChange={changeWriter} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols={40} rows={10} defaultValue={content} onChange={changeContent} className={styles['form-input']}></textarea>
            </td>
          </tr>
          {
            !existMain
            &&
            <tr>
              <td>메인 파일</td>
              <td><input type="file" onChange={changeMainFile} /></td>
            </tr>
          }
          <tr>
            <td>서브 파일</td>
            <td><input type="file" onChange={changeSubFiles} multiple /></td>
          </tr>
          <tr>
            <td colSpan={2}>
              {
                fileList.map((file) => (
                  <div key={file.no} className='flex-box'>
                    <div className="item item-img">
                      {file.type == 'MAIN' && <span className='badge'>대표</span>}
                      <img src={`/api/files/img/${file.id}`} alt={file.originName}
                        className='file-img'
                      />
                      <Checkbox onClick={(e) => checkFileId(file.id, file.type)} />
                      <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                    </div>
                    <div className="item">
                      <button className="btn" onClick={() => onDownload(file.id, file.originName)}><DownloadIcon /></button>
                      <button className='icon-btn del' onClick={() => handleFileDelete(file.id,file.type)}><DeleteForeverIcon /></button>
                    </div>
                  </div>
                ))
              }
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <div className="btn-box">
          <Link to='/boards' className="btn">목록</Link>
          <button className="btn" onClick={handleCheckedDelete} >선택 삭제</button>
        </div>
        <div className='btn-box'>
          <button className="btn" onClick={onSubmit}>수정하기</button>
          <button className="btn del" onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
    </div>
  )
}

export default BoardUpdateForm