import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { MakeRequest, serviceFactory } from './baseService'

namespace Signup {
  export interface User {
    username: string
    password: string
    email: string
    document: string
  }

  export interface Location {
    city: string
    country: string
    state: string
  }

  export interface Profile {
    name: string
    lastName: string
    language: string
    location: Location
  }

  export interface Request {
    user: User
    profile: Profile
  }
}

const signup = (makeRequest: MakeRequest) => ({
  signup(data: Signup.Request) {
    return makeRequest('post', '/users', data)
  }
})

const getMe = (makeRequest: MakeRequest) => ({
  getMe() {
    return makeRequest('get', '/users/me')
  }
})

export function factory(axios: NuxtAxiosInstance) {
  const { makeRequest } = serviceFactory(axios)

  return {
    ...signup(makeRequest),
    ...getMe(makeRequest)
  }
}

export default { factory }
