import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { getTokensFromRelayService } from 'utils/tokens'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'

const PaymentToken = ({ transactions, onSetPaymentToken, location }) => {
  const [tokenList, setTokenList] = useState([])
  const [selectedPaymentToken, setSelectedPaymentToken] = useState(
    transactions.paymentToken
  )

  useEffect(() => {
    const updateTokenList = async () => {
      const tokens = await getTokensFromRelayService({ gas: true })
      setTokenList(tokens)
    }
    updateTokenList()
  })

  const handlePaymentToken = (token) => (e) => {
    const paymentToken = !token
      ? null
      : {
          address: token.address,
          decimals: token.decimals,
          logoUri: token.logoUri,
          name: token.name,
          symbol: token.symbol,
          decimals: token.decimals
        }

    onSetPaymentToken(paymentToken)
    const symbol = token ? token.symbol : 'ETH'
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-set-payment-token',
      'Use ' + symbol + ' for paying transaction fees'
    ])
    setSelectedPaymentToken(token)
  }

  return (
    <Layout
      location={location}
      tokenList={tokenList}
      selectedPaymentToken={selectedPaymentToken}
      handlePaymentToken={handlePaymentToken}
    />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPaymentToken: (paymentToken) =>
      dispatch(actions.setPaymentToken(paymentToken))
  }
}

export default connect(selector, mapDispatchToProps)(PaymentToken)
