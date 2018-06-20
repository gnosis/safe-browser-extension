import React, { Component } from 'react'

import Layout from '../components/Layout'
import config from '../../../../config'

class DownloadApps extends Component {
  constructor(props) {
    super(props)

    this.androidAppLink = config.androidAppLink
    this.iosAppLink = config.iOSAppLink

    this.state = {
      showQrAndroid: false,
      showQrIos: false,
      showQrPairing: false,
    }

    this.qrPairingRef = React.createRef()
    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  toggleQrAndroid = () => {
    this.setState((prevState) => ({
      showQrAndroid: !prevState.showQrAndroid
    }))
  }

  toggleQrIos = () => {
    this.setState((prevState) => ({
      showQrIos: !prevState.showQrIos
    }))
  }

  toggleQrPairing = () => {
    this.setState((prevState) => ({
      showQrPairing: !prevState.showQrPairing
    }))
  }

  render() {
    const {
      showQrAndroid,
      showQrIos,
      showQrPairing,
    } = this.state

    return (
      <Layout
        toggleQrAndroid={this.toggleQrAndroid}
        toggleQrIos={this.toggleQrIos}
        toggleQrPairing={this.toggleQrPairing}
        showQrAndroid={showQrAndroid}
        showQrIos={showQrIos}
        showQrPairing={showQrPairing}
        androidAppLink={this.androidAppLink}
        iosAppLink={this.iosAppLink}
        password={this.password}
      />
    )
  }
}

export default DownloadApps
