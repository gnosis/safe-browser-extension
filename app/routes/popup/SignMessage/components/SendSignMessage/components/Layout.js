import React from 'react'
import FooterButtons from 'components/Footers/FooterButtons/containers'
import SendTransactionState from 'components/Popup/TransactionState/SendTransactionState'
import { SIGN_MESSAGE_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

const Layout = ({
  lockedAccount,
  loadedData,
  reviewedSignature,
  seconds,
  handleConfirmSignMessage,
  handleRejectSignMessage
}) => (
  <React.Fragment>
    {loadedData && (
      <React.Fragment>
        {reviewedSignature ? (
          <SendTransactionState
            seconds={seconds}
            lockedAccount={lockedAccount}
            handleConfirmation={handleConfirmSignMessage}
            nextUrl={SIGN_MESSAGE_URL}
          />
        ) : (
          <FooterButtons
            nextUrl={SIGN_MESSAGE_URL}
            lockedAccount={lockedAccount}
            rejectionText={REJECT}
            confirmationText={CONFIRM}
            handleRejection={handleRejectSignMessage}
            handleConfirmation={handleConfirmSignMessage}
          />
        )}
      </React.Fragment>
    )}
  </React.Fragment>
)

export default Layout
