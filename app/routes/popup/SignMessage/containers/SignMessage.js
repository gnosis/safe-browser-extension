import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/containers/pairEthAccount'
import { getEthBalance } from 'utils/helpers'
import Header from 'components/Headers/CompleteHeader'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'
import messages from '../../../../../extension/utils/messages'

class SignMessage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balance: undefined,
      loadedData: undefined,
      reviewedSignature: false
    }

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  componentDidMount = () => {
    const { safes, signMessages } = this.props
    const { seed, unlockedMnemonic } = this.props.account.secondFA

    const safeMessage = signMessages ? signMessages.message[3] : ''
    const currentSafe = safes.safes.filter(
      (safe) => safe.address === safeMessage
    )[0]

    this.ethAccount =
      !unlockedMnemonic && this.password
        ? getDecryptedEthAccount(
            seed,
            this.password,
            currentSafe.accountIndex || 0
          )
        : createAccountFromMnemonic(
            unlockedMnemonic,
            currentSafe.accountIndex || 0
          )

    this.showSignMessage()
  }

  showSignMessage = async () => {
    const { signMessages } = this.props

    if (!signMessages || signMessages.message.length === 0) {
      return
    }

    let balance = undefined
    let loadedData = false
    try {
      balance = await getEthBalance(signMessages.message[3])
      loadedData = balance instanceof BigNumber
    } catch (err) {
      console.error(err)
    }

    this.setState({
      reviewedSignature: false,
      loadedData,
      balance
    })
  }

  handleSignMessage = () => {
    const { account } = this.props
    if (account.lockedState) {
      return false
    }
    this.setState({ reviewedSignature: true })
    return true
  }

  removeSignMessage = (walletSignature) => {
    const { signMessages, onRemoveSignMessage } = this.props

    if (signMessages.dappWindowId && signMessages.dappTabId) {
      chrome.tabs.sendMessage(signMessages.dappTabId, {
        msg: messages.MSG_RESOLVED_WALLET_SIGN_TYPED_DATA,
        walletSignature
      })
      onRemoveSignMessage()
    } else {
      onRemoveSignMessage()
    }
  }

  getSafeAlias = (address) => {
    const { safes } = this.props
    return address
      ? safes.safes.filter((s) => s.address === address)[0].alias
      : ''
  }

  render() {
    const { balance, loadedData, reviewedSignature } = this.state
    const { account, signMessages, location } = this.props

    const safe = signMessages ? signMessages.message[3] : ''

    return (
      <Layout
        signMessages={signMessages}
        balance={balance}
        lockedAccount={account.lockedState}
        loadedData={loadedData}
        reviewedSignature={reviewedSignature}
        address={safe}
        safeAlias={this.getSafeAlias(safe)}
        ethAccount={this.ethAccount}
        removeSignMessage={this.removeSignMessage}
        showSignMessage={this.showSignMessage}
        handleSignMessage={this.handleSignMessage}
        location={location}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveSignMessage: () => dispatch(actions.removeSignMessage())
  }
}

export default connect(selector, mapDispatchToProps)(SignMessage)
