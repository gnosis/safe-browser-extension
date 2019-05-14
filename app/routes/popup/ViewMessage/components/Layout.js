import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import { SIGN_MESSAGE_URL } from 'routes/routes'
import { MESSAGE, DOMAIN } from '../../../../../config/messages'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render() {
    const { signMessages } = this.props

    const signedMessage = JSON.parse(signMessages.message[1])

    return (
      <div className={styles.overlayPage}>
        <span className={styles.overlayPageHeader}>
          <Link
            to={SIGN_MESSAGE_URL}
            className={cx(styles.btnBack, styles.active)}
          />
          <h2>{MESSAGE}</h2>
        </span>
        <span className={styles.overlayPageContent}>
          <div style={{ padding: '20px' }}>
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
            />
          </div>
        </span>
      </div>
    )
  }
}

export default Layout
