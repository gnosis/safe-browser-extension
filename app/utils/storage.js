export const loadStorage = () => {
  try {
    var serializedStorage = localStorage.getItem('safe')
    if (serializedStorage === null) {
      serializedStorage = undefined
    }

    return JSON.parse(serializedStorage)
  }
  catch (err) {
    return undefined
  }
}

export const saveStorage = (state) => {
  try {
    const savedStorage = {
      'account': {
        'address': state.account.address,
        'seed': state.account.seed
      }
    }
    localStorage.setItem('safe', JSON.stringify(savedStorage))
  }
  catch (err) {

  }
}