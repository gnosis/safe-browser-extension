import React from 'react'
import ReactJson from 'react-json-view'
import Page from 'components/layout/Page'
import ContentHeader from 'components/headers/ContentHeader'
import { SIGN_MESSAGE_URL } from 'routes/routes'
import { MESSAGE, DOMAIN } from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({ signMessages, location }) => {
  const signedMessage = JSON.parse(signMessages.message[1])

  return (
    <Page background="grey" location={location} isPopup>
      <div className={styles.content}>
        <ContentHeader backLink={SIGN_MESSAGE_URL} message={MESSAGE} />
        <div className={styles.contentBody}>
          <h2>{DOMAIN}</h2>
          <br />
          <ReactJson
            src={signedMessage.domain}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            collapsed={false}
          />
          <br />
          <h2>{MESSAGE}</h2>
          <br />
          <ReactJson
            src={signedMessage.message}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            collapsed={false}
            indentWidth={1}
          />
        </div>
      </div>
    </Page>
  )
}

export default Layout
