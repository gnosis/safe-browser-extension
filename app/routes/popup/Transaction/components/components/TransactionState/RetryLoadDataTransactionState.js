import React from 'react'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const RetryLoadDataTransactionState = ({
  retryShowTransaction
}) => (
  <div className={cx(styles.transactionState)}>
    <span className={styles.await}>
      <p>AWAITING CONFIRMATION</p>
    </span>
    <span className={styles.resend}>
      <button
        className={cx(styles.button, styles.white)}
        onClick={retryShowTransaction}
      >Retry</button>
    </span>
  </div>
)

export default RetryLoadDataTransactionState
