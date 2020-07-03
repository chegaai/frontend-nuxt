import { LoginState } from './types'

export const setToken = (state: LoginState, token: string) => {
  state.loggedIn = Boolean(token)
  state.token = token
}

export const setUserData = (state: LoginState, userData: any) => {
  state.userData = userData
}
