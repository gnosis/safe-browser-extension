import {
  MSG_ALLOW_INJECTION,
  MSG_UPDATE_CURRENT_SAFE,
  MSG_SHOW_POPUP,
  EV_SHOW_POPUP,
  EV_SCRIPT_READY,
  EV_UPDATE_WEB3,
  MSG_RESOLVED_TRANSACTION,
  EV_RESOLVED_TRANSACTION,
} from './utils/messages'

// Checks if the page is whitelisted to inject the web3 provider
chrome.runtime.sendMessage(
  {
    msg: MSG_ALLOW_INJECTION,
    url: window.location.host
  },
  function (response) {
    if (response.answer) {
      injectScript()
      setUpWeb3(response.currentSafe)
    }
    else {
      console.log('This web page is not whitelisted.')
    }
  }
)

function injectScript() {
  try {
    // Injects script.js with the web3 provider
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('script.js'), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = chrome.extension.getURL('script.js')
        var container = (document.documentElement || document.head)
        container.insertBefore(s, container.children[0])
      }
    }
    xhr.send()
  }
  catch (err) {
    console.error('Gnosis web3 provider injection failed.', err)
  }
}

function setUpWeb3(currentSafe) {
  document.addEventListener(EV_SCRIPT_READY, function (data) {
    updateWeb3(currentSafe)
  })
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === MSG_UPDATE_CURRENT_SAFE) {
      updateWeb3(request.newSafeAddress)
    }
  }
)

function updateWeb3(currentSafe) {
  const updateWeb3Event = new CustomEvent(
    EV_UPDATE_WEB3,
    { detail: currentSafe }
  )
  document.dispatchEvent(updateWeb3Event)
}

document.addEventListener(EV_SHOW_POPUP, function (data) {
  chrome.runtime.sendMessage({
    msg: MSG_SHOW_POPUP,
    tx: data.detail
  })
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === MSG_RESOLVED_TRANSACTION) {
      const resolvedTransactionEvent = new CustomEvent(
        EV_RESOLVED_TRANSACTION,
        { detail: request.hash }
      )
      document.dispatchEvent(resolvedTransactionEvent)
    }
  }
)
