// Checks if the page is whitelisted to inject the web3 provider
chrome.runtime.sendMessage(
  {
    'msg': 'ASK_ALLOWED_INJECTION',
    'url': window.location.host
  },
  function (response) {
    if (response.msg === 'ASNWER_ALLOWED_INJECTION')
      if (response.answer === true) {
        injectScript()
        //console.log('This web page is whitelisted.')
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
    xhr.onreadystatechange = function() {
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
