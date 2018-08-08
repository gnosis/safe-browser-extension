import React, { Component } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router'
import Network from 'react-network'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

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
      <Network
        render={({ online }) =>
          online
            ? (loadedData && !reviewedTx &&
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
            : <div className={styles.networkNotification}>
              <div>
                <p>Unable to connect with internet.</p>
                <p>Please check your connection!</p>
              </div>
            </div>
        }
      />
    )
  }
}

export default FooterTransactions
