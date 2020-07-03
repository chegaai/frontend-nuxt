export const setItem = (key: string, value: any) => {
  if (typeof localStorage === 'undefined') { return }

  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
  if (typeof localStorage === 'undefined') { return }

  const value = localStorage.getItem(key)

  if (!value) { return }

  return JSON.parse(value)
}

export const clearItem = (key: string) => {
  if (typeof localStorage === 'undefined') { return }

  localStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  clearItem
}
