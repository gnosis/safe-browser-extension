import React from 'react'
import Blockie from 'components/Blockie'

import { shortenAddress } from 'utils/helpers'
import styles from 'assets/css/global.css'

const TransactionAddressData = ({
  style,
  address,
  alias,
  balance,
  noBalance
}) => (
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
      <strong>{balance ? balance.round(5).toString(10) : '-'} <small>ETH</small></strong>
    </span>
    }
  </div>
)

export default TransactionAddressData
