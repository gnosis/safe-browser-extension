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
  constructor(props) {
    super(props)

    this.qrPairingRef = React.createRef()
    this.state = {
      message: ''
    }
  }

  componentDidMount = async () => {
    const { password, selectEncryptedMnemonic, account } = this.props

    const nextOwnerAccountIndex = account.secondFA.currentAccountIndex
      ? account.secondFA.currentAccountIndex + 1
      : 1

    const nextOwnerAccount =
      password &&
      getDecryptedEthAccount(
        selectEncryptedMnemonic,
        password,
        nextOwnerAccountIndex
      )

    try {
      const token = await setUpNotifications()
      if (token === null) {
        this.setState({ message: NOTIFICATIONS_PERMISSION_REQUIRED })
        return
      }
      const auth = await authPushNotificationService(token, [nextOwnerAccount])
      if (auth) {
        this.renderQrImageFrom(nextOwnerAccount.getPrivateKey())
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

  render() {
    const { message } = this.state

    return <Layout qrPairingRef={this.qrPairingRef} message={message} />
  }
}

export default connect(selector)(PairingProcess)
