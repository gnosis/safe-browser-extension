import { Store } from 'react-chrome-redux'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const store = new Store({
  portName: 'SAFE_BROWSER_EXTENSION'
})
