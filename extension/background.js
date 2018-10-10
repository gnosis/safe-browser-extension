import { createStore } from 'redux'
import { wrapStore } from 'react-chrome-redux'
import rootReducer from 'reducers'
import uuid from 'uuid/v4'

import EthUtil from 'ethereumjs-util'
import {
  loadStorage,
  saveStorage
} from './utils/storage'
import { normalizeUrl } from 'utils/helpers'
import { lockAccount } from 'actions/account'
import { addSafe } from 'actions/safes'
import {
  addTransaction,
  removeAllTransactions
} from 'actions/transactions'
import {
  MSG_SHOW_POPUP,
  MSG_UPDATE_CURRENT_SAFE,
  MSG_ALLOW_INJECTION,
  MSG_RESP_ALLOW_INJECTION,
  MSG_LOCK_ACCOUNT_TIMER,
  MSG_LOCK_ACCOUNT,
  MSG_CONFIGURE_ACCOUNT_LOCKING,
  MSG_RESOLVED_TRANSACTION,
  MSG_PENDING_SENDTRANSACTION
} from './utils/messages'

const persistedState = loadStorage()

const store = createStore(
  rootReducer,
  persistedState
)

let storeCurrentSafeAddress
store.subscribe(() => {
  updateCurrentSafe()
  saveStorage(
    store.getState()
  )
})

wrapStore(store, { portName: 'SAFE_BROWSER_EXTENSION' })

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => {
      for (let registration of registrations) {
        registration.update()
      }
    })
}

const updateCurrentSafe = () => {
  let storePreviousSafeAddress = storeCurrentSafeAddress
  storeCurrentSafeAddress = store.getState().safes.currentSafe

  if (storeCurrentSafeAddress !== storePreviousSafeAddress) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        msg: MSG_UPDATE_CURRENT_SAFE,
        newSafeAddress: storeCurrentSafeAddress
      })
    })
  }
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    switch (request.msg) {
      case MSG_ALLOW_INJECTION:
        allowInjection(request.url, sendResponse)
        break

      case MSG_SHOW_POPUP:
        if (isWhiteListedDapp(normalizeUrl(sender.tab.url))) {
          showSendTransactionPopup(request.tx, sender.tab.windowId, sender.tab.id)
        }
        break

      case MSG_LOCK_ACCOUNT_TIMER:
        lockAccountTimer()
        break

      case MSG_LOCK_ACCOUNT:
        lockAccountNow()
        break

      case MSG_CONFIGURE_ACCOUNT_LOCKING:
        lockAccountTimer()
        break

      case MSG_PENDING_SENDTRANSACTION:
        setPendingTransaction(request.position)
        break

      default:
    }
  }
)

const allowInjection = (url, sendResponse) => {
  const allowInjection = isWhiteListedDapp(normalizeUrl(url))
  const currentSafe = allowInjection
    ? store.getState().safes.currentSafe
    : undefined

  sendResponse({
    msg: MSG_RESP_ALLOW_INJECTION,
    answer: allowInjection,
    currentSafe
  })
}

const isWhiteListedDapp = (dApp) => {
  var safeStorage = window.localStorage.getItem('safe')

  if (safeStorage !== null) {
    var whitelistedDapps = JSON.parse(safeStorage).whitelistedDapps

    if (whitelistedDapps !== undefined) {
      if (whitelistedDapps.indexOf(dApp) > -1) { return true }
    }
  }
  return false
}

const focusTransactionWindow = () => {
  const windowId = store.getState().transactions.windowId
  chrome.windows.update(windowId, { 'focused': true })
}

const showPopup = (transaction, dappWindowId, dappTabId) => {
  const safes = store.getState().safes.safes
  const transactions = store.getState().transactions.txs

  if (transaction.hash && transactions.filter(t => t.tx.hash === transaction.hash).length > 0) { return }

  transaction.safe = transaction.safe && EthUtil.toChecksumAddress(transaction.safe)
  transaction.from = transaction.from && EthUtil.toChecksumAddress(transaction.from)
  transaction.to = transaction.to && EthUtil.toChecksumAddress(transaction.to)
  if (transaction.safe) {
    transaction.from = transaction.safe
  }

  const validTransaction = safes.filter(safe => safe.address.toLowerCase() === transaction.from.toLowerCase()).length > 0
  if (!validTransaction) {
    return
  }

  const transactionsLength = transactions.length + 1
  chrome.browserAction.setBadgeBackgroundColor({ color: '#888' })
  chrome.browserAction.setBadgeText({ text: transactionsLength.toString() })

  if (transactions.length === 0) {
    chrome.windows.create({
      url: '/popup.html',
      type: 'popup',
      height: 630,
      width: 390
    }, (window) => {
      store.dispatch(addTransaction(transaction, window.id, dappWindowId, dappTabId))
    })
    return
  }

  store.dispatch(addTransaction(transaction, null, dappWindowId, dappTabId))
  focusTransactionWindow()
}

