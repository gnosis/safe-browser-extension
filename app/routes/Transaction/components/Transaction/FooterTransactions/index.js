import React from 'react'
import classNames from 'classnames'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const FooterTransactions = ({
  handleConfirmTransaction,
  handleRejectTransaction,
}) => (
    <span className={styles.buttonGroup}>
      <button onClick={handleRejectTransaction}
        className={cx(styles.button, styles.reject)}
      >
        REJECT
        </button>
      <button
        onClick={handleConfirmTransaction}
        className={cx(styles.button, styles.confirm)}
      >
        CONFIRM
        </button>
    </span>
  )

export default FooterTransactions
