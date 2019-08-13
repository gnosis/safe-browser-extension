import React, { Component } from 'react'
import BigNumber from 'bignumber.js'
import {
  REVIEW_TRANSACTION,
  CONFIRM_REQUEST
} from '../../../../../config/messages'
import Page from 'components/layout/Page'
import HeaderPopup from 'components/Popup/HeaderPopup'
import AccountData from 'components/Popup/AccountData'
import TransactionSummary from 'components/Popup/TransactionSummary'
import ConfirmTransaction from 'routes/popup/Transaction/components/ConfirmTransaction/containers/ConfirmTransaction'
import SendTransaction from 'routes/popup/Transaction/components/SendTransaction/containers/SendTransaction'
import { isTokenTransfer, getTokenTransferAddress } from '../containers/tokens'
import {
  REPLACE_RECOVERY_PRASE,
  REPLACE_RECOVERY_PHRASE_DESCRIPTION
} from '../../../../../config/messages'
import styles from './style.css'

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
      handleTransaction,
      location
    } = this.props

    const decimalValue = transaction.decimals
      ? transaction.displayedValue.div(10 ** transaction.decimals)
      : transaction.displayedValue
    const displayedValue = decimalValue ? '-' + decimalValue.toString(10) : '-'
    const toAddress = isTokenTransfer(transaction.data)
      ? getTokenTransferAddress(transaction.data)
      : transaction.to

    const title =
      transaction.type === 'confirmTransaction'
        ? CONFIRM_REQUEST
        : REVIEW_TRANSACTION

    return (
      <Page background="grey" location={location} isPopup>
        <div className={styles.content}>
          <HeaderPopup
            title={title}
            reviewedElement={reviewedTx}
            numElements={transactions.txs.length}
            previousElement={previousTransaction}
            elementNumber={transactionNumber}
            nextElement={nextTransaction}
          />
          <div className={styles.contentBody}>
            <form onSubmit={this.prevent} className={styles.PageContent}>
              <AccountData
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
                  <AccountData address={toAddress} noBalance />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className={styles.replaceRecoveryPhrase}>
                    <strong>{REPLACE_RECOVERY_PRASE.toString()}</strong>
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
          </div>
        </div>
      </Page>
    )
  }
}

export default Layout
