import { LoginState } from './types'

export const fullName = (state: LoginState) => `${state.userData?.name} ${state.userData.lastName}`
