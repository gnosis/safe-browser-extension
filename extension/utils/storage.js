export const loadStorage = () => {
  try {
    var serializedStorage = window.localStorage.getItem('safe')
    if (serializedStorage === null) {
      serializedStorage = undefined
    }

    return JSON.parse(serializedStorage)
  } catch (err) {
    return undefined
  }
}

export const saveStorage = (state) => {
  try {
    const savedStorage = state

    window.localStorage.setItem('safe', JSON.stringify(savedStorage))
  } catch (err) {

  }
}
