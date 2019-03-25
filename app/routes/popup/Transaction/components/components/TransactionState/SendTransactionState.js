import React from 'react'
import classNames from 'classnames/bind'
import Network from 'react-network'

import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'
import {
  AWAITING_CONFIRMATIONS,
  REQUEST_CONFIRMATION,
  REQUEST_CONFIRMATION_WAIT_X_S,
  CONFIRM_WITH_MOBILE
} from '../../../../../../../config/messages'

const cx = classNames.bind(styles)

const SendTransactionState = ({ seconds, handleConfirmTransaction }) => {
  const time =
    seconds < 10 ? '00:0' + seconds.toString() : '00:' + seconds.toString()
  const waitingTime = REQUEST_CONFIRMATION_WAIT_X_S.toString().replace(
    '%s',
    time
  )

  return (
    <div className={cx(styles.transactionState)}>
      <span className={styles.await}>
        <p>{AWAITING_CONFIRMATIONS}</p>
        <div className={styles.progress}>
          <div className={styles.indeterminate} />
        </div>
      </span>
      <span className={styles.message}>
        <img src={mobileImage} height="55" width="30" />
        <p>{CONFIRM_WITH_MOBILE}</p>
      </span>
      <Network
        render={({ online }) =>
          online && (
            <span className={styles.resend}>
              <p>{waitingTime}</p>
              <button
                className={cx(styles.button, styles.white)}
                disabled={seconds > 0}
                onClick={handleConfirmTransaction}
              >
                {REQUEST_CONFIRMATION}
              </button>
            </span>
          )
        }
      />
    </div>
  )
}

export default SendTransactionState
