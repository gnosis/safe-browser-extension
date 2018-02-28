console.log("--background.js--")

import { normalizeUrl } from '../app/utils/helpers'

function isWhiteListedDapp(dApp) {
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
  function (request, sender, sendResponse) {

    if (request.msg === 'ASK_ALLOWED_INJECTION') {
      var allowInjection = isWhiteListedDapp(normalizeUrl(request.url))

      sendResponse({
        'msg': 'ASNWER_ALLOWED_INJECTION',
        'answer': allowInjection,
        'data': request.url
      })

    }

  }
)
