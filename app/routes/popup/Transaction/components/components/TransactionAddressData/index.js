import React from 'react'
import Blockie from 'components/Blockie'

import { shortenAddress } from 'utils/helpers'
import styles from 'assets/css/global.css'

const TransactionAddressData = ({
  style,
  address,
  alias,
  balance,
  noBalance,
  symbol
}) => {
  const addressBalance = balance ? balance.toString(10) : '-'

  return (
    <div className={style}>
      <span>
        <div className={styles.identicon}>
          <Blockie address={address} diameter={32} />
        </div>
        <p>
          <i>{alias}</i>
          <small>{shortenAddress(address)}</small>
        </p>
      </span>
      {!noBalance &&
      <span>
        <strong>{addressBalance} <small>{symbol}</small></strong>
      </span>
      }
    </div>
  )
}

export default TransactionAddressData
