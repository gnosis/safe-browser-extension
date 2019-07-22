import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { SIGNATURES } from 'utils/analytics/events'
import {
  getEip712MessageHash,
  signMessageByExtension
} from '../../../containers/signMessages'
import { getMessageHash } from 'logic/contracts/safeContracts'
import { sendSignTypedDataConfirmation } from 'utils/sendNotifications'
import selector from './selector'
import Layout from '../components/Layout'

class ConfirmSignMessage extends Component {
  handleConfirmSignMessage = () => {
    const { handleSignMessage } = this.props
    if (!handleSignMessage()) {
      return
    }
    this.handleSignMessage('signTypedDataConfirmation')

    ga([
      '_trackEvent',
      SIGNATURES,
      'click-confirm-sign-typed-data-from-mobile-app',
      'Confirm sign typed data from mobile app'
    ])
  }

  handleRejectSignMessage = () => {
    const { handleSignMessage } = this.props

    if (!handleSignMessage()) {
      return
    }
    this.handleSignMessage('rejectSignTypedData', 'GNO')

    ga([
      '_trackEvent',
      SIGNATURES,
      'click-reject-sign-typed-data-from-mobile-app',
      'Reject sign typed data from mobile app'
    ])
  }

  handleSignMessage = async (type, prefix) => {
    const { ethAccount, signMessages } = this.props
    const { message, safeAddress } = signMessages.message

    try {
      let extensionHexSignature = null
      const hexEip712Hash = getEip712MessageHash(message, safeAddress)
      const messageHash = await getMessageHash(safeAddress, hexEip712Hash)

      if (type === 'signTypedDataConfirmation' && !prefix) {
        const { r, s, v } = signMessageByExtension(messageHash, ethAccount)
        const extensionSignature = {
          r: '0x' + r,
          s: '0x' + s,
          v: '0x' + v
        }
        extensionHexSignature = '0x' + r + s + v
      }

      const response = await sendSignTypedDataConfirmation(
        type,
        ethAccount.getChecksumAddressString(),
        ethAccount.getPrivateKey(),
        messageHash,
        safeAddress,
        prefix,
        extensionHexSignature
      )
      if (response && response.status === 204) {
        this.handleRemoveSignMessage()
      }
    } catch (err) {
      console.error(err)
    }
  }

  handleRemoveSignMessage = async () => {
    const { removeSignMessage } = this.props

    await removeSignMessage()
    window.close()
    return
  }

  retryShowSignMessage = () => {
    showSignMessage()
  }

  render() {
    const { lockedAccount, loadedData, reviewedTx } = this.props

    return (
      <Layout
        lockedAccount={lockedAccount}
        loadedData={loadedData}
        reviewedTx={reviewedTx}
        handleConfirmSignMessage={this.handleConfirmSignMessage}
        handleRejectSignMessage={this.handleRejectSignMessage}
        retryShowSignMessage={this.retryShowSignMessage}
      />
    )
  }
}

export default connect(selector)(ConfirmSignMessage)
