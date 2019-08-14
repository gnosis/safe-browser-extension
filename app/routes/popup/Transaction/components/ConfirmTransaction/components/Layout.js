import React from 'react'
import FooterButtons from 'components/Footers/FooterButtons/containers'
import ConfirmTransactionState from 'components/Popup/TransactionState/ConfirmTransactionState'
import { TRANSACTION_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

const Layout = ({
  lockedAccount,
  loadedData,
  reviewedTx,
  handleConfirmTransaction,
  handleRejectTransaction
}) => (
  <React.Fragment>
    <ConfirmTransactionState />
    {loadedData && (
      <React.Fragment>
        {!reviewedTx && (
          <FooterButtons
            nextUrl={TRANSACTION_URL}
            lockedAccount={lockedAccount}
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

export default Layout
