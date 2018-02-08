import { createStore } from 'redux'
import rootReducer from './reducers'
import { loadStorage, saveStorage } from './utils/storage'

const persistedState = loadStorage()

const store = createStore(
  rootReducer,
  persistedState
)

store.subscribe(() => {
  saveStorage(
    store.getState()
  )
})

export default store