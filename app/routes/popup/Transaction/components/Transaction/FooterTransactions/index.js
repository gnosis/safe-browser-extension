import React, { Component } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'

import NetworkNotification from 'components/Notification/NetworkNotification'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const FooterButtons = ({
  loadedData,
  reviewedTx,
  handleRejectTransaction,
  handleConfirmTransaction
}) => (loadedData && !reviewedTx &&
  <span className={styles.buttonGroup}>
    <button
      onClick={handleRejectTransaction}
      className={cx(styles.button, styles.reject)}
    >
      REJECT
    </button>
    <button
      onClick={handleConfirmTransaction}
      className={cx(styles.button, styles.confirm)}
    >
      CONFIRM
    </button>
  </span>)

class FooterTransactions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resolvedTransaction: false
    }
  }

  handleRejectTransaction = () => {
    const { handleRejectTransaction, lockedAccount } = this.props

    if (lockedAccount) {
      this.setState({ resolvedTransaction: true })
    } else {
      handleRejectTransaction()
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
      loadedData,
      reviewedTx,
      lockedAccount
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

    return (
      <NetworkNotification>
        <FooterButtons
          loadedData={loadedData}
          reviewedTx={reviewedTx}
          handleRejectTransaction={this.handleRejectTransaction}
          handleConfirmTransaction={this.handleConfirmTransaction}
        />
      </NetworkNotification>
    )
  }
}

export default FooterTransactions
