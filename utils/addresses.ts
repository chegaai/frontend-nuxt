type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

export function getCountry(components: AddressComponent[]) {
  return components.find(({ types }) => types.includes('country'))?.short_name
}

export function getState(components: AddressComponent[]) {
  return components.find(({ types }) =>
    types.includes('administrative_area_level_1')
  )?.short_name
}

export function getCity(components: AddressComponent[]) {
  return components.find(
    ({ types }) =>
      types.includes('locality') ||
      types.includes('administrative_area_level_2')
  )?.long_name
}

export function extractFields(components: AddressComponent[]) {
  return {
    country: getCountry(components),
    state: getState(components),
    city: getCity(components)
  }
}