const showConfirmTransactionPopup = (transaction) => {
  transaction.type = 'confirmTransaction'
  transaction.id = uuid()
  showPopup(transaction)
}

const showSendTransactionPopup = (transaction, dappWindowId, dappTabId) => {
  transaction.type = 'sendTransaction'
  showPopup(transaction, dappWindowId, dappTabId)
}

let lockingTimer = null
const lockAccountTimer = () => {
  if (lockingTimer !== null) {
    clearTimeout(lockingTimer)
  }

  const waitMinutes = store.getState().account.autoLockInterval

  lockingTimer = setTimeout(() => {
    store.dispatch(lockAccount())
  }, waitMinutes * 60000)
}

const lockAccountNow = () => {
  if (lockingTimer !== null) {
    clearTimeout(lockingTimer)
  }
  store.dispatch(lockAccount())
}

let pendingTransactionPosition = null
const setPendingTransaction = (position) => {
  pendingTransactionPosition = position
}

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === store.getState().transactions.windowId) {
    chrome.browserAction.setBadgeText({text: ''})

    const transactions = store.getState().transactions.txs

    for (const i in transactions) {
      const transaction = transactions[i]
      if (transaction.dappWindowId && transaction.dappTabId) {
        chrome.tabs.query({ windowId: transaction.dappWindowId }, function (tabs) {
          chrome.tabs.sendMessage(transaction.dappTabId, {
            msg: MSG_RESOLVED_TRANSACTION,
            hash: null,
            id: transaction.tx.id
          })
        })
      }
    }

    store.dispatch(removeAllTransactions())
  }
})

store.dispatch(lockAccount())
store.dispatch(removeAllTransactions())

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    const payload = event.data

    switch (payload.type) {
      case 'safeCreation':
        safeCreation(payload)
        break

      case 'requestConfirmation':
        showConfirmTransactionPopup(payload)
        break

      case 'sendTransactionHash':
        sendTransactionHash(payload, true)
        break

      case 'rejectTransaction':
        sendTransactionHash(payload, false)
        break

      default:
    }
  })
}

const safeCreation = (payload) => {
  const safes = store.getState().safes.safes
  const validSafeAddress = safes.filter(
    safe => safe.address.toLowerCase() === payload.safe.toLowerCase()
  ).length === 0

  if (safes.length > 0 && !validSafeAddress) {
    console.error('Safe', payload.safe, 'already exists.')
    return
  }
  const checksumedAddress = EthUtil.toChecksumAddress(payload.safe)
  store.dispatch(addSafe(checksumedAddress))
}

const sendTransactionHash = (payload, accepted) => {
  if (pendingTransactionPosition === null) {
    return
  }

  const popUpWindowId = store.getState().transactions.windowId
  const pendingTx = store.getState().transactions.txs[pendingTransactionPosition]

  const transactionsLength = store.getState().transactions.txs.length - 1
  chrome.browserAction.setBadgeBackgroundColor({ color: '#888' })
  chrome.browserAction.setBadgeText({ text: transactionsLength.toString() })

  chrome.tabs.query({ active: true, windowId: popUpWindowId }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      msg: MSG_RESOLVED_TRANSACTION,
      hash: (accepted) ? payload.chainHash : null,
      id: pendingTx.tx.id
    })
  })
  chrome.tabs.query({ windowId: pendingTx.dappWindowId }, function (tabs) {
    chrome.tabs.sendMessage(pendingTx.dappTabId, {
      msg: MSG_RESOLVED_TRANSACTION,
      hash: (accepted) ? payload.chainHash : null,
      id: pendingTx.tx.id
    })
  })

  pendingTransactionPosition = null
}
