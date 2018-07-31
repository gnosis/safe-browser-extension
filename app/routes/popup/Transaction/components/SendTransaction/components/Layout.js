import React, { Component } from 'react'
import classNames from 'classnames/bind'

import FooterTransactions from 'routes/popup/Transaction/components/Transaction/FooterTransactions'
import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction,
    } = this.props

    return (
      <React.Fragment>
        {reviewedTx &&
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
        {loadedData && !reviewedTx &&
          <FooterTransactions
            lockedAccount={lockedAccount}
            handleRejectTransaction={handleRejectTransaction}
            handleConfirmTransaction={handleConfirmTransaction}
          />
        }
      </React.Fragment>
    )
  }
}

export default Layout
