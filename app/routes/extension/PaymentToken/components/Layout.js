import React from 'react'
import Page from 'components/layout/Page'
import ContentHeader from 'components/headers/ContentHeader'
import RadioInput from 'components/forms/RadioInput'
import Paragraph from 'components/layout/Paragraph'
import { ACCOUNT_URL } from 'routes/routes'
import { PAYMENT_TOKEN_TITLE } from '../../../../../config/messages'
import EthLogo from 'assets/images/tokens/ETH.svg'
import styles from './style.css'

const Layout = ({
  location,
  tokenList,
  selectedPaymentToken,
  handlePaymentToken
}) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <ContentHeader backLink={ACCOUNT_URL} message={PAYMENT_TOKEN_TITLE} />
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
