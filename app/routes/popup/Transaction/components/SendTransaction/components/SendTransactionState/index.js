import React from 'react'
import classNames from 'classnames/bind'
import Network from 'react-network'

import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const SendTransactionState = ({
  seconds,
  handleConfirmTransaction
}) => {
  const time = seconds < 10 ? '00:0' + seconds.toString() : '00:' + seconds.toString()

  return (
    <div className={cx(styles.transactionState)}>
      <span className={styles.await}>
        <p>AWAITING CONFIRMATION</p>
        <div className={styles.progress}>
          <div className={styles.indeterminate} />
        </div>
      </span>
      <span className={styles.message}>
        <img src={mobileImage} height='55' width='30' />
        <p>Confirm this transaction with the Gnosis Safe mobile app.</p>
      </span>
      <Network
        render={({ online }) =>
          online && (
            <span className={styles.resend}>
              <p>wait {time}s before re-sending request</p>
              <button
                className={cx(styles.button, styles.white)}
                disabled={seconds > 0}
                onClick={handleConfirmTransaction}
              >Re-send confirmation request</button>
            </span>
          )
        }
      />
    </div>
  )
}

export default SendTransactionState
