import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { PopupRoutes } from 'routes'
import { TRANSACTION_URL } from 'routes/routes'
import {
  history,
  store
} from './store'
import { withAnalytics } from 'utils/analytics'

store
  .ready()
  .then(async () => {
    history.push(TRANSACTION_URL)

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={withAnalytics(PopupRoutes, {})} />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
