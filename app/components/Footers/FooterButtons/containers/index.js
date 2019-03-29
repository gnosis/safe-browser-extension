import React, { Component } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'
import { PASSWORD_URL } from 'routes/routes'
import selector from './selector'

const cx = classNames.bind(styles)

class FooterButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestResolved: false
    }
  }

  handleRejection = () => {
    const {
      handleRejection,
      account,
      rejectWithExtensionLockedAllowed
    } = this.props

    if (account.lockedState && !rejectWithExtensionLockedAllowed) {
      this.setState({ requestResolved: true })
    } else {
      handleRejection()
    }
  }

  handleConfirmation = () => {
    const {
      handleConfirmation,
      account
    } = this.props

    if (account.lockedState) {
      this.setState({ requestResolved: true })
    } else {
      handleConfirmation()
    }
  }

  render () {
    const {
      account,
      nextUrl,
      rejectionText,
      confirmationText
    } = this.props
    const { requestResolved } = this.state

    if (requestResolved && account.lockedState) {
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

export default connect(
  selector
)(FooterButtons)
