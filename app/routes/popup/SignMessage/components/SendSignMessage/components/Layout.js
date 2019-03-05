import React, { Component } from 'react'

import FooterButtons from 'components/Footers/FooterButtons/containers'
import SendTransactionState from 'components/Popup/TransactionState/SendTransactionState'
import { SIGN_MESSAGE_URL } from 'routes/routes'
import {
  REJECT,
  CONFIRM
} from '../../../../../../../config/messages'

class Layout extends Component {
  render () {
    const {
      loadedData,
      reviewedSignature,
      seconds,
      owners,
      ownerSignatures,
      threshold,
      handleConfirmSignMessage,
      handleRejectSignMessage,
    } = this.props

    return (
      <React.Fragment>
        {(loadedData === false) &&
          <div>RETRY LOAD DATA</div>
        }
        {loadedData && (
          <React.Fragment>
            {reviewedSignature ? (
              <div>
                <div style={{padding:'20px'}}>
                  <h2>Confirmations needed: {ownerSignatures.length}/{threshold && threshold.toString()}</h2>
                  <br />
                  <h2>Collected signatures from:</h2>
                  <br />
                  {ownerSignatures && ownerSignatures.map(owner => (
                    <div key={owner.address}>{owner.address}<br /><br /></div>
                  ))}
                </div>
                {/*<SendTransactionState
                  seconds={seconds}
                  handleConfirmTransaction={handleConfirmSignMessage}
                />*/}
              </div>
            ) : (
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
