import React, { Component } from 'react'
import { connect } from 'react-redux'
import EthUtil from 'ethereumjs-util'

import { ga } from 'utils/analytics'
import { SIGNATURES } from 'utils/analytics/events'
import messages from '../../../../../../../extension/utils/messages'
import selector from './selector'
import {
  getSignaturesOwnersRatio,
  createWalletSignature,
  getEip712MessageHash,
  signMessageByExtension,
  getOwnerFromSignature
} from '../../../containers/signMessages'
import { sendSignMessage } from 'utils/sendNotifications'
import { getMessageHash } from 'logic/contracts/safeContracts'
import Layout from '../components/Layout'

class SendSignMessage extends Component {
  constructor (props) {
    super(props)
    this.maxSeconds = 30
    this.state = {
      owners: [],
      threshold: undefined,
      seconds: this.maxSeconds,
      ownerSignatures: []
    }
  }

  componentDidMount = async () => {
    const { signMessages, ethAccount } = this.props
    const { owners, threshold } = await getSignaturesOwnersRatio(ethAccount, signMessages)
    this.setState({
      owners,
      threshold
    })
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { ethAccount, signMessages } = this.props
    if (ethAccount && ethAccount !== prevProps.ethAccount) {
      const { owners, threshold } = await getSignaturesOwnersRatio(ethAccount, signMessages)
      this.setState({
        owners,
        threshold
      })
    }
  }

  handleConfirmSignMessage = (resend) => {
    const { handleSignMessage } = this.props

    if (!handleSignMessage()) {
      return
    }
    this.handleSignMessage()

    !(resend)
      ? ga(['_trackEvent', SIGNATURES, 'click-confirm-sign-typed-data-from-dapp', 'Confirm sign typed data from Dapp'])
      : ga(['_trackEvent', SIGNATURES, 'click-re-send-sign-typed-data-from-dapp', 'Re-send sign typed data from Dapp'])
  }

  handleRejectSignMessage = async () => {
    this.handleRemoveSignMessage(null)
    ga(['_trackEvent', SIGNATURES, 'click-reject-sign-typed-data-from-dapp', 'Reject sign typed data from Dapp'])
  }

  handleMobileAppResponse = async () => {
    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (request.msg === messages.MSG_RESOLVED_OWNER_SIGN_TYPED_DATA) {
        clearInterval(this.timer)
        if (request.hash && this.messageHash === request.hash) {
          const ownerSignature = {
            r: request.signature.slice(0, 66),
            s: '0x' + request.signature.slice(66, 130),
            v: '0x' + request.signature.slice(130, 132)
          }
          const ownerAddress = getOwnerFromSignature(request.hash, ownerSignature)
          if (ownerAddress) {
            await this.handleSignature(ownerAddress, request.signature)
          }
        }
      }
    })
  }

  handleSignature = async (address, signature) => {
    const {
      owners,
      ownerSignatures,
      threshold
    } = this.state
    const { signMessages } = this.props
    const checksumedAddress = address && EthUtil.toChecksumAddress(address)

    if (ownerSignatures.map(ownerSignature => ownerSignature.signature).indexOf(signature) >= 0) {
      console.error('Signature', signature, 'has been already collected.')
      return
    }
    if (owners.indexOf(checksumedAddress) <= -1) {
      console.error(checksumedAddress, 'is not and owner of the Safe.')
      return
    }
    const ownerSignature = {
      address: checksumedAddress,
      signature
    }
    this.setState((prevState) => {
      const newOwnerSignatures = prevState.ownerSignatures
      newOwnerSignatures.push(ownerSignature)
      return { ownerSignatures: newOwnerSignatures }
    })

    if (ownerSignatures && threshold && ownerSignatures.length >= threshold) {
      const message = signMessages.message[1]
      const safeAddress = signMessages.message[3]
      const walletSignature = await createWalletSignature(ownerSignatures, message, safeAddress)
      await this.handleRemoveSignMessage(walletSignature)
    }
  }

  handleSignMessage = async () => {
    const {
      signMessages,
      ethAccount
    } = this.props

    this.setState({ seconds: this.maxSeconds })
    this.startCountdown()
    try {
      const message = signMessages.message[1]
      const safeAddress = signMessages.message[3]

      const hexEip712Hash = getEip712MessageHash(message, safeAddress)
      this.messageHash = await getMessageHash(safeAddress, hexEip712Hash)
      const { r, s, v } = signMessageByExtension(this.messageHash, ethAccount)
      const extensionSignature = {
        r: '0x' + r,
        s: '0x' + s,
        v: '0x' + v
      }
      const extensionHexSignature = '0x' + r + s + v
      const extensionAddress = getOwnerFromSignature(this.messageHash, extensionSignature)
      await this.handleSignature(extensionAddress, extensionHexSignature)

      const response = await sendSignMessage(
        ethAccount.getChecksumAddressString(),
        ethAccount.getPrivateKey(),
        message,
        this.messageHash,
        safeAddress
      )
      if (response && response.status === 204) {
        this.handleMobileAppResponse()
      }
    } catch (err) {
      console.error(err)
    }
  }

  handleRemoveSignMessage = async (walletSignature) => {
    const { removeSignMessage } = this.props

    await removeSignMessage(walletSignature)
    window.close()
    return
  }

  retryShowSignMessage = () => {
    const { showSignMessage } = this.props

    showSignMessage()
  }

  startCountdown = () => {
    this.timer = setInterval(
      this.countDown,
      500
    )
  }

  countDown = () => {
    const { seconds } = this.state
    if (seconds === 0) {
      clearInterval(this.timer)
      return
    }
    this.setState((prevState) => ({
      seconds: (prevState.seconds - 1)
    }))
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedSignature
    } = this.props
    const {
      seconds,
      owners,
      threshold,
      ownerSignatures
    } = this.state

    return (
      <Layout
        lockedAccount={lockedAccount}
        loadedData={loadedData}
        reviewedSignature={reviewedSignature}
        seconds={seconds}
        owners={owners}
        ownerSignatures={ownerSignatures}
        threshold={threshold}
        handleConfirmSignMessage={this.handleConfirmSignMessage}
        handleRejectSignMessage={this.handleRejectSignMessage}
        retryShowSignMessage={this.retryShowSignMessage}
      />
    )
  }
}

export default connect(
  selector
)(SendSignMessage)
