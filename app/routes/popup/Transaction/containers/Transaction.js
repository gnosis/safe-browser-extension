import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'

import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import selector from './selector'
import { getGasEstimation } from 'routes/popup/Transaction/components/SendTransaction/containers/gasData'
import actions from './actions'
import { promisify } from 'utils/promisify'
import config from '../../../../../config'
import Header from 'components/Header'
import Layout from '../components/Layout'
import styles from 'assets/css/global.css'

class Transaction extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transactionNumber: 0,
      balance: undefined,
      loadedData: false,
      reviewedTx: false,
    }

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  componentDidMount = () => {
    const { seed, unlockedMnemonic } = this.props.account.secondFA
    const { transactionNumber } = this.state

    this.ethAccount = !unlockedMnemonic && this.password
      ? getDecryptedEthAccount(seed, this.password)
      : createAccountFromMnemonic(unlockedMnemonic)
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

    const tx = transactions.txs[transactionNumber].tx
    if (!tx) return

    this.setState({
      reviewedTx: false,
      loadedData: false,
      transactionNumber,
      balance: undefined,
      estimations: undefined
    })

    try {
      const balance = await this.getBalance(tx.from)
      const value = (tx.value) ? new BigNumber(tx.value).toString(10) : '0'
      const estimations = await getGasEstimation(tx.from, tx.to, value, tx.data, 0)
      const loadedData = (balance !== null) && (estimations !== null)
      this.setState({ balance, estimations, loadedData })
    }
    catch (err) {
      console.error(err)
    }
  }

  nextTransaction = () => {
    const { transactionNumber } = this.state
    const { transactions } = this.props

    if (transactionNumber < (transactions.txs.length - 1)) { this.showTransaction(transactionNumber + 1) }
  }

  previousTransaction = () => {
    const { transactionNumber } = this.state

    if (transactionNumber > 0) { this.showTransaction(transactionNumber - 1) }
  }

  handleTransaction = () => {
    const { account } = this.props
    if (account.lockedState) return false
    this.setState({ reviewedTx: true })
    return true
  }

  removeTransaction = (position) => {
    this.props.onRemoveTransaction(position)
  }

  setUpTransaction = (transaction, estimations) => {
    if (!transaction.value)
      transaction.value = '0'
    if (!transaction.data)
      transaction.data = '0x'
    transaction.safe = transaction.from
    transaction.operation = '0'

    if (!estimations) return
    transaction.txGas = new BigNumber(estimations.safeTxGas).toString(10)
    transaction.dataGas = new BigNumber(estimations.dataGas).toString(10)
    transaction.gasPrice = new BigNumber(estimations.gasPrice).toString(10)
    transaction.gasToken = estimations.gasToken
  }

  getSafeAlias = (address) => {
    const { safes } = this.props
    return safes.safes.filter(s => s.address === address)[0].alias
  }

  render () {
    const {
      transactionNumber,
      balance,
      estimations,
      loadedData,
      reviewedTx,
    } = this.state
    const { account, transactions } = this.props

    const transaction = transactions.txs[transactionNumber].tx
    this.setUpTransaction(transaction, estimations)

    return (
      <div className={styles.extensionTx}>
        <div className={styles.extensionInner}>
          <Header noBorder txReview properties={this.props.location} />
          <div className={styles.Page}>
            <Layout
              transaction={transaction}
              transactions={transactions}
              balance={balance}
              transactionNumber={transactionNumber}
              lockedAccount={account.lockedState}
              loadedData={loadedData}
              reviewedTx={reviewedTx}
              estimations={estimations}
              safeAlias={this.getSafeAlias(transaction.safe)}
              ethAccount={this.ethAccount}
              previousTransaction={this.previousTransaction}
              nextTransaction={this.nextTransaction}
              removeTransaction={this.removeTransaction}
              showTransaction={this.showTransaction}
              handleTransaction={this.handleTransaction}
            />
          </div>
        </div>
      </div>
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
  mapDispatchToProps
)(Transaction)
