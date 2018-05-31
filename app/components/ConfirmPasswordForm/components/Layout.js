import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      confirmPassword,
      updateConfirmPassword,
      ready,
    } = this.props

    return (
      <React.Fragment>
        <p className={styles.text}>Confirm the password</p>
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={updateConfirmPassword}
        />
        <div>
          <div className={ready ? styles.correct : styles.wrong}>
            <p>Passwords must match</p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
