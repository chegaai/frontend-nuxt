import axios from 'axios'
import { ActionContext } from 'vuex'

import { LoginState } from './types'
import ls from '~/utils/local-storage'

type Context = ActionContext<LoginState, {}>

export const login = async ({ commit }: Context, token: string) => {
  const URL = `${process.env.API_BASE_URL}/profiles/me`

  const { data: userData } = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  ls.setItem('token', token)
  commit('setToken', token)

  ls.setItem('userData', userData)
  commit('setUserData', userData)
}

export const logout = ({ commit }: Context) => {
  ls.clearItem('token')
  commit('setToken', null)

  ls.clearItem('userData')
  commit('setUserData', {})
}
