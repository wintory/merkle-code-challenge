import axios from 'axios'
import { DEFAULT_BLOCKCHAIN_URL } from '../constants/url'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || DEFAULT_BLOCKCHAIN_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 30000,
  },
})

export default axiosInstance
