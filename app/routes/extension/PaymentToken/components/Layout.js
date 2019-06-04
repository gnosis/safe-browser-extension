import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import styles from 'assets/css/global.css'
import { ACCOUNT_URL } from 'routes/routes'
import { PAYMENT_TOKEN } from '../../../../../config/messages'
import EthLogo from 'assets/images/tokens/ETH.svg'

const cx = classNames.bind(styles)

class Layout extends Component {
  render() {
    const {
      location,
      tokenList,
      selectedPaymentToken,
      handlePaymentToken
    } = this.props

    return (
      <Page location={location}>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link
              to={ACCOUNT_URL}
              className={cx(styles.btnBack, styles.active)}
            />
            <h2>{PAYMENT_TOKEN}</h2>
          </span>
          <span className={styles.overlayPageContent}>
            <form className={styles.token_items}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  name="paymentToken"
                  value={'0x'}
                  checked={!selectedPaymentToken}
                  readOnly
                />
                <label onClick={handlePaymentToken(null)}>
                  <img className={styles.tokenLogo} src={EthLogo} />
                  <span>ETH (Ether)</span>
                </label>
              </div>
              {tokenList &&
                tokenList.length > 0 &&
                tokenList.map((token) => (
                  <div className={styles.radio} key={token.symbol}>
                    <input
                      type="radio"
                      name="paymentToken"
                      value={token.address}
                      checked={
                        selectedPaymentToken &&
                        token.address === selectedPaymentToken.address
                      }
                      readOnly
                    />
                    <label onClick={handlePaymentToken(token)}>
                      <img className={styles.tokenLogo} src={token.logoUri} />
                      <span>
                        {token.symbol} ({token.name})
                      </span>
                    </label>
                  </div>
                ))}
            </form>
          </span>
        </div>
      </Page>
    )
  }
}

export default Layout
