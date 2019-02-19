import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { getTokensFromRelayService } from 'utils/tokens'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'

class PaymentToken extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenList: [],
      selectedPaymentToken: props.transactions.paymentToken
    }
  }

  componentDidMount = async () => {
    const tokens = await getTokensFromRelayService({ gas: true })
    this.setState({ tokenList: tokens })
  }

  handlePaymentToken = (token) => (e) => {
    const { onSetPaymentToken } = this.props
    const paymentToken = (!token)
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
    ga(['_trackEvent', EXTENSION_SETTINGS, 'click-set-payment-token', 'Use ' + symbol + ' for paying transaction fees'])
    this.setState({ selectedPaymentToken: token })
  }

  render () {
    const { location } = this.props
    const {
      tokenList,
      selectedPaymentToken
    } = this.state

    return (
      <Layout
        location={location}
        tokenList={tokenList}
        selectedPaymentToken={selectedPaymentToken}
        handlePaymentToken={this.handlePaymentToken}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPaymentToken: (paymentToken) => dispatch(actions.setPaymentToken(paymentToken))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(PaymentToken)
