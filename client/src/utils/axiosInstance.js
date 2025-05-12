import axios from "axios"
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL:"http://localhost:4040",
   headers: {
    Authorization: `Bearer ${token}`
  },
    withCredentials: true,
})
export default axiosInstance