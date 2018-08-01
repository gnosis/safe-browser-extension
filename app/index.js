import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import AppRoutes from 'routes'
import { history, store } from './store'

store
  .ready()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRoutes />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
