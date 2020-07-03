import 'vue'
import { AuthService } from './AuthService'
import { EventService } from './EventService'

export type Services = {
  auth: AuthService
  events: EventService
}

export type Config = {
  baseURL: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: Services
  }
}
