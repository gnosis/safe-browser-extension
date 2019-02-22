import React, { Component } from 'react'

import { REVIEW_SIGN_MESSAGE } from '../../../../../config/messages'
import HeaderPopup from 'components/Popup/HeaderPopup'
import AccountData from 'components/Popup/AccountData'
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
        <HeaderPopup
          title={REVIEW_SIGN_MESSAGE}
          numElements={1}
          elementNumber={0}
        />
        <form onSubmit={this.prevent} className={styles.PageContent}>
          <AccountData
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
