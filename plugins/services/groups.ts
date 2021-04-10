import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { MakeRequest, serviceFactory } from './baseService'

const getAll = (makeRequest: MakeRequest) => ({
  getAll: () => makeRequest('get', '/groups')
})

export function factory(axios: NuxtAxiosInstance) {
  const { makeRequest } = serviceFactory(axios)

  return {
    ...getAll(makeRequest)
  }
}

export default { factory }
