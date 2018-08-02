import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Popup from 'routes/Popup'
import store from 'store'

store
  .ready()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Popup />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
