import React from 'react'
import FooterButtons from 'components/Footers/FooterButtons/containers'
import SendTransactionState from 'components/Popup/TransactionState/SendTransactionState'
import { TRANSACTION_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

const Layout = ({
  lockedAccount,
  loadedData,
  reviewedTx,
  seconds,
  handleConfirmTransaction,
  handleRejectTransaction
}) => (
  <React.Fragment>
    {loadedData && (
      <React.Fragment>
        {reviewedTx ? (
          <SendTransactionState
            seconds={seconds}
            lockedAccount={lockedAccount}
            handleConfirmation={handleConfirmTransaction}
            nextUrl={TRANSACTION_URL}
          />
        ) : (
          <FooterButtons
            nextUrl={TRANSACTION_URL}
            lockedAccount={lockedAccount}
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

export default Layout
