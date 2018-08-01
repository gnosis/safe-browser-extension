import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { PopupRoutes } from 'routes'
import store from 'store'

store
  .ready()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PopupRoutes />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
