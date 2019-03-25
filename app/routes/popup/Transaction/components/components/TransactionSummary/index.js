import React, { Component } from 'react'

// import { ADDRESS_ZERO } from 'utils/helpers'
// import { isTokenTransfer } from '../../../containers/tokens'
import {
  SAFE_BALANCE,
  ESTIMATED_TRANSACTION_FEE
  // MAX_TOTAL
} from '../../../../../../../config/messages'
import styles from 'assets/css/global.css'

class TransactionSummary extends Component {
  render = () => {
    const {
      // transaction,
      transactionSummary
    } = this.props

    const txFeeString =
      transactionSummary && transactionSummary.transactionFee
        ? -transactionSummary.transactionFee.toString()
        : '-'
    // const txCostString = transactionSummary && transactionSummary.transactionTotalCost ? -transactionSummary.transactionTotalCost.toString() : '-'
    const gasTokenBalanceString =
      transactionSummary && transactionSummary.gasTokenBalance
        ? transactionSummary.gasTokenBalance.toString()
        : '-'
    const gasTokenSymbol =
      transactionSummary &&
      transactionSummary.gasTokenSymbol &&
      transactionSummary.gasTokenSymbol

    /*
    const isTokenTx = isTokenTransfer(transaction.data)
    const showMaxTotal = (transaction.gasToken && transaction.gasToken !== ADDRESS_ZERO)
      ? transactionSummary && (transaction.to === transaction.gasToken)
      : !isTokenTx
    */

    return (
      <div className={styles.transactionSummary}>
        <span>
          <p>{SAFE_BALANCE}</p>
          <span>
            <strong>
              {gasTokenBalanceString} <small>{gasTokenSymbol}</small>
            </strong>
          </span>
        </span>
        <span>
          <p>{ESTIMATED_TRANSACTION_FEE}</p>
          <span>
            <strong className={styles.textRed}>
              {txFeeString} <small>{gasTokenSymbol}</small>
            </strong>
          </span>
        </span>
        {/*showMaxTotal &&
          <span className={styles.subtotal}>
            <p>{MAX_TOTAL}</p>
            <span>
              <strong className={styles.textRed}>{txCostString} <small>{gasTokenSymbol}</small></strong>
              <small />
            </span>
          </span>
        */}
      </div>
    )
  }
}

export default TransactionSummary
