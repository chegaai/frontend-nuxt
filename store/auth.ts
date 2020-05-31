export type LoginState = {
  loggedIn: boolean
  token: string | null
  userData: any
}

export const state = (): LoginState => ({
  loggedIn: false,
  token: null,
  userData: {}
})

const login = (state: LoginState, { token }: { token: string }) => {
  state.loggedIn = true
  state.token = token
}

export const mutations = {
  login
}