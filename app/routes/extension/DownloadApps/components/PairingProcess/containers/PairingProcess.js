import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getDecryptedEthAccount,
  generatePairingCodeContent
} from './pairEthAccount'
import {
  setUpNotifications,
  authPushNotificationService
} from './pairingNotifications'
import { createQrImage } from 'utils/qrdisplay'
import Layout from '../components/Layout'
import selector from './selector'
import { NOTIFICATIONS_PERMISSION_REQUIRED } from '../../../../../../../config/messages'

class PairingProcess extends Component {
  constructor (props) {
    super(props)

    this.qrPairingRef = React.createRef()
    this.state = {
      message: ''
    }
  }

  componentDidMount = async () => {
    const {
      password,
      selectEncryptedMnemonic
    } = this.props

    const currentAccount = password && getDecryptedEthAccount(selectEncryptedMnemonic, password)

    try {
      const token = await setUpNotifications()
      if (token === null) {
        this.setState({ message: NOTIFICATIONS_PERMISSION_REQUIRED })
        return
      }
      if (authPushNotificationService(token, [currentAccount.getPrivateKey()])) {
        this.renderQrImageFrom(currentAccount.getPrivateKey())
      }
    } catch (err) {
      console.error(err)
    }
  }

  renderQrImageFrom = (privateKey) => {
    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(privateKey),
      3
    )
  }

  render () {
    const { toggleQr } = this.props
    const { message } = this.state

    return (
      <Layout
        qrPairingRef={this.qrPairingRef}
        toggleQr={toggleQr}
        message={message}
      />
    )
  }
}

export default connect(
  selector
)(PairingProcess)
