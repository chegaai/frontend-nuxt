import 'vue'
import authService from './auth'
import eventService from './events'
import groupService from './groups'

export const factory = (app: any, inject: any) => {
  const { $axios: axios } = app

  const services = {
    auth: authService.factory(axios),
    events: eventService.factory(axios),
    groups: groupService.factory(axios)
  }

  inject('services', services)

  return services
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: ReturnType<typeof factory>
  }
}

export default factory
