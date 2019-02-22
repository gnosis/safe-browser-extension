import React, { Component } from 'react'

import { REVIEW_SIGN_MESSAGE } from '../../../../../config/messages'
import HeaderTransactions from 'components/Popup/HeaderTransactions'
import TransactionAddressData from 'components/Popup/TransactionAddressData'
import styles from 'assets/css/global.css'

class Layout extends Component {
  render () {
    const {
      signMessages,
      address,
      alias,
      balance
    } = this.props

    return (
      <React.Fragment>
        <HeaderTransactions
          title={REVIEW_SIGN_MESSAGE}
          numElements={1}
          elementNumber={0}
        />
        <form onSubmit={this.prevent} className={styles.PageContent}>
          <TransactionAddressData
            address={address}
            alias={alias}
            balance={balance}
            symbol={'ETH'}
          />
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
