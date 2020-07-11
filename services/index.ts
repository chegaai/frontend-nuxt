import _Vue from 'vue'
import { Context } from '@nuxt/types'
import authService from './AuthService'
import eventService from './EventService'
import { Services, Config } from './types'

function getServices(baseURL: string): Services {
  return {
    auth: authService.factory(baseURL),
    events: eventService.factory(baseURL)
  }
}

export function getServicesFromContext(context: Context) {
  const baseURL = context.env?.API_BASE_URL ?? ''

  return getServices(baseURL)
}

export function install(Vue: typeof _Vue, config: Config) {
  if (Vue.prototype.$services) {
    return
  }

  Object.defineProperty(Vue.prototype, '$services', {
    get() {
      return getServices(config.baseURL)
    }
  })
}

export default { install, getServicesFromContext }
