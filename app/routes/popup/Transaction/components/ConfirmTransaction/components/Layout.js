import React, { Component } from 'react'

import FooterTransactions from '../../components/FooterTransactions'
import ConfirmTransactionState from '../../components/TransactionState/ConfirmTransactionState'
import RetryLoadDataTransactionState from '../../components/TransactionState/RetryLoadDataTransactionState'
class Layout extends Component {
  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction,
      retryShowTransaction
    } = this.props

    return (
      <React.Fragment>
        {(loadedData === false) &&
          <RetryLoadDataTransactionState
            retryShowTransaction={retryShowTransaction}
          />
        }
        <ConfirmTransactionState />
        {loadedData && (
          <React.Fragment>
            {!reviewedTx &&
              <FooterTransactions
                loadedData={loadedData}
                reviewedTx={reviewedTx}
                lockedAccount={lockedAccount}
                handleRejectTransaction={handleRejectTransaction}
                handleConfirmTransaction={handleConfirmTransaction}
              />
            }
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default Layout
