import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
   baseURL: 'http://localhost:3000/'
  //baseURL: 'http://192.168.0.101:3000/'
})

export default apiClient
