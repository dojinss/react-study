import React from 'react';
import { Link } from 'react-router-dom';
import * as format from '../../utils/format';
import styles from './css/BoardList.module.css';

const BoardList = ({boardList}) => {
  return (
    <div className="container">
      <h1 className="title">게시글 제목</h1>
      <Link to='/boards/insert' className='btn'>글쓰기</Link>
      <table border={1} className={`${styles.table}`}>
        <thead>
          <tr>
            <th width='50'>번호</th>
            <th width='50'></th>
            <th width='200'>제목</th>
            <th width='70'>작성자</th>
            <th width='200'>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.length == 0
            ?
            <tr>
              <td colSpan={5} align='center' style={{'height':'200px'}}>조회된 데이터가 없습니다.</td>
            </tr>
            :
            boardList.map((board) => (
              <tr key={board.id}>
                <td align='center'>{board.no}</td>
                <td align='center'>
                  <img src={`/api/files/img/${board.file?.id}`} />
                </td>
                <td>
                  <Link to={`/boards/${board.id}`}>{board.title}</Link>
                </td>
                <td align='center'>{board.writer}</td>
                <td align='center'>{format.formatDate(board.createdAt)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default BoardList