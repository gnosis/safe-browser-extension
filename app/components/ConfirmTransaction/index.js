import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import 'components/App/styles.css'
import { assignTransaction } from '../../actions/transactions'

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

    if (transactions && transactions.length > 0) {
      const ts = transactions.filter(t => t.popupId === windowId)

      if (ts.length === 1 && ts[0].tx) {
        const tx = ts[0].tx

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
    }
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
    const { from, to, gas, gasPrice, data } = transaction

    return (
      <div className='container'>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>Gas: {gas}</p>
        <p>Gas price: {gasPrice} (GWei)</p>
        <p>Data: {data}</p>

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={this.updatePassword}
        />

        {errorMessage && <p>{errorMessage}</p>}

        <button onClick={this.handleConfirmTransaction}>
          Confirm transaction
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ account, transactions }, props) => {
  return {
    account,
    transactions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAssignTransaction: (tx, popupId) => dispatch(assignTransaction(tx, popupId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmTransaction)