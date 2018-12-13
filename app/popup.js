import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { PopupRoutes } from 'routes'
import {
  TRANSACTION_URL,
  ACCESS_REQUEST_URL
} from 'routes/routes'
import { getPopupEnviroment } from 'utils/helpers'
import {
  history,
  store
} from './store'
import { withAnalytics } from 'utils/analytics'

const calculateInitialUrl = (transactions, enabledDapps) => {
  const popupEnv = getPopupEnviroment(transactions, enabledDapps)

  if (popupEnv === 'PENDING_TRANSACTIONS') {
    return TRANSACTION_URL
  } else if (popupEnv === 'PENDING_ENABLED_DAPP') {
    return ACCESS_REQUEST_URL
  }
}

store
  .ready()
  .then(async () => {
    const { transactions, enabledDapps } = store.state
    const url = calculateInitialUrl(transactions, enabledDapps)
    history.push(url)

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={withAnalytics(PopupRoutes, {})} />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
