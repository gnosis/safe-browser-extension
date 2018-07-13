import React from 'react'

import styles from 'assets/css/global.css'

const TransactionSummary = ({
  balance,
  totalCost,
}) => (
    <div className={styles.transactionSummary}>
      <span>
        <p>Safe balance</p>
        <strong>{balance ? balance.round(5).toString(10) : '-'} <small>ETH</small></strong>
      </span>
      <span>
        <p>Max. transaction fee</p>
        <span>
          <strong className={styles.textRed}>&nbsp; <small>ETH</small></strong>
          <small>&nbsp;</small>
        </span>
      </span>
      <span className={styles.subtotal}>
        <p>Max. total</p>
        <span>
          <strong className={styles.textRed}>{totalCost ? totalCost.round(5).toString(10) : '-'} <small>ETH</small></strong>
          <small></small>
        </span>
      </span>
    </div>
  )

export default TransactionSummary
