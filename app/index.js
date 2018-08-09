import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { ExtensionRoutes, ACCOUNT_URL, PASSWORD_URL, DOWNLOAD_APPS_URL, WELCOME_URL } from 'routes'
import { history, store } from './store'

const calculateInitialUrl = (account, safes) => {
  const validAccount = store.state.account.secondFA && Object.keys(account.secondFA).length > 0
  const validSafes = safes.safes && safes.safes.length > 0

  if (validAccount && validSafes) return ACCOUNT_URL

  if (validAccount && !validSafes) {
    return {
      pathname: PASSWORD_URL,
      state: {
        dest: DOWNLOAD_APPS_URL
      }
    }
  }

  if (!validAccount && !validSafes) return WELCOME_URL
}

store
  .ready()
  .then(async () => {
    const permission = await navigator.permissions.query({ name: 'notifications' })
    if (permission.state !== 'granted') {
      chrome.runtime.openOptionsPage
        ? chrome.runtime.openOptionsPage()
        : window.open(chrome.runtime.getURL('options/options.html'))

      return
    }

    const { account, safes } = store.state
    const url = calculateInitialUrl(account, safes)
    history.push(url)

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ExtensionRoutes />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
