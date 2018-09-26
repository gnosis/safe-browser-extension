import React, { Component } from 'react'

import FooterTransactions from 'routes/popup/Transaction/components/Transaction/FooterTransactions'
import ConfirmTransactionState from './ConfirmTransactionState'

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
        <ConfirmTransactionState />
        {(loadedData && !reviewedTx) &&
          <FooterTransactions
            loadedData={loadedData}
            reviewedTx={reviewedTx}
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
