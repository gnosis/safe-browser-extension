import { createStore } from 'redux'
import rootReducer from './reducers'
import { loadState, saveState } from './scripts/storage';

const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  saveState(
    store.getState()
  )
})

export default store