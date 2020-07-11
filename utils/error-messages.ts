type Messages = Record<string, Record<string, string>>

const MESSAGES: Messages = {
  login: {
    unauthorized: 'Nome de usuário ou senha incorretos.'
  },
  signup: {
    user_already_exists: 'Já existe um usuário com esse RG, email ou login'
  }
}

export const getMessageFromCode = (module: string, code: string, defaultValue: string) =>
  MESSAGES[module] && MESSAGES[module][code] ? MESSAGES[module][code] : defaultValue

export const getMessageFromError = (module: string, error: any) =>
  error.error && error.error.code
    ? getMessageFromCode(module, error.error.code, error.message || 'Erro desconhecido')
    : `${error.message || 'Erro desconhecido'}`

export const getErrorFormatter = (module: string) => (error: any) => getMessageFromError(module, error)

export default {
  getMessageFromCode,
  getMessageFromError,
  getErrorFormatter
}
