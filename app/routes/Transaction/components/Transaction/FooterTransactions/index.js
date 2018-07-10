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
  type,
}) => (
    <React.Fragment>
      {reviewedTx && type === 'sendTransaction' &&
        <div className={cx(styles.transactionState)}>
          <span className={styles.await}>
            <p>AWAITING CONFIRMATION</p>
            <div className={styles.progress}>
              <div className={styles.indeterminate}></div>
            </div>
          </span>
          <span className={styles.message}>
            <img src={mobileImage} height='55' width='30' />
            <p>Confirm this transaction with the Gnosis Safe mobile app.</p>
          </span>
          <span className={styles.resend}>
            <p>wait before re-sending request</p>
            <button className={cx(styles.button, styles.white)} disabled>Re-send confirmation request</button>
          </span>
        </div>
      }
      {type === 'confirmTransaction' &&
        <div className={styles.transactionState}>
          <span className={styles.message}>
            <img src={mobileImage} height='55' width='30' />
            <p>This transaction has been initiated by the Gnosis Safe mobile app. When you confirm, the mobile app will submit the transaction.</p>
          </span>
        </div>
      }
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
