import { LoginState } from './types'

export const state = (): LoginState => ({
  loggedIn: false,
  token: null,
  userData: {}
})
