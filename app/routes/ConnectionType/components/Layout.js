import React, { Component } from 'react'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const { handleConnect2FA, handleConnectRelayer } = this.props

    return (
      <Page>
        <p className={styles.text}>Select connection type</p>
        <button onClick={handleConnect2FA}>CONNECT FOR 2FA</button>
        <p className={styles.text}>or</p>
        <button onClick={handleConnectRelayer}>CONNECT AS RELAYER</button>
      </Page>
    )
  }
}

export default Layout
