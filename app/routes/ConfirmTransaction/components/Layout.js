import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import BigNumber from 'bignumber.js'

import Header from 'components/Header'
import HeaderTransactions from '../components/HeaderTransactions'
import TransactionAddressData from '../components/TransactionAddressData'
import TransactionSummary from '../components/TransactionSummary'
import FooterTransactions from '../components/FooterTransactions'
import styles from 'assets/css/global.css'

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN })
const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      transactionsLength,
      transaction,
      transactionNumber,
      balance,
      unlockRequest,
      reviewedTx,
      safeAlias,
      handleConfirmTransaction,
      handleRejectTransaction,
      nextTransaction,
      previousTransaction,
      properties,
    } = this.props

    const transactionValue = transaction.value && new BigNumber(-transaction.value).dividedBy(1000000000000000000)
    // TO-DO: Also subtract estimated transaction gas to totalCost:
    const totalCost = transactionValue

    return (
      <div className={styles.extensionTx} data-demo='1'>
        <div className={styles.extensionInner}>
          <Header noBorder txReview properties={properties} />
          <div className={styles.Page}>
            <HeaderTransactions
              transactionsLength={transactionsLength}
              previousTransaction={previousTransaction}
              transactionNumber={transactionNumber}
              nextTransaction={nextTransaction}
            />
            <form onSubmit={this.prevent} className={styles.PageContent}>
              <TransactionAddressData
                style={styles.transactionFrom}
                address={transaction.from}
                alias={safeAlias}
                balance={balance}
              />
              <div className={styles.transactionValue}>
                <strong>{transactionValue && transactionValue.round(5).toString(10)} <small>ETH</small></strong>
                <small>&nbsp;</small>
              </div>
              <TransactionAddressData
                style={styles.transactionRecipient}
                address={transaction.to}
                noBalance
              />
              <TransactionSummary
                balance={balance}
                totalCost={totalCost}
              />
              <FooterTransactions
                reviewedTx={reviewedTx}
                unlockRequest={unlockRequest}
                handleRejectTransaction={handleRejectTransaction}
                handleConfirmTransaction={handleConfirmTransaction}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
