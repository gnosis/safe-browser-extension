import fetch from 'node-fetch'

export const isBrowserCompatible = async () => {
  try {
    const url = 'https://api.duckduckgo.com/?q=useragent&format=json'
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    const response = await fetch(url, {
      method: 'GET',
      headers
    })
    if (response && response.status === 200) {
      const browserData = await response.json()

      // Brave browser does not support Firebase Cloud Messaging and this makes it incompatible with the Gnosis Safe Authenticator
      // https://github.com/brave/brave-browser/issues/2143
      const isBraveBrowser = browserData['Answer'].includes('Brave')
      if (isBraveBrowser) {
        return false
      }
    }
    return true
  } catch (err) {
    console.error(err)
    return true
  }
}
