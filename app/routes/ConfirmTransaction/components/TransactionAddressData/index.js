import React from 'react'
import Blockies from 'react-blockies'
import EthUtil from 'ethereumjs-util'

import styles from 'assets/css/global.css'

const shortenAddress = (address) => {
  const checksumedAddress = address && EthUtil.toChecksumAddress(address)
  return checksumedAddress &&
    checksumedAddress.substring(0, 8) +
    '...' +
    checksumedAddress.substring(checksumedAddress.length - 6, checksumedAddress.length)
}

const TransactionAddressData = ({
  style,
  address,
  alias,
  balance,
  noBalance,
}) => (
    <div className={style}>
      <span>
        <div className={styles.identicon}>
          <Blockies
            seed={address}
            size={8}
            scale={3}
          />
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
