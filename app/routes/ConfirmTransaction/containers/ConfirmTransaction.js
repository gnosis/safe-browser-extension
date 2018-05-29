import React, { Component } from 'react'
import { connect } from 'react-redux'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import { sendNotification, requestConfirmationResponse } from 'utils/sendNotifications'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic,
} from 'routes/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import config from '../../../../config'

class ConfirmTransaction extends Component {
  constructor(props) {
    super(props)

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined

    this.state = {
      transaction: {},
    }
  }

  componentDidMount = () => {
    chrome.windows.getCurrent((window) => {
      this.showTransaction(window.id)
    })
  }

  showTransaction = (windowId) => {
    const { transactions } = this.props
    if (!transactions || transactions.length === 0) {
      return
    }

    const windowTransaction = transactions.filter(t => t.popupId === windowId)
    const hasTransaction = windowTransaction.length === 1 && windowTransaction[0].tx
    if (!hasTransaction) {
      return
    }

    const tx = windowTransaction[0].tx
    this.setState({
      transaction: {
        hash: tx.hash,
        from: tx.from,
        gas: parseInt(tx.gas, 16).toString(10),
        gasPrice: parseInt(tx.gasPrice, 16).toString(10) / 1000000000,
        to: tx.to,
        data: tx.data
      }
    })
  }

  handleConfirmTransaction = () => {
    this.handleTransaction('confirmTransaction')
  }

  handleRejectTransaction = () => {
    this.handleTransaction('rejectTransaction', 'GNO')
  }

  handleTransaction = (type, prefix) => {
    const { transaction } = this.state
    const { currentSafe } = this.props.safes
    const { address, seed, unlockedMnemonic } = this.props.account.secondFA
    const account = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)

    requestConfirmationResponse(
      type,
      address,
      account.getPrivateKey(),
      transaction.hash,
      currentSafe,
      prefix
    )
      .then((response) => {
        if (response.status === 204)
          window.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { transaction } = this.state

    return (
      <Layout
        transaction={transaction}
        handleConfirmTransaction={this.handleConfirmTransaction}
        handleRejectTransaction={this.handleRejectTransaction}
      />
    )
  }
}

const mapStateToProps = ({ account, safes, transactions }, props) => {
  return {
    account,
    safes,
    transactions,
  }
}

export default connect(
  mapStateToProps,
)(ConfirmTransaction)
