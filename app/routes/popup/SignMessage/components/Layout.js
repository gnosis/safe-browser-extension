import React from 'react'
import { Link } from 'react-router-dom'
import Page from 'components/layout/Page'
import Paragraph from 'components/layout/Paragraph'
import HeaderPopup from 'components/Popup/HeaderPopup'
import AccountData from 'components/Popup/AccountData'
import SendSignMessage from 'routes/popup/SignMessage/components/SendSignMessage/containers/SendSignMessage'
import { VIEW_MESSAGE_URL } from 'routes/routes'
import {
  REVIEW_SIGN_MESSAGE,
  NAME,
  VERIFYING_CONTRACT,
  VIEW_MESSAGE
} from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({
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
  handleSignMessage,
  location
}) => {
  const prevent = (e) => {
    e.preventDefault()
  }

  const signedMessage = JSON.parse(signMessages.message[1])
  const senderUrl = signMessages.message[4]

  return (
    <Page background="grey" location={location} isPopup>
      <div className={styles.content}>
        <HeaderPopup
          title={REVIEW_SIGN_MESSAGE}
          numElements={1}
          elementNumber={0}
        />
        <form onSubmit={prevent} className={styles.contentBody}>
          <AccountData
            address={address}
            alias={safeAlias}
            balance={balance}
            symbol={'ETH'}
          />
          {signedMessage && (
            <React.Fragment>
              <div className={styles.signMessageSummary}>
                <span>
                  <Paragraph bold>{NAME}</Paragraph>
                  <span>{signedMessage.domain.name}</span>
                </span>
                <span>
                  <Paragraph bold>Url</Paragraph>
                  <span>{senderUrl}</span>
                </span>
                <span>
                  <Paragraph bold>{VERIFYING_CONTRACT}</Paragraph>
                  <span>{signedMessage.domain.verifyingContract}</span>
                </span>
              </div>
              <Link className={styles.viewMessage} to={VIEW_MESSAGE_URL}>
                {VIEW_MESSAGE}
              </Link>
            </React.Fragment>
          )}
          {signMessages && signMessages.message[2] === 'sendSignMessage' && (
            <SendSignMessage
              ethAccount={ethAccount}
              showSignMessage={showSignMessage}
              handleSignMessage={handleSignMessage}
              removeSignMessage={removeSignMessage}
              lockedAccount={lockedAccount}
              loadedData={loadedData}
              reviewedSignature={reviewedSignature}
              location={location}
            />
          )}
        </form>
      </div>
    </Page>
  )
}

export default Layout
