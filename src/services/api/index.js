import axios from 'axios'

export function getAPIClient() {
  const api = axios.create({ baseURL: process.env.API_URL })

  return api
}

const api = getAPIClient()

export default api
