import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router'
import Network from 'react-network'

import FooterTransactions from 'routes/popup/Transaction/components/Transaction/FooterTransactions'
import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resolvedTransaction: false
    }
  }

  handleConfirmTransaction = () => {
    const { handleConfirmTransaction, lockedAccount } = this.props

    if (lockedAccount) {
      this.setState({ resolvedTransaction: true })
    } else {
      handleConfirmTransaction()
    }
  }

  render () {
    const {
      lockedAccount,
      loadedData,
      reviewedTx,
      seconds,
      handleConfirmTransaction,
      handleRejectTransaction
    } = this.props
    const { resolvedTransaction } = this.state

    if (resolvedTransaction && lockedAccount) {
      const passwordUrl = {
        pathname: '/password',
        state: {
          dest: '/transaction'
        }
      }
      return <Redirect to={passwordUrl} />
    }

    const time = seconds < 10 ? '00:0' + seconds.toString() : '00:' + seconds.toString()
    return (
      <React.Fragment>
        {reviewedTx &&
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
                      onClick={this.handleConfirmTransaction}
                    >Re-send confirmation request</button>
                  </span>
                )
              }
            />
          </div>
        }
        <FooterTransactions
          loadedData={loadedData}
          reviewedTx={reviewedTx}
          lockedAccount={lockedAccount}
          handleRejectTransaction={handleRejectTransaction}
          handleConfirmTransaction={handleConfirmTransaction}
        />
      </React.Fragment>
    )
  }
}

export default Layout
