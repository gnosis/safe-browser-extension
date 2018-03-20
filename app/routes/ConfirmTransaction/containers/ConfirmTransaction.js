import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Layout from '../components/Layout'

class ConfirmTransaction extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      errorMessage: '',
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
        from: tx.from,
        gas: parseInt(tx.gas, 16).toString(10),
        gasPrice: parseInt(tx.gasPrice, 16).toString(10) / 1000000000,
        to: tx.to,
        data: tx.data
      }
    })
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  handleConfirmTransaction = () => {
    const { password } = this.state
    const { seed, address } = this.props.account

    if (!password || password.length < 10) {
      this.setState({ errorMessage: 'Invalid password' })
      return false
    }

    //TO-DO: Confirm transaction

  }

  render() {
    const { password, errorMessage, transaction } = this.state
    
    return (
      <Layout
        transaction={transaction}
        password={password}
        errorMessage={errorMessage}
        updatePassword={this.updatePassword}
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
