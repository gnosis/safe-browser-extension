import React, { Component } from 'react'

import FooterButtons from 'components/Footers/FooterButtons/containers'
import { SIGN_MESSAGE_URL } from 'routes/routes'
import { REJECT, CONFIRM } from '../../../../../../../config/messages'

class Layout extends Component {
  render() {
    const {
      loadedData,
      reviewedSignature,
      handleConfirmSignMessage,
      handleRejectSignMessage,
      retryShowSignMessage
    } = this.props

    return (
      <React.Fragment>
        {loadedData === false && (
          <RetryLoadDataTransactionState
            retryShowElement={retryShowSignMessage}
          />
        )}
        {loadedData && (
          <React.Fragment>
            {!reviewedSignature && (
              <FooterButtons
                nextUrl={SIGN_MESSAGE_URL}
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
  }
}

export default Layout
