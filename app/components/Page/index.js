import React from 'react'

import Header from 'components/Header'
import styles from './index.css'

const Page = (props) => (
  <div>
    <Header
      account={props.account}
      logOut={props.logOut}
      whitelist={props.whitelist}
    />

    <div className={styles.container}>
      {props.children}
    </div>
  </div>
)

export default Page