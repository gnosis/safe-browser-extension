import messages from './utils/messages'
import {
  WEBSITE_NOT_WHITELISTED,
  WEB3_INJECTION_FAILED
} from '../config/messages'

const injectScript = () => {
  try {
    // Injects script.js with the web3 provider
    var xhr = new window.XMLHttpRequest()
    xhr.open('GET', chrome.extension.getURL('script.js'), true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var s = document.createElement('script')
        s.type = 'text/javascript'
        s.src = chrome.extension.getURL('script.js')
        var container = (document.documentElement || document.head)
        container.insertBefore(s, container.children[0])
      }
    }
    xhr.send()
  } catch (err) {
    console.error(WEB3_INJECTION_FAILED.toString(), err)
  }
}

const activeListeners = () => {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      switch (request.msg) {
        case messages.MSG_RESOLVED_TRANSACTION:
          const resolvedTransactionEvent = new window.CustomEvent(
            messages.EV_RESOLVED_TRANSACTION + request.id,
            {
              detail: {
                hash: request.hash,
                id: request.id
              }
            }
          )
          window.dispatchEvent(resolvedTransactionEvent)
          break

        case messages.MSG_UPDATE_CURRENT_SAFE:
          updateWeb3(request.newSafeAddress)
          break
      }
    }
  )
}

// Checks if the page is whitelisted to inject the web3 provider
chrome.runtime.sendMessage(
  {
    msg: messages.MSG_ALLOW_INJECTION,
    url: window.location.host
  },
  (response) => {
    if (response.answer) {
      activeListeners()
      setUpWeb3(response.currentSafe)
      injectScript()
    } else {
      console.log(WEBSITE_NOT_WHITELISTED.toString())
    }
  }
)

const setUpWeb3 = (currentSafe) => {
  window.addEventListener(messages.EV_SCRIPT_READY, (data) => {
    updateWeb3(currentSafe)
  })
}

const updateWeb3 = (currentSafe) => {
  const updateWeb3Event = new window.CustomEvent(
    messages.EV_UPDATE_WEB3,
    { detail: currentSafe }
  )
  window.dispatchEvent(updateWeb3Event)
  console.log('web3 updated')
}

window.addEventListener(messages.EV_SHOW_POPUP, (data) => {
  chrome.runtime.sendMessage({
    msg: messages.MSG_SHOW_POPUP_TX,
    tx: data.detail
  })
})
