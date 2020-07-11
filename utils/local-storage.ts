export const setItem = (key: string, value: unknown) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  const value = localStorage.getItem(key)

  if (!value) {
    return
  }

  try {
    return JSON.parse(value)
  } catch (err) {
    if (typeof process !== undefined && process.env.NODE_ENV !== 'production') {
      console.error(err)
    }
    localStorage.removeItem(key)
  }
}

export const clearItem = (key: string) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  clearItem
}
