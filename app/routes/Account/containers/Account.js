import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'

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

  openEtherScan = () => {
    const { safes } = this.props
    window.open('http://rinkeby.etherscan.io/address/' + safes.currentSafe)
  }

  render() {
    const { account, safes } = this.props
    const url = {
      pathname: '/password',
      state: {
        dest: '/download-apps'
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
    safes,
  }
}

export default connect(
  mapStateToProps
)(Account)
