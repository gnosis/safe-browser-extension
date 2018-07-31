import React from 'react'
import classNames from 'classnames'

import styles from 'assets/css/global.css'
import mobileImage from 'assets/images/mobile.svg'

const cx = classNames.bind(styles)

const FooterTransactions = ({
  reviewedTx,
  unlockRequest,
  handleConfirmTransaction,
  handleRejectTransaction,
}) => (
    <React.Fragment>
      {unlockRequest &&
        <div className={cx(styles.transactionState)}>
          <span className={styles.errorMessage}>
            <p>Unlock the extension before reviewing the transaction</p>
          </span>
        </div>
      }
      {!reviewedTx &&
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
      }
    </React.Fragment>
  )

export default FooterTransactions
