import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { PopupRoutes } from 'routes'
import { TRANSACTION_URL } from 'routes/routes'
import { history, store } from './store'

store
  .ready()
  .then(async () => {
    history.push(TRANSACTION_URL)

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PopupRoutes />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
