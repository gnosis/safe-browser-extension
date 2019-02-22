import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEthBalance } from 'utils/helpers'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import Header from 'components/Header'
import Layout from '../components/Layout'
import selector from './selector'
import styles from 'assets/css/global.css'

class SignMessage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balance: undefined
    }

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  componentDidMount = async () => {
    const { seed, unlockedMnemonic } = this.props.account.secondFA
    const { safes } = this.props

    const balance = await getEthBalance(safes.currentSafe)
    this.setState({ balance })

    this.ethAccount = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)
  }

  render() {
    const {
      signMessages,
      safes,
      currentSafeAlias
    } = this.props
    const { balance } = this.state

    return (
      <div className={styles.extensionPopup}>
        <div className={styles.extensionInner}>
          <Header
            noBorder
            txReview
            location={location}
          />
          <div className={styles.Page}>
            <Layout
              signMessages={signMessages}
              address={safes.currentSafe}
              alias={currentSafeAlias}
              balance={balance}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  selector
)(SignMessage)
