import React, { Component } from 'react'

import { isTokenTransfer, getTokenTransferAddress } from '../containers/tokens'
import HeaderTransactions from 'routes/popup/Transaction/components/components/HeaderTransactions'
import TransactionAddressData from 'routes/popup/Transaction/components/components/TransactionAddressData'
import TransactionSummary from 'routes/popup/Transaction/components/components/TransactionSummary'
import ConfirmTransaction from 'routes/popup/Transaction/components/ConfirmTransaction/containers/ConfirmTransaction'
import SendTransaction from 'routes/popup/Transaction/components/SendTransaction/containers/SendTransaction'
import styles from 'assets/css/global.css'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      transaction,
      transactions,
      balance,
      symbol,
      value,
      transactionNumber,
      lockedAccount,
      loadedData,
      reviewedTx,
      estimations,
      safeAlias,
      ethAccount,
      previousTransaction,
      nextTransaction,
      removeTransaction,
      showTransaction,
      handleTransaction
    } = this.props

    const val = value ? value.toString(10) : '-'
    const toAddress = isTokenTransfer(transaction.data) ? getTokenTransferAddress(transaction.data) : transaction.to

    return (
      <React.Fragment>
        <HeaderTransactions
          transactionsLength={transactions.txs.length}
          previousTransaction={previousTransaction}
          transactionNumber={transactionNumber}
          nextTransaction={nextTransaction}
          reviewedTx={reviewedTx}
        />
        <form onSubmit={this.prevent} className={styles.PageContent}>
          <TransactionAddressData
            style={styles.transactionFrom}
            address={transaction.safe}
            alias={safeAlias}
            balance={balance}
            symbol={symbol}
          />
          <div className={styles.transactionValue}>
            <strong>{val} <small>{symbol}</small></strong>
            <small>&nbsp;</small>
          </div>
          <TransactionAddressData
            style={styles.transactionRecipient}
            address={toAddress}
            noBalance
          />
          <TransactionSummary
            transaction={transaction}
            estimations={estimations}
            value={value}
          />
          {transaction && (transaction.type === 'confirmTransaction') &&
            <ConfirmTransaction
              transactionNumber={transactionNumber}
              ethAccount={ethAccount}
              showTransaction={showTransaction}
              handleTransaction={handleTransaction}
              removeTransaction={removeTransaction}
              transaction={transaction}
              lockedAccount={lockedAccount}
              loadedData={loadedData}
              reviewedTx={reviewedTx}
            />
          }
          {transaction && (transaction.type === 'sendTransaction') &&
            <SendTransaction
              transactionNumber={transactionNumber}
              ethAccount={ethAccount}
              showTransaction={showTransaction}
              handleTransaction={handleTransaction}
              removeTransaction={removeTransaction}
              transaction={transaction}
              lockedAccount={lockedAccount}
              loadedData={loadedData}
              reviewedTx={reviewedTx}
            />
          }
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
