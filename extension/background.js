import { createStore } from 'redux'
import { wrapStore } from 'react-chrome-redux'

import rootReducer from 'reducers'
import { loadStorage, saveStorage } from 'scripts/store/storage'
import { normalizeUrl } from 'utils/helpers'
import { addTransaction, removeTransaction, removeAllTransactions } from '../app/actions/transactions'

const persistedState = loadStorage()

const store = createStore(
  rootReducer,
  persistedState,
)

store.subscribe(() => {
  saveStorage(
    store.getState()
  )
})

wrapStore(store, { portName: 'GNOSIS_SAFE_EXTENSION' })

const isWhiteListedDapp = (dApp) => {
  var safeStorage = localStorage.getItem('safe')

  if (safeStorage !== null) {
    var whitelistedDApps = JSON.parse(safeStorage).whitelistedDApps

    if (whitelistedDApps !== undefined) {
      if (whitelistedDApps.indexOf(dApp) > -1)
        return true
    }
  }
  return false
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    switch (request.msg) {
      case 'ALLOW_INJECTION':
        allowInjection(request, sendResponse)
        break

      case 'SHOW_POPUP':
        showPopup(request)
        break

      default:

    }

  }
)

const allowInjection = (request, sendResponse) => {
  var allowInjection = isWhiteListedDapp(normalizeUrl(request.url))

  sendResponse({
    'msg': 'RESP_ALLOW_INJECTION',
    'answer': allowInjection,
    'data': request.url
  })
}

store.dispatch(removeAllTransactions())

const showPopup = (request) => {
  chrome.windows.create({
    url: '/popup.html',
    type: 'popup',
    height: 500,
    width: 400
  }, (window) => {
    store.dispatch(addTransaction(request.tx, window.id))
  })
}

chrome.windows.onRemoved.addListener((windowId) => {
  store.dispatch(removeTransaction(windowId))
})
