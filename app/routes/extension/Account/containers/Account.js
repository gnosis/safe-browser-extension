import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { ga } from 'utils/analytics'
import { SAFES } from 'utils/analytics/events'
import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'
import {
  PASSWORD_URL,
  DOWNLOAD_APPS_URL
} from 'routes/routes'
import selector from './selector'
import { getNetwork } from '../../../../../config'
import { MAINNET } from '../../../../../config/names'

class Account extends Component {
  componentDidMount = () => {
    const { safes } = this.props
    createQrImage(
      document.getElementById('qr-safe-address'),
      safes.currentSafe,
      4
    )

    setTimeout(
      () => this.focusTransactionWindow(),
      100
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { safes } = this.props
    createQrImage(
      document.getElementById('qr-safe-address'),
      safes.currentSafe,
      4
    )
  }

  openEtherScan = async () => {
    const { safes } = this.props
    await ga(['_trackEvent', SAFES, 'click-view-safe-on-etherscan', 'View Safe on Etherscan'])

    const etherScanUrl = (getNetwork() === MAINNET)
      ? 'http://etherscan.io/address/'
      : 'http://rinkeby.etherscan.io/address/'
    window.open(etherScanUrl + safes.currentSafe)
  }

  openSlowTrade = async () => {
    await ga(['_trackEvent', SAFES, 'click-slow-trade-banner', 'Click Slow Trade banner'])
    if (getNetwork() === MAINNET) {
      window.open('https://slow.trade')
    } else {
      window.open('https://rinkeby.slow.trade')
    }
  }

  focusTransactionWindow = () => {
    const { transactions } = this.props
    const windowId = transactions.windowId
    if (windowId) {
      chrome.windows.update(windowId, { 'focused': true })
    }
  }

  render () {
    const { safes } = this.props
    const url = {
      pathname: PASSWORD_URL,
      state: {
        dest: DOWNLOAD_APPS_URL
      }
    }

    if (safes.currentSafe === undefined) {
      return <Redirect to={url} />
    }
    return (
      <Layout
        currentSafe={safes.currentSafe}
        openEtherScan={this.openEtherScan}
        openSlowTrade={this.openSlowTrade}
        location={this.props.location}
      />
    )
  }
}

export default connect(
  selector
)(Account)
