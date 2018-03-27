import React from 'react'

import Header from 'components/Header'
import styles from './index.css'

const Page = (props) => (
  <div>
    {!props.withoutHeader &&
      <Header
        account={props.account}
        logOut={props.logOut}
        settings={props.settings}
      />
    }
    <div className={styles.container}>
      {props.children}
    </div>
  </div>
)

export default Page