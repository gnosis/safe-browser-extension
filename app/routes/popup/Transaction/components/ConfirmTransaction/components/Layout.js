import React, { Component } from 'react'

import FooterTransactions from 'routes/popup/Transaction/components/Transaction/FooterTransactions'
import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'

class Layout extends Component {
  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction
    } = this.props

    return (
      <React.Fragment>
        <div className={styles.transactionState}>
          <span className={styles.message}>
            <img src={mobileImage} height='55' width='30' />
            <p>This transaction has been initiated by the Gnosis Safe mobile app. When you confirm, the mobile app will submit the transaction.</p>
          </span>
        </div>
        {(loadedData && !reviewedTx) &&
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
