import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import { toGWei } from 'utils/helpers'
import HeaderTransactions from 'routes/Transaction/components/Transaction/HeaderTransactions'
import ConfirmTransaction from 'routes/Transaction/components/ConfirmTransaction/containers/ConfirmTransaction'
import SendTransaction from 'routes/Transaction/components/SendTransaction/containers/SendTransaction'
import TransactionAddressData from 'routes/Transaction/components/Transaction/TransactionAddressData'
import TransactionSummary from 'routes/Transaction/components/Transaction/TransactionSummary'
import styles from 'assets/css/global.css'

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_UP })

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      transaction,
      transactions,
      balance,
      transactionNumber,
      unlockRequest,
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

    const transactionValue = transaction.value ? toGWei(new BigNumber(-transaction.value)) : new BigNumber(0)
    const totalGas = estimations && new BigNumber(estimations.dataGas).plus(new BigNumber(estimations.safeTxGas))
    const transactionFee = totalGas && toGWei(totalGas.times(new BigNumber(-estimations.gasPrice)))
    const totalCost = (transactionValue && transactionFee)
      ? transactionValue.plus(transactionFee)
      : null

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
          />
          <div className={styles.transactionValue}>
            <strong>{transactionValue ? transactionValue.round(5).toString(10) : '-'} <small>ETH</small></strong>
            <small>&nbsp;</small>
          </div>
          <TransactionAddressData
            style={styles.transactionRecipient}
            address={transaction.to}
            noBalance
          />
          <TransactionSummary
            balance={balance}
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
              unlockRequest={unlockRequest}
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
              unlockRequest={unlockRequest}
              reviewedTx={reviewedTx}
            />
          }
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
