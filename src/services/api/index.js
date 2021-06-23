import axios from 'axios'

export function getAPIClient() {
  const api = axios.create({ baseURL: process.env.API_URL })

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@doc:token')

    if (!token) return config

    return {
      ...config,
      headers: { ...config.headers, 'x-access-token': token },
    }
  })

  return api
}

const api = getAPIClient()

export default api
