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

class Account extends Component {
  componentDidMount = () => {
    const { safes } = this.props
    createQrImage(
      document.getElementById('qr-safe-address'),
      safes.currentSafe,
      4
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
    window.open('http://rinkeby.etherscan.io/address/' + safes.currentSafe)
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
        properties={this.props.location}
        openEtherScan={this.openEtherScan}
      />
    )
  }
}

const mapStateToProps = ({ account, safes }, props) => {
  return {
    account,
    safes
  }
}

export default connect(
  mapStateToProps
)(Account)
