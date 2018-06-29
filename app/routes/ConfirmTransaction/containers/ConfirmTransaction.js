import React, { Component } from 'react'
import { connect } from 'react-redux'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_UP })

import { requestConfirmationResponse } from 'utils/sendNotifications'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic,
} from 'routes/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import selector from './selector'
import Layout from '../components/Layout'
import config from '../../../../config'
import actions from './actions'
import { promisify } from 'utils/promisify'

class ConfirmTransaction extends Component {
  constructor(props) {
    super(props)

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined

    this.state = {
      transactionNumber: 0,
      balance: undefined,
      unlockRequest: false,
      reviewedTx: false,
    }
  }

  componentDidMount = () => {
    const { transactionNumber } = this.state
    this.showTransaction(transactionNumber)
  }

  getBalance = async (address) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(config.networks[config.currentNetwork].url))
    const balance = await promisify(cb => web3.eth.getBalance(address, cb))
    return web3.fromWei(balance, 'ether')
  }

  showTransaction = async (transactionNumber) => {
    const { transactions } = this.props
    if (!transactions || transactions.txs.length === 0) {
      return
    }

    this.setState({
      reviewedTx: false,
      transactionNumber,
      balance: undefined,
    })

    const tx = transactions.txs[transactionNumber]
    if (!tx) return

    const balance = await this.getBalance(tx.from)
    this.setState({ balance })
  }

  handleConfirmTransaction = () => {
    const { account } = this.props
    if (account.lockedState) {
      this.setState({ unlockRequest: true })
      return
    }

    this.handleTransaction('confirmTransaction')
    this.setState({ reviewedTx: true })
  }

  handleRejectTransaction = () => {
    const { account } = this.props
    if (account.lockedState) {
      this.setState({ unlockRequest: true })
      return
    }

    this.handleTransaction('rejectTransaction', 'GNO')
    this.setState({ reviewedTx: true })
  }

  handleTransaction = (type, prefix) => {
    const { transactionNumber } = this.state
    const { safes, transactions } = this.props
    const { address, seed, unlockedMnemonic } = this.props.account.secondFA
    const account = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)

    const hash = transactions.txs[transactionNumber].hash
    requestConfirmationResponse(
      type,
      address,
      account.getPrivateKey(),
      hash,
      safes.currentSafe,
      prefix
    )
      .then((response) => {
        if (response.status === 204) {
          if (transactions.txs.length === 1) {
            this.props.onRemoveTransaction(transactionNumber)
            window.close()
            return
          }

          const position = (transactionNumber >= 1) ? transactionNumber - 1 : 0
          this.props.onRemoveTransaction(transactionNumber)
          this.showTransaction(position)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  nextTransaction = () => {
    const { transactionNumber } = this.state
    const { transactions } = this.props

    if (transactionNumber < (transactions.txs.length - 1))
      this.showTransaction(transactionNumber + 1)
  }

  previousTransaction = () => {
    const { transactionNumber } = this.state

    if (transactionNumber > 0)
      this.showTransaction(transactionNumber - 1)
  }

  render() {
    const {
      transactionNumber,
      balance,
      unlockRequest,
      reviewedTx,
    } = this.state
    const { transactions } = this.props
    const transaction = transactions.txs[transactionNumber]

    return (
      <Layout
        transactionsLength={transactions.txs.length}
        transaction={transaction}
        transactionNumber={transactionNumber}
        balance={balance}
        handleConfirmTransaction={this.handleConfirmTransaction}
        handleRejectTransaction={this.handleRejectTransaction}
        nextTransaction={this.nextTransaction}
        previousTransaction={this.previousTransaction}
        unlockRequest={unlockRequest}
        reviewedTx={reviewedTx}
        safeAlias={this.props.currentSafeAlias}
        properties={this.props.location}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveTransaction: (position) => dispatch(actions.removeTransaction(position))
  }
}

export default connect(
  selector,
  mapDispatchToProps,
)(ConfirmTransaction)
