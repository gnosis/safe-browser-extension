import React, { Component } from 'react'

import FooterButtons from 'components/Footers/FooterButtons/containers'
import ConfirmTransactionState from 'components/Popup/TransactionState/ConfirmTransactionState'
import { TRANSACTION_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

class Layout extends Component {
  render() {
    const {
      loadedData,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction
    } = this.props

    return (
      <React.Fragment>
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
