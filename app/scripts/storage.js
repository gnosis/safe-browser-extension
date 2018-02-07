export const loadState = () => {
  try {
    var serializedStorage = localStorage.getItem('state')
    if (serializedStorage === null) {
      serializedStorage = undefined
    }

    return JSON.parse(serializedStorage)
  }
  catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  }
  catch (err) {

  }
}