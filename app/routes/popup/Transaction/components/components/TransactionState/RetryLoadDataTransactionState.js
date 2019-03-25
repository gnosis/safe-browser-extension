import React from 'react'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'
import {
  AWAITING_CONFIRMATIONS,
  RETRY
} from '../../../../../../../config/messages'

const cx = classNames.bind(styles)

const RetryLoadDataTransactionState = ({ retryShowTransaction }) => (
  <div className={cx(styles.transactionState)}>
    <span className={styles.await}>
      <p>{AWAITING_CONFIRMATIONS}</p>
    </span>
    <span className={styles.resend}>
      <button
        className={cx(styles.button, styles.white)}
        onClick={retryShowTransaction}
      >
        {RETRY}
      </button>
    </span>
  </div>
)

export default RetryLoadDataTransactionState
