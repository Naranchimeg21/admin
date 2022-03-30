import { callPost } from '../baseInstance'

const login = async (username: string, password: string) => {
  return await callPost('/auth/login', { username, password })
}

export { login }
