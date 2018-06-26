import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import Header from 'components/Header'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      transaction,
      unlockRequest,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction,
      properties,
    } = this.props

    return (
      <div className={styles.extensionTx} data-demo='1'>
        <div className={styles.extensionInner}>

          <Header noBorder txReview properties={properties} />

          <div className={styles.Page}>
            <span className={styles.PageHeader}>
              <h2>Review Transaction</h2>

              {/*<!-- // Only output 'pagination' if >1 transactions -->*/}
              <span className={styles.pagination}>
                <Link to='#' className={cx(styles.btnBack, styles.hide)}></Link>
                <p><strong>1</strong> of <strong>2</strong></p>
                <Link to='#' className={cx(styles.btnNext, styles.active)}></Link>
              </span>
              {/*<!-- END -->*/}
            </span>

            <form onSubmit={this.prevent} className={styles.PageContent}>
              <div className={styles.transactionFrom}>
                <span>
                  <img src='/assets/images/identicon.png' height='32' width='32' alt='Tobias Funds - 0xf151...aE3910' />
                  <p>
                    <i>Tobias Funds</i>
                    <small>0xf151...aE3910</small>
                  </p>
                </span>
                <span>
                  <strong>94.34934 <small>ETH</small></strong>
                </span>
              </div>
              <div className={styles.transactionValue}>
                <strong>-3.49358 <small>ETH</small></strong>
                <small>≈ 1,345.34 USD</small>
              </div>
              <div className={styles.transactionRecipient}>
                <span>
                  <img src='/assets/images/identicon.png' height='32' width='32' alt='Tobias Funds - 0xf151...aE3910' />
                  <p>
                    <i>Unkown smart contract</i>
                    <small>0xcd2a...8dd826</small>
                  </p>
                </span>
              </div>
              <div className={styles.transactionSummary}>

                {/*<!-- ONLY DISPLAY SAFE BALANCE HERE, IF THE TRANSACTION IS SENDING ERC20 tokens (not ETH transfer) -->*/}
                <span>
                  <p>Safe balance</p>
                  <strong>94.34934 <small>ETH</small></strong>
                </span>
                {/*<!-- END ONLY DISPLAY SAFE BALANCE HERE, IF THE TRANSACTION IS SENDING NON-ETH tokens -->*/}

                <span>
                  <p>Max. transaction fee</p>
                  <span>
                    <strong className={styles.textRed}>-0.00001 <small>ETH</small></strong>
                    <small>≈ 0.22 USD</small>
                  </span>
                </span>

                {/*<!-- 'Max total' only shown for ETH transfers. For ERC20 transfers we don't display this. -->*/}
                <span className={styles.subtotal}>
                  <p>Max. total</p>
                  <span>
                    <strong className={styles.textRed}>-3.49359 <small>ETH</small></strong>
                    <small>≈ 1,345.56 USD</small>
                  </span>
                </span>
                {/*<!-- END max total -->*/}

              </div>

              {unlockRequest &&
                <div className={cx(styles.transactionState)}>
                  <span className={styles.message}>
                    <p>Unlock the extension to review the transaction</p>
                  </span>
                </div>
              }
              {reviewedTx &&
                <div className={cx(styles.transactionState)}>
                  <span className={styles.await}>
                    <p>AWAITING CONFIRMATION</p>
                    <div className={styles.progress}>
                      <div className={styles.indeterminate}></div>
                    </div>
                  </span>
                  <span className={styles.message}>
                    <img src='/assets/images/mobile.svg' height='55' width='30' />
                    <p>Confirm this transaction with the Gnosis Safe mobile app.</p>
                  </span>
                  <span className={styles.resend}>
                    <p>wait 0:30s before re-sending request</p>
                    <button className={cx(styles.button, styles.white)} disabled>Re-send confirmation request</button>
                  </span>
                </div>
              }
              {!reviewedTx &&
                <span className={styles.buttonGroup}>
                  <button onClick={handleRejectTransaction}
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
                </span>
              }
            </form>
          </div>

        </div>
      </div>
    )
  }
}

export default Layout
