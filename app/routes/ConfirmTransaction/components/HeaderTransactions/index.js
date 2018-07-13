import React from 'react'
import classNames from 'classnames'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const HeaderTransactions = ({
  transactionsLength,
  previousTransaction,
  transactionNumber,
  nextTransaction,
}) => (
    <React.Fragment>
      <span className={styles.PageHeader}>
        <h2>Review Transaction</h2>

        {transactionsLength > 1 &&
          <span className={styles.pagination}>
            <span onClick={previousTransaction} className={cx(
              styles.btnBack,
              (transactionNumber === 0) ? styles.hide : styles.active)
            }></span>
            <p><strong>{transactionNumber + 1}</strong> of <strong>{transactionsLength}</strong></p>
            <span to='#' onClick={nextTransaction} className={cx(
              styles.btnNext,
              (transactionNumber === (transactionsLength - 1)) ? styles.hide : styles.active)
            }></span>
          </span>
        }
      </span>
    </React.Fragment>
  )

export default HeaderTransactions
