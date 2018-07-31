import React, { Component } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class FooterTransactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resolvedTransaction: false,
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

  render() {
    const { lockedAccount } = this.props
    const { resolvedTransaction } = this.state

    if (resolvedTransaction && lockedAccount) {
      const passwordUrl = {
        pathname: '/password',
        state: {
          dest: '/transaction',
        }
      }
      return <Redirect to={passwordUrl} />
    }

    return (
      <span className={styles.buttonGroup}>
        <button
          onClick={this.handleRejectTransaction}
          className={cx(styles.button, styles.reject)}
        >
          REJECT
        </button>
        <button
          onClick={this.handleConfirmTransaction}
          className={cx(styles.button, styles.confirm)}
        >
          CONFIRM
        </button>
      </span>
    )
  }
}

export default FooterTransactions
