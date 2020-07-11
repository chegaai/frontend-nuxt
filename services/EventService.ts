import axios, { AxiosInstance } from 'axios'
import ServiceUnavailableError from './errors/ServiceUnavailableError'

const formatError = (err: any) => {
  const error = err.response ? err.response.data : new ServiceUnavailableError('auth', err.message)
  throw error
}

const getAll = (http: AxiosInstance) => () =>
  http
    .get('/events')
    .then(({ data }) => data)
    .catch(formatError)

export function factory(baseURL: string) {
  const http = axios.create({
    baseURL,
    timeout: 5000
  })

  return {
    getAll: getAll(http)
  }
}

export type EventService = ReturnType<typeof factory>

export default { factory }
