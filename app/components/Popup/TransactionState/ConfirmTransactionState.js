import React from 'react'
import Paragraph from 'components/layout/Paragraph'
import { CONFIRM_TRANSACTION_STATE } from '../../../../config/messages'
import styles from './style.css'

const ConfirmTransactionState = () => (
  <div className={styles.transactionState}>
    <span className={styles.messageCentered}>
      <Paragraph>{CONFIRM_TRANSACTION_STATE}</Paragraph>
    </span>
  </div>
)

export default ConfirmTransactionState
