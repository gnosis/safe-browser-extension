import fetch from 'node-fetch'

import { getTransactionRelayServiceUrl } from '../../config'

export const getTokensFromRelayService = async (params) => {
  const baseParams = 'limit=1000&ordering=relevance,name'
  const gasParam = (params && params.gas) ? '&gas=true' : ''
  const url = getTransactionRelayServiceUrl() + '/api/v1/tokens?' + baseParams + gasParam
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers
    })
    let tokenList
    if (response && response.status === 200) {
      tokenList = await response.json()
      return tokenList.results
    }
    return []
  } catch (err) {
    console.error(err)
    return []
  }
}
