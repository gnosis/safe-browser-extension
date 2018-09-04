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
        <div data-validation={dataValidation}>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={updateConfirmPassword}
          />
        </div>
        <p className={(confirmPassword !== '') ? matchStyle : null}>
          {!ready && 'Password doesn\'t match'}
        </p>
      </React.Fragment>
    )
  }
}

export default Layout
