import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Network from 'react-network'
import { Redirect } from 'react-router'
import { PASSWORD_URL } from 'routes/routes'
import Button from 'components/layout/Button'
import Paragraph from 'components/layout/Paragraph'
import {
  AWAITING_CONFIRMATIONS,
  REQUEST_CONFIRMATION,
  REQUEST_CONFIRMATION_WAIT_X_S,
  CONFIRM_WITH_MOBILE
} from '../../../../config/messages'
import mobileImage from './assets/mobile.svg'
import styles from './style.css'

const cx = classNames.bind(styles)

class SendTransactionState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      requestResolved: false
    }
  }

  handleConfirmation = () => {
    const { lockedAccount, handleConfirmation } = this.props

    if (lockedAccount) {
      this.setState({ requestResolved: true })
      return
    }
    handleConfirmation()
  }

  render() {
    const { seconds, lockedAccount, nextUrl } = this.props
    const { requestResolved } = this.state

    const time =
      seconds < 10 ? '00:0' + seconds.toString() : '00:' + seconds.toString()
    const waitingTime = REQUEST_CONFIRMATION_WAIT_X_S.toString().replace(
      '%s',
      time
    )

    if (requestResolved && lockedAccount) {
      const passwordUrl = {
        pathname: PASSWORD_URL,
        state: {
          dest: nextUrl,
          action: 'confirmed'
        }
      }
      return <Redirect to={passwordUrl} />
    }

    return (
      <div className={cx(styles.transactionState)}>
        <span className={styles.await}>
          <Paragraph>{AWAITING_CONFIRMATIONS}</Paragraph>
          <div className={styles.progress}>
            <div className={styles.indeterminate} />
          </div>
        </span>
        <span className={styles.message}>
          <div className={styles.img}>
            <img src={mobileImage} height="55" width="30" />
          </div>
          <Paragraph>{CONFIRM_WITH_MOBILE}</Paragraph>
        </span>
        <Network
          render={({ online }) =>
            online && (
              <span className={styles.resend}>
                <Paragraph>{waitingTime}</Paragraph>
                <Button
                  className={cx(styles.button, styles.white)}
                  disabled={seconds > 0}
                  onClick={this.handleConfirmation}
                  noUppercase
                >
                  {REQUEST_CONFIRMATION}
                </Button>
              </span>
            )
          }
        />
      </div>
    )
  }
}

export default SendTransactionState
