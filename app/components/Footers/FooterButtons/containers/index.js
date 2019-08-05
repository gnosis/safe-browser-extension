import React, { Component } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'
import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'
import { PASSWORD_URL } from 'routes/routes'

const cx = classNames.bind(styles)

class FooterButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestResolved: false
    }
  }

  handleRejection = () => {
    const {
      handleRejection,
      lockedAccount,
      rejectWithExtensionLockedAllowed
    } = this.props

    if (lockedAccount && !rejectWithExtensionLockedAllowed) {
      this.setState({ requestResolved: true })
    } else {
      handleRejection()
    }
  }

  handleConfirmation = () => {
    const { handleConfirmation, lockedAccount } = this.props

    if (lockedAccount) {
      this.setState({ requestResolved: true })
    } else {
      handleConfirmation()
    }
  }

  render() {
    const {
      lockedAccount,
      nextUrl,
      rejectionText,
      confirmationText
    } = this.props
    const { requestResolved } = this.state

    if (requestResolved && lockedAccount) {
      const passwordUrl = {
        pathname: PASSWORD_URL,
        state: {
          dest: nextUrl
        }
      }
      return <Redirect to={passwordUrl} />
    }

    return (
      <NetworkNotification>
        <span className={styles.buttonGroup}>
          <button
            onClick={this.handleRejection}
            className={cx(styles.button, styles.reject)}
          >
            {rejectionText}
          </button>
          <button
            onClick={this.handleConfirmation}
            className={cx(styles.button, styles.confirm)}
          >
            {confirmationText}
          </button>
        </span>
      </NetworkNotification>
    )
  }
}

export default FooterButtons
