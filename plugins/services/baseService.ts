import { NuxtAxiosInstance } from '@nuxtjs/axios'

type Method = 'get' | 'post' | 'put' | 'delete'

const cache: Record<string, any | null> = {}

export const serviceFactory = (axios: NuxtAxiosInstance) => ({
  makeRequest(method: Method, path: string, requestData?: any) {
    const cachedValue = cache[path]

    if (cachedValue) { return Promise.resolve(cachedValue) }

    return axios(path, { method, data: requestData })
      .then(response => response.data)
      .then((responseData) => {
        if (method !== 'get') { return responseData }

        setTimeout(() => {
          cache[path] = null as any
        }, 10000)

        cache[path] = responseData
        return responseData
      })
      .catch(err => err.response?.data || Promise.reject(err))
  }
})

export type MakeRequest = ReturnType<typeof serviceFactory>['makeRequest']
