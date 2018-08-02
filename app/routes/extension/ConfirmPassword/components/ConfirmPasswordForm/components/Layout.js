import React, { Component } from 'react'

import styles from 'assets/css/global.css'

class Layout extends Component {
  render () {
    const {
      confirmPassword,
      updateConfirmPassword,
      ready
    } = this.props

    const matchStyle = ready ? styles.textGreen : styles.textRed
    const dataValidation = !ready && confirmPassword !== '' ? 'ERROR' : ''

    return (
      <React.Fragment>
        <span data-validation={dataValidation}>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={updateConfirmPassword}
          />
        </span>
        <p className={confirmPassword === '' ? null : matchStyle}>
          Password doesn't match
        </p>
      </React.Fragment>
    )
  }
}

export default Layout
