const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const required = (value: string) =>
  !!value || 'Campo obrigatório'

const minSize = (size: number) => (value: string) =>
    (value?.length && value.length >= size) || `Pelo menos ${size} caracteres`

const email = (value: string) =>
  emailRegex.test(value) || 'Digite um email válido'

const regex = (regex: RegExp, message: string) => (value: string) =>
  regex.test(value) || message

export default {
  required,
  minSize,
  email,
  regex
}