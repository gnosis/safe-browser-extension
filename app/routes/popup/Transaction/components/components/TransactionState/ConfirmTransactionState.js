import React from 'react'

import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'
import { CONFIRM_TRANSACTION_STATE } from '../../../../../../../config/messages'

const ConfirmTransactionState = () => (
  <div className={styles.transactionState}>
    <span className={styles.message}>
      <img src={mobileImage} height='55' width='30' />
      <p>{CONFIRM_TRANSACTION_STATE}</p>
    </span>
  </div>
)

export default ConfirmTransactionState
