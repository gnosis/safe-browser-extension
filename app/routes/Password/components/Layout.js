import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      password,
      errorMessage,
      updatePassword,
      validatePasswords,
      properties,
    } = this.props

    if (this.props.continue) {
      return <Redirect to={{
        pathname: properties.dest,
        state: {
          ...properties,
          password,
        }
      }} />
    }

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
