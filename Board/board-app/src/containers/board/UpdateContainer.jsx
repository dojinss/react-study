import React, { useEffect, useState } from 'react'
import BoardUpdateForm from '../../components/board/BoardUpdateForm'
import { useNavigate, useParams } from 'react-router-dom'
import * as api from '../../apis/boards'
import * as fileAPI from '../../apis/files'

const UpdateContainer = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [board, setBoard] = useState({})
  const [fileList, setFileList] = useState([])

  const getBoard = async () => {
    const data = await api.select(id)
    // console.dir(data)
    setBoard(data.board)
    setFileList(data.fileList)
  }

  // 다운로드
  const onDownload = async (id, fileName) => {
    // API 요청
    const response = await fileApi.download(id)
    // console.log(response)

    // 1. 서버에서 응답 받은 파일데이터를 blob 으로 변환
    const url = window.URL.createObjectURL(new Blob([response.data]))

    // 2. 브라우저를 통해 a 태그로 등록
    const link = document.createElement('a')
    link.setAttribute('download', fileName)
    link.href = url

    // 3. a태그의 다운로드 기능으로 요청
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  }

  // 수정 요청
  const onUpdate = async (formData,headers) => {
    try {
      const response = await api.update(formData,headers)
      console.dir(response)
      if (response.status == 200) {
        console.log(`수정 성공!!`)
        navigate(`/boards/${id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 삭제 요청
  const onDelete = async (id) => {
    try {
      const response = await api.remove(id)
      // console.dir(response)
      if (response.status == 200) {
        console.log(`삭제 성공!!`)
        navigate('/boards')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 파일 삭제 요청
  const onFileDelete = async (fileId) => {
    try {
      const response = await fileAPI.remove(fileId)
      // 요청 성공여부 체크
      if (response.status == 200) {
        console.log(`파일 삭제 성공!`)
        // 파일 목록 갱신
      }
      // 파일 목록 갱신
      reloadFiles()
    } catch (error) {
      console.error(error)
    }
  }
  // 선택한 파일 삭제 요청
  const onCheckedFilesDelete = async (idList) => {
    const fileIdList = idList.join(",")
    // console.log(fileIdList)
    try {
      const response = await fileAPI.removeChecked(fileIdList)
      // 요청 성공여부 판단
      if (response.status == 200) {
        console.log(`선택된 파일 삭제 성공!`)
      }
      // 파일 목록 갱신
      reloadFiles()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // 파일 목록 갱신
  const reloadFiles = async () => {
    const data = await api.select(id)
    const files = data.fileList

    setFileList(files)
  }

  useEffect(() => {
    getBoard()
  }, []);
  return (
    <>
      <BoardUpdateForm
        board={board}
        onUpdate={onUpdate}
        onDelete={onDelete}
        fileList={fileList}
        onDownload={onDownload}
        onFileDelete={onFileDelete}
        onCheckedFilesDelete={onCheckedFilesDelete}
      />
    </>
  )
}

export default UpdateContainer