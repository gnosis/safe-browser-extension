import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { ExtensionRoutes } from 'routes'
import {
  ACCOUNT_URL,
  PASSWORD_URL,
  DOWNLOAD_APPS_URL,
  WELCOME_URL
} from 'routes/routes'
import { history, store } from './store'
import { withAnalytics } from 'utils/analytics'

const calculateInitialUrl = (account, safes, device) => {
  const validAccount = account.secondFA && account.secondFA.seed
  const validSafes = safes.safes && safes.safes.length > 0
  const lastUpdateNotified = device.lastUpdateNotified

  if (validAccount && validSafes) {
    if (!lastUpdateNotified) {
      return {
        pathname: PASSWORD_URL,
        state: {
          dest: ACCOUNT_URL
        }
      }
    }
    return ACCOUNT_URL
  }

  if (validAccount && !validSafes) {
    return {
      pathname: PASSWORD_URL,
      state: {
        dest: DOWNLOAD_APPS_URL
      }
    }
  }

  if (!validAccount && !validSafes) {
    return WELCOME_URL
  }
}

store.ready().then(async () => {
  const permission = await navigator.permissions.query({
    name: 'notifications'
  })
  if (permission.state !== 'granted') {
    chrome.runtime.openOptionsPage
      ? chrome.runtime.openOptionsPage()
      : window.open(chrome.runtime.getURL('options/options.html'))

    return
  }

  const { account, safes, device } = store.state

  const url = calculateInitialUrl(account, safes, device)
  history.push(url)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route component={withAnalytics(ExtensionRoutes, {})} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
})
