import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: <string>import.meta.env.VITE_APP_API_URL,
})

const callGet = async (url: string) => {
  return await axiosInstance.get(url)
}

const callPost = async (url: string, body: object) => {
  return await axiosInstance.post(url, body)
}

const callPut = async (url: string, body: object) => {
  return await axiosInstance.post(url, body)
}

const callDelete = async (url: string) => {
  return await axiosInstance.delete(url)
}

export { callGet, callPost, callPut, callDelete }
