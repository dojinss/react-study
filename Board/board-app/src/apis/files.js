import axios from "axios";

// 다운로드
export const download = (id) => axios.get(`/files/download/${id}`, {responseType:'blob'})
// 파일 삭제
export const remove = (id) => axios.delete(`/files/${id}`)
// 선택 파일 삭제
export const removeChecked = (idList) => axios.delete(`/files?idList=${idList}`)