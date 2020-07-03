import axios, { AxiosInstance } from 'axios'
import ServiceUnavailableError from './errors/ServiceUnavailableError'

type SignUpData = {
  user: {
    username: string,
    password: string,
    email: string,
    document: string
  },
  profile: {
    name: string,
    lastName: string,
    language: string,
    location: {
      city: string,
      country: string,
      state: string
    }
  }
}

const formatError = (err: any) => {
  const error = err.response ? err.response.data : new ServiceUnavailableError('auth', err.message)
  throw error
}

const login = (http: AxiosInstance) => (handle: string, password: string) =>
  http.post('/users/login', { handle, password })
    .then(({ data }) => data.token)
    .catch(formatError)

const signUp = (http: AxiosInstance) => (data: SignUpData) =>
  http.post('/users', data)
    .then(({ data }) => data)
    .catch(formatError)

const getMe = (http: AxiosInstance) =>
  (token: string) =>
    http.get('/me', { headers: { Authentication: `Bearer ${token}` } })

export function factory (baseURL: string) {
  const http = axios.create({
    baseURL,
    timeout: 5000
  })

  return {
    login: login(http),
    signUp: signUp(http),
    getMe: getMe(http)
  }
}

export type AuthService = ReturnType<typeof factory>

export default {
  factory
}
