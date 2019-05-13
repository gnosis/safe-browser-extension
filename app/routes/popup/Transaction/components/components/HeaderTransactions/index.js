import React from 'react'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'
import { REVIEW_TRANSACTION } from '../../../../../../../config/messages'

const cx = classNames.bind(styles)

const HeaderTransactions = ({
  reviewedTx,
  transactionsLength,
  previousTransaction,
  transactionNumber,
  nextTransaction
}) => (
  <React.Fragment>
    <span className={styles.PageHeader}>
      <h2>{REVIEW_TRANSACTION}</h2>

      {transactionsLength > 1 && (
        <span className={styles.pagination}>
          <span
            onClick={previousTransaction}
            className={cx(
              styles.btnBack,
              reviewedTx || transactionNumber === 0
                ? styles.hide
                : styles.active
            )}
          />
          <p>
            <strong>{transactionNumber + 1}</strong> of{' '}
            <strong>{transactionsLength}</strong>
          </p>
          <span
            to="#"
            onClick={nextTransaction}
            className={cx(
              styles.btnNext,
              reviewedTx || transactionNumber === transactionsLength - 1
                ? styles.hide
                : styles.active
            )}
          />
        </span>
      )}
    </span>
  </React.Fragment>
)

export default HeaderTransactions
