import axios from 'axios'
import {API_BASE_URL} from '../baseUrl'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message)
    return Promise.reject(error)
  }
)

export default apiClient
