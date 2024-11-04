import axios from 'axios';
import { API_URL } from '../utils/Config';

const apiUrl = API_URL
const axiosInstance = axios.create({
  baseURL: apiUrl, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;