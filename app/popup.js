import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { getPopupEnviroment } from 'utils/helpers'
import { PopupRoutes } from 'routes'
import {
  TRANSACTION_URL,
  SIGN_MESSAGE_URL
} from 'routes/routes'
import {
  history,
  store
} from './store'
import { withAnalytics } from 'utils/analytics'

const calculateInitialUrl = (transactions, signMessages) => {
  const popupEnv = getPopupEnviroment(transactions, signMessages)

  if (popupEnv === 'PENDING_TRANSACTIONS') {
    return TRANSACTION_URL
  } else if (popupEnv === 'PENDING_SIGNATURES') {
    return SIGN_MESSAGE_URL
  }
}

store
  .ready()
  .then(async () => {
    const { transactions, signMessages } = store.state
    const url = calculateInitialUrl(transactions, signMessages)
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
