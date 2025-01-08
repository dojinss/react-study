import axios from 'axios'
axios.defaults.baseURL = `/api`

const api = axios.create()

export default api