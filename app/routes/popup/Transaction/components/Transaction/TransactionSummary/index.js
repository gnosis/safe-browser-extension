import React from 'react'

import styles from 'assets/css/global.css'

const TransactionSummary = ({
  ethBalance,
  transactionFee,
  isTokenTransaction,
  totalCost
}) => {
  const txEthBalance = ethBalance ? ethBalance.toString(10) : '-'
  const txFee = transactionFee ? transactionFee.toString(10) : '-'
  const txCost = totalCost ? totalCost.toString(10) : '-'

  return (
    <div className={styles.transactionSummary}>
      <span>
        <p>Safe balance</p>
        <strong>{txEthBalance} <small>ETH</small></strong>
      </span>
      <span>
        <p>Estimated transaction fee</p>
        <span>
          <strong className={styles.textRed}>{txFee} <small>ETH</small></strong>
          {/* <small>&nbsp;</small> */}
        </span>
      </span>
      {!isTokenTransaction &&
        <span className={styles.subtotal}>
          <p>Max. total</p>
          <span>
            <strong className={styles.textRed}>{txCost} <small>ETH</small></strong>
            <small />
          </span>
        </span>
      }
    </div>
  )
}

export default TransactionSummary
