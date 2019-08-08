import React from 'react'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Link from 'components/layout/Link'
import RadioInput from 'components/forms/RadioInput'
import Paragraph from 'components/layout/Paragraph'
import { ACCOUNT_URL } from 'routes/routes'
import { PAYMENT_TOKEN } from '../../../../../config/messages'
import EthLogo from 'assets/images/tokens/ETH.svg'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({
  location,
  tokenList,
  selectedPaymentToken,
  handlePaymentToken
}) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <span className={styles.contentHeader}>
        <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
        <h2>{PAYMENT_TOKEN}</h2>
      </span>
      <div className={styles.bodyContent}>
        <form className={styles.tokenItems}>
          <RadioInput
            name="paymentToken"
            value={'0x'}
            checked={!selectedPaymentToken}
          >
            <Paragraph onClick={handlePaymentToken(null)}>
              <img className={styles.tokenLogo} src={EthLogo} />
              <span>ETH (Ether)</span>
            </Paragraph>
          </RadioInput>
          {tokenList &&
            tokenList.length > 0 &&
            tokenList.map((token) => (
              <RadioInput
                key={token.symbol}
                name="paymentToken"
                value={token.address}
                checked={
                  selectedPaymentToken &&
                  token.address === selectedPaymentToken.address
                }
              >
                <Paragraph onClick={handlePaymentToken(token)}>
                  <img className={styles.tokenLogo} src={token.logoUri} />
                  <span>
                    {token.symbol} ({token.name})
                  </span>
                </Paragraph>
              </RadioInput>
            ))}
        </form>
      </div>
    </div>
  </Page>
)

export default Layout
