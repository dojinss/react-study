import React from 'react'
import BoardInsertForm from '../../components/board/BoardInsertForm'
import * as api from '../../apis/boards'
import { useNavigate } from 'react-router-dom'

const InsertContainer = () => {

  const navigate = useNavigate()

  const onInsert = async (formData, headers) => {
    try {
      const response = await api.insert(formData, headers)
      console.dir(response)
      if (response.status == 201) {
        // console.log(`등록 성공!!`)
        navigate('/boards')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <BoardInsertForm onInsert={onInsert}/>
    </>
  )
}

export default InsertContainer