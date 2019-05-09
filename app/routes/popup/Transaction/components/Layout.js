import React, { Component } from 'react'

import { isTokenTransfer, getTokenTransferAddress } from '../containers/tokens'
import HeaderTransactions from 'routes/popup/Transaction/components/components/HeaderTransactions'
import TransactionAddressData from 'routes/popup/Transaction/components/components/TransactionAddressData'
import TransactionSummary from 'routes/popup/Transaction/components/components/TransactionSummary'
import ConfirmTransaction from 'routes/popup/Transaction/components/ConfirmTransaction/containers/ConfirmTransaction'
import SendTransaction from 'routes/popup/Transaction/components/SendTransaction/containers/SendTransaction'
import styles from 'assets/css/global.css'
import {
  REPLACE_RECOVERY_PRASE,
  REPLACE_RECOVERY_PHRASE_DESCRIPTION
} from '../../../../../config/messages'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      transaction,
      transactions,
      balance,
      symbol,
      transactionNumber,
      lockedAccount,
      loadedData,
      reviewedTx,
      transactionSummary,
      replaceRecoveryPhrase,
      safeAlias,
      ethAccount,
      previousTransaction,
      nextTransaction,
      removeTransaction,
      showTransaction,
      handleTransaction
    } = this.props

    const decimalValue = transaction.decimals
      ? transaction.displayedValue.div(10 ** transaction.decimals)
      : transaction.displayedValue
    const displayedValue = decimalValue ? decimalValue.toString(10) : '-'
    const toAddress = isTokenTransfer(transaction.data)
      ? getTokenTransferAddress(transaction.data)
      : transaction.to
    let replaceRecoveryPhraseTitle
    if (replaceRecoveryPhrase) {
      replaceRecoveryPhraseTitle =
        REPLACE_RECOVERY_PRASE.toString().split('\\n')[0] + '...'
    }

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
            address={transaction.safe}
            alias={safeAlias}
            balance={balance}
            symbol={symbol}
            noBalance={replaceRecoveryPhrase}
          />

          {!replaceRecoveryPhrase ? (
            <React.Fragment>
              <div className={styles.transactionValue}>
                <strong>
                  {displayedValue} {symbol}
                </strong>
                <small>&nbsp;</small>
              </div>
              <TransactionAddressData address={toAddress} noBalance />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles.replaceRecoveryPhrase}>
                <strong>{replaceRecoveryPhraseTitle}</strong>
              </div>
              <div className={styles.replaceRecoveryPhraseDesc}>
                {REPLACE_RECOVERY_PHRASE_DESCRIPTION}
              </div>
            </React.Fragment>
          )}

          <TransactionSummary
            transaction={transaction}
            transactionSummary={transactionSummary}
          />
          {transaction && transaction.type === 'confirmTransaction' && (
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
          )}
          {transaction && transaction.type === 'sendTransaction' && (
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
          )}
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
