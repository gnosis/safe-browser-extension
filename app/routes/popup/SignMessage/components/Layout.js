import React, { Component } from 'react'
import ReactJson from 'react-json-view'

import { REVIEW_SIGN_MESSAGE } from '../../../../../config/messages'
import HeaderPopup from 'components/Popup/HeaderPopup'
import AccountData from 'components/Popup/AccountData'
import SendSignMessage from 'routes/popup/SignMessage/components/SendSignMessage/containers/SendSignMessage'
import styles from 'assets/css/global.css'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      signMessages,
      balance,
      lockedAccount,
      loadedData,
      reviewedSignature,
      address,
      safeAlias,
      ethAccount,
      removeSignMessage,
      showSignMessage,
      handleSignMessage
    } = this.props

    return (
      <React.Fragment>
        <HeaderPopup
          title={REVIEW_SIGN_MESSAGE}
          numElements={1}
          elementNumber={0}
        />
        <form onSubmit={this.prevent} className={styles.PageContent}>
          <AccountData
            address={address}
            alias={safeAlias}
            balance={balance}
            symbol={'ETH'}
          />
          {!reviewedSignature && signMessages && signMessages.message[1] &&
            <div style={{padding:'20px'}}>
              <h2>Domain</h2>
              <br/>
              <ReactJson
                src={JSON.parse(signMessages.message[1]).domain}
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
                collapsed={1}
              />
              <br/>
              <h2>Message</h2>
              <br/>
              <ReactJson
                src={JSON.parse(signMessages.message[1]).message}
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
                collapsed={1}
              />
            </div>
          }
          {signMessages && (signMessages.message[2] === 'sendSignMessage') &&
            <SendSignMessage
              ethAccount={ethAccount}
              showSignMessage={showSignMessage}
              handleSignMessage={handleSignMessage}
              removeSignMessage={removeSignMessage}
              lockedAccount={lockedAccount}
              loadedData={loadedData}
              reviewedSignature={reviewedSignature}
            />
        }
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
