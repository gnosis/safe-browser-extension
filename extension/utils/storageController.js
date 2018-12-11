import { createStore } from 'redux'
import rootReducer from 'reducers'
import { wrapStore } from 'react-chrome-redux'

class StorageController {
  constructor() {
    const persistedState = this.loadStorage()
    this.store = createStore(
      rootReducer,
      persistedState
    )
    wrapStore(this.store, { portName: 'SAFE_BROWSER_EXTENSION' })
  }

  getStore = () => {
    return this.store
  }

  getStoreState = () => {
    return this.store.getState()
  }

  loadStorage = () => {
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

  saveStorage = (state) => {
    try {
      const savedStorage = state
      window.localStorage.setItem('safe', JSON.stringify(savedStorage))
    } catch (err) {
    }
  }
}

export default StorageController
