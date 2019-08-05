import React, { Component } from 'react'

import FooterButtons from 'components/Footers/FooterButtons/containers'
import SendTransactionState from 'components/Popup/TransactionState/SendTransactionState'
import { TRANSACTION_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

class Layout extends Component {
  render() {
    const {
      loadedData,
      reviewedTx,
      seconds,
      handleConfirmTransaction,
      handleRejectTransaction,
    } = this.props

    return (
      <React.Fragment>
        {loadedData && (
          <React.Fragment>
            {reviewedTx ? (
              <SendTransactionState
                seconds={seconds}
                handleConfirmation={handleConfirmTransaction}
              />
            ) : (
              <FooterButtons
                nextUrl={TRANSACTION_URL}
                rejectionText={REJECT}
                confirmationText={CONFIRM}
                handleRejection={handleRejectTransaction}
                handleConfirmation={handleConfirmTransaction}
                rejectWithExtensionLockedAllowed
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default Layout
