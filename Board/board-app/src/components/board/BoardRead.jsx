import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/BoardRead.module.css'
import * as format from '../../utils/format'

const BoardRead = ({ board, fileList, onDownload }) => {
  return (
    <div className="container">
      <h1 className="title">게시글 읽기</h1>
      <h4>번호 : {board.id}</h4>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" readOnly defaultValue={board.title ?? ''} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" readOnly defaultValue={board.writer ?? ''} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
            {
              board.file &&
              <img className={styles['main-image']} src={`/api/files/img/${board.file?.id}`} alt={`${board.file?.originName}`} />
            }
              <textarea cols={40} rows={10} readOnly defaultValue={board.content ?? ''} className={styles['form-input']}></textarea>
            </td>
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
                      <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                    </div>
                    <div className="item">
                      <button className="btn" onClick={()=>onDownload(file.id,file.originName)}>다운로드</button>
                    </div>
                  </div>
                ))
              }
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <Link to='/boards' className="btn">목록</Link>
        <Link to={`/boards/update/${board.id}`} className="btn">수정</Link>
      </div>
    </div>
  )
}

export default BoardRead