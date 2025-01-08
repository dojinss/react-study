import axios from 'axios'
axios.defaults.baseURL = `/api`

// 목록
export const list = (page, size, count) => 
    axios.get(`/boards?page=${page}&size=${size}&count=${count}`)
         .then(response=>response.data)
// 조회
export const select = (id) => axios.get(`/boards/${id}`).then(response=>response.data)
// 등록
export const insert = (formData, headers) => axios.post(`/boards`, formData, headers)
// 수정
export const update = (formData, headers) => axios.put(`/boards`,formData, headers)
// 삭제
export const remove = (id) => axios.delete(`/boards/${id}`)