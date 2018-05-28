import React, { Component } from 'react'
import { connect } from 'react-redux'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'

import { sendNotification } from 'utils/sendNotifications'
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
    const { transaction } = this.state
    const { seed, unlockedMnemonic } = this.props.account.secondFA

    const account = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)

    console.log(account.getChecksumAddressString())
    const privateKey = account.getPrivateKey()

    const owners = []

    const signedTxHash = EthUtil.sha3(transaction.hash)
    const vrsTxHash = EthUtil.ecsign(signedTxHash, privateKey)
    const r = new BigNumber(EthUtil.bufferToHex(vrsTxHash.r))
    const s = new BigNumber(EthUtil.bufferToHex(vrsTxHash.s))
    const data = JSON.stringify({
      type: 'confirmTransaction',
      hash: transaction.hash,
      r: r.toString(10),
      s: s.toString(10),
      v: vrsTxHash.v.toString(10),
    })

    const response = sendNotification(owners, data, privateKey)
    if (response) {
      console.log(response.status)
    }
  }

  render() {
    const { transaction } = this.state

    return (
      <Layout
        transaction={transaction}
        handleConfirmTransaction={this.handleConfirmTransaction}
      />
    )
  }
}

const mapStateToProps = ({ account, transactions }, props) => {
  return {
    account,
    transactions,
  }
}

export default connect(
  mapStateToProps,
)(ConfirmTransaction)
