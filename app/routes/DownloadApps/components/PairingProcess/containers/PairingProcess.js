import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getDecryptedEthAccount,
  generatePairingCodeContent,
} from './pairEthAccount'
import {
  setUpNotifications,
  authPushNotificationService
} from './pairingNotifications'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../../../config'
import Layout from '../components/Layout'
import selector from './selector'

class PairingProcess extends Component {
  constructor(props) {
    super(props)

    this.qrPairingRef = React.createRef()
    this.state = {
      message: ''
    }
  }

  componentDidMount = () => {
    const {
      password,
      selectEncryptedMnemonic,
    } = this.props

    const currentAccount = password && getDecryptedEthAccount(selectEncryptedMnemonic, password)

    setUpNotifications()
      .then((token) => {
        if (token === null) {
          this.setState({
            message: 'Permission to receive notifications required.'
          })
          return
        }
        if (authPushNotificationService(token, currentAccount.getPrivateKey())) {
          this.renderQrImageFrom(currentAccount.getPrivateKey())
        }
      })
      .catch((err) => console.error(err))
  }

  renderQrImageFrom = (privateKey) => {
    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(privateKey),
      3
    )
  }

  render() {
    const {
      toggleQr,
      password,
    } = this.props
    const { message } = this.state

    return (
      <Layout
        qrPairingRef={this.qrPairingRef}
        password={password}
        toggleQr={toggleQr}
        message={message}
      />
    )
  }
}

export default connect(
  selector,
)(PairingProcess)
