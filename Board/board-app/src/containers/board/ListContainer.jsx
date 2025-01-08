import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as api from '../../apis/boards'
import BoardList from '../../components/board/BoardList'

const ListContainer = () => {

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const navigator = useNavigate()


  const [boardList, setBoardList] = useState([])
  const [pagination, setPagination] = useState()
  const [page, setPage] = useState(query.get("page") ?? 1)
  const [count, setCount] = useState(query.get("count") ?? 5)
  const [size, setSize] = useState(query.get("size") ?? 5)
  const [pageList, setPageList] = useState([])

  const getList = async () => {
    const response = await api.list(page, size, count)
    setBoardList(response.list)
    setPagination(response.pagination)
  }
  // 페이지 이동
  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    navigator(`?page=${newPage}`)
  }
  // 한페이지당 보여줄 게시글 개수 변경
  const handleChangeSize = (e) => {
    setSize(e.target.value)
  }

  useEffect(() => {
    console.log(pageList)
  }, [pageList])

  useEffect(() => {
    const start = pagination?.start
    const end = (pagination?.end > pagination?.last) ? pagination?.last : pagination?.end
    setPageList(Array.from({ length: end - start + 1 }, (v, i) => start + i))
  }, [pagination])

  // 페이지 변경시 목록 갱신
  useEffect(() => {
    getList()
  }, [page, size, count])

  // 쿼리스트링이 변결될때마다 목록 갱신
  useEffect(() => {
    getList()
  }, [location.search]);

  return (
    <>
      <BoardList
        boardList={boardList}
      />
      {/* MUI/Pagination 컴포넌트 라이브러리 */}
      {
        (pagination?.total > 0) &&
        <div className="page-box">
          <Pagination
            count={pagination?.last}      // 총 페이지
            showFirstButton               // 처음 버튼
            showLastButton                // 마지막 버튼
            shape="rounded"               // 박스 모양
            onChange={handleChangePage}   // 페이지 변경시
            color="standard"              // 색상 설정 'primary' | 'secondary' | 'standard'
            page={Number(page)}           // 현재 페이지
            boundaryCount={1}             // 마지막 처음 양옆에 보여줄 페이지 개수
            siblingCount={count}          // 현재페이지 양옆에 보여줄 페이지 개수
          />
        </div>
      }
      {
        (pagination?.total > 0) &&
        <div className="page-box">
          {
            pageList.map((p) => (
              <Link to={`?page=${p}`} key={p}>{p}</Link>
            ))
          }
        </div>
      }
    </>
  )
}

export default ListContainer