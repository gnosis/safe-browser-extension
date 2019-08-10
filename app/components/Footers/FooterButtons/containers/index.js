import React, { useState } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'
import Button from 'components/layout/Button'
import NetworkNotification from 'components/Notification/NetworkNotification'
import { PASSWORD_URL } from 'routes/routes'
import styles from './style.css'

const cx = classNames.bind(styles)

const FooterButtons = ({
  lockedAccount,
  nextUrl,
  rejectionText,
  confirmationText,
  handleConfirmation,
  handleRejection,
  rejectWithExtensionLockedAllowed
}) => {
  const [requestResolved, setRequestResolved] = useState(false)

  const handleRejectionButton = () => {
    if (lockedAccount && !rejectWithExtensionLockedAllowed) {
      setRequestResolved(true)
    } else {
      handleRejection()
    }
  }

  const handleConfirmationButton = () => {
    if (lockedAccount) {
      setRequestResolved(true)
    } else {
      handleConfirmation()
    }
  }

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
        <Button
          onClick={handleRejectionButton}
          className={cx(styles.button, styles.reject)}
          naked
        >
          {rejectionText}
        </Button>
        <Button
          onClick={handleConfirmationButton}
          className={styles.button}
        >
          {confirmationText}
        </Button>
      </span>
    </NetworkNotification>
  )
}

export default FooterButtons
