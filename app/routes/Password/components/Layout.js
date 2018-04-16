import React, { Component } from 'react'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      password,
      errorMessage,
      updatePassword,
      validatePasswords,
    } = this.props

    return (
      <Page>
        <p className={styles.text}>Confirm the master password</p>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button onClick={validatePasswords}>CONTINUE</button>
      </Page>
    )
  }
}

export default Layout
