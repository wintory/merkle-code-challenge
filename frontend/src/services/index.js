import axios from "axios"

const DEFAULT_BLOCKCHAIN_URL = 'https://api.blockchain.com/v3/exchange'

const axiosInstance = axios.create({
  baseURL : import.meta.env.VITE_REACT_APP_API_URL || DEFAULT_BLOCKCHAIN_URL,
  headers: {
    "Content-Type": "application/json",
    timeout : 30000,
  }, 
});

export default axiosInstance;