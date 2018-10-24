import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import { toGWei } from 'utils/helpers'
import { isTokenTransfer } from '../../../containers/tokens'
import { getEthBalance } from '../../../containers/transactions'
import styles from 'assets/css/global.css'

class TransactionSummary extends Component {
  constructor (props) {
    super(props)
    const { transaction } = this.props

    this.state = {
      ethBalance: undefined
    }
    this.isTokenTransfer = isTokenTransfer(transaction.data)
  }

  componentDidMount = async () => {
    const { transaction } = this.props

    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_UP })
    const ethBalance = await getEthBalance(transaction.from)
    this.setState({ ethBalance })
  }

  render () {
    const {
      estimations,
      displayedValue
    } = this.props
    const { ethBalance } = this.state

    const totalGas = estimations && new BigNumber(estimations.dataGas).plus(new BigNumber(estimations.safeTxGas))
    const transactionFee = totalGas && toGWei(totalGas.times(new BigNumber(estimations.gasPrice)))
    const totalCost = (displayedValue && transactionFee) ? displayedValue.plus(transactionFee) : null

    const txFeeString = transactionFee ? -transactionFee.toString(10) : '-'
    const txCostString = totalCost ? -totalCost.toString(10) : '-'
    const ethBalanceString = ethBalance ? ethBalance.toString(10) : '-'

    return (
      <div className={styles.transactionSummary} >
        <span>
          <p>Safe balance</p>
          <span>
            <strong>{ethBalanceString} <small>ETH</small></strong>
          </span>
        </span>
        <span>
          <p>Estimated transaction fee</p>
          <span>
            <strong className={styles.textRed}>{txFeeString} <small>ETH</small></strong>
          </span>
        </span>
        {!this.isTokenTransfer &&
          <span className={styles.subtotal}>
            <p>Max. total</p>
            <span>
              <strong className={styles.textRed}>{txCostString} <small>ETH</small></strong>
              <small />
            </span>
          </span>
        }
      </div>
    )
  }
}

export default TransactionSummary
