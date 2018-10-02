import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import { toGWei } from 'utils/helpers'
import { isTokenTransfer, getTokenTransferAddress } from '../containers/tokens'
import HeaderTransactions from 'routes/popup/Transaction/components/Transaction/HeaderTransactions'
import ConfirmTransaction from 'routes/popup/Transaction/components/ConfirmTransaction/containers/ConfirmTransaction'
import SendTransaction from 'routes/popup/Transaction/components/SendTransaction/containers/SendTransaction'
import TransactionAddressData from 'routes/popup/Transaction/components/Transaction/TransactionAddressData'
import TransactionSummary from 'routes/popup/Transaction/components/Transaction/TransactionSummary'
import styles from 'assets/css/global.css'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      transaction,
      transactions,
      ethBalance,
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
      handleTransaction,
      isTokenTransaction
    } = this.props

    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_UP })
    const totalGas = estimations && new BigNumber(estimations.dataGas).plus(new BigNumber(estimations.safeTxGas))
    const transactionFee = totalGas && toGWei(totalGas.times(new BigNumber(-estimations.gasPrice)))
    const totalCost = (value && transactionFee)
      ? value.plus(transactionFee)
      : null
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
            isTokenTransaction={isTokenTransaction}
            ethBalance={ethBalance}
            transactionFee={transactionFee}
            totalCost={totalCost}
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
