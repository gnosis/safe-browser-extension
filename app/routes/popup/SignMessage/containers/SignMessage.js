import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import { promisify } from 'utils/promisify'
import messages from '../../../../../extension/utils/messages'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import { getEthBalance } from 'utils/helpers'
import Header from 'components/Header'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'
import styles from 'assets/css/global.css'

class SignMessage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balance: undefined,
      loadedData: undefined,
      reviewedSignature: false
    }

    const { location } = this.props
    const { seed, unlockedMnemonic } = this.props.account.secondFA
    const validPassword = location && location.state && location.state.password

    this.password = validPassword ? location.state.password : undefined
    this.ethAccount = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)
  }

  componentDidMount = () => {
    this.showSignMessage()
  }

  showSignMessage = async () => {
    const { signMessages } = this.props

    if (!signMessages || (signMessages.message.length === 0)) {
      return
    }

    let balance = undefined
    let loadedData = false
    try {
      balance = await getEthBalance(signMessages.message[3])
      loadedData = (balance instanceof BigNumber)
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
    const {
      signMessages,
      onRemoveSignMessage
    } = this.props

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
    return (address) ? safes.safes.filter(s => s.address === address)[0].alias : ''
  }

  render() {
    const {
      balance,
      loadedData,
      reviewedSignature
    } = this.state
    const {
      account,
      signMessages,
      location
    } = this.props

    const safe = signMessages ? signMessages.message[3] : ''

    return (
      <div className={styles.extensionPopup}>
        <div className={styles.extensionInner}>
          <Header
            noBorder
            isPopup
            location={location}
          />
          <div className={styles.Page}>
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
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveSignMessage: () => dispatch(actions.removeSignMessage())
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(SignMessage)
