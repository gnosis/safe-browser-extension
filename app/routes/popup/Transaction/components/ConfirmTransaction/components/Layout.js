import React, { Component } from 'react'

import FooterButtons from 'components/Footers/FooterButtons/containers'
import ConfirmTransactionState from '../../components/TransactionState/ConfirmTransactionState'
import RetryLoadDataTransactionState from '../../components/TransactionState/RetryLoadDataTransactionState'
import { TRANSACTION_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

class Layout extends Component {
  render() {
    const {
      loadedData,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction,
      retryShowTransaction
    } = this.props

    return (
      <React.Fragment>
        {loadedData === false && (
          <RetryLoadDataTransactionState
            retryShowTransaction={retryShowTransaction}
          />
        )}
        <ConfirmTransactionState />
        {loadedData && (
          <React.Fragment>
            {!reviewedTx && (
              <FooterButtons
                nextUrl={TRANSACTION_URL}
                rejectionText={REJECT}
                confirmationText={CONFIRM}
                handleRejection={handleRejectTransaction}
                handleConfirmation={handleConfirmTransaction}
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default Layout
