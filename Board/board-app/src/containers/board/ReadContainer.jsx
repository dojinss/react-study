import React, { useEffect, useState } from 'react'
import BoardRead from '../../components/board/BoardRead'
import * as api from '../../apis/boards'
import * as fileApi from '../../apis/files'
import { useParams } from 'react-router-dom'

const ReadContainer = () => {
  const { id } = useParams()
  const [board, setBoard] = useState({})
  const [fileList, setFileList] = useState([])

  // 게시글 정보 불러오기
  const getBoard = async () => {
    const data = await api.select(id)
    console.dir(data)
    setBoard(data.board)
    setFileList(data.fileList)
  }

  // 다운로드
  const onDownload = async (id, fileName) => {
    // API 요청
    const response = await fileApi.download(id)
    console.log(response)

    // 1. 서버에서 응답 받은 파일데이터를 blob 으로 변환
    const url = window.URL.createObjectURL( new Blob( [response.data] ) )

    // 2. 브라우저를 통해 a 태그로 등록
    const link = document.createElement('a')
    link.setAttribute('download', fileName)
    link.href = url

    // 3. a태그의 다운로드 기능으로 요청
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  }

  useEffect(() => {
    getBoard()
  }, []);
  return (
    <>
      <BoardRead
        board={board}
        fileList = {fileList}
        onDownload = {onDownload}
      />
    </>
  )
}

export default ReadContainer