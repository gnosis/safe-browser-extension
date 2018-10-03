import React, { Component } from 'react'

import styles from 'assets/css/global.css'

class Layout extends Component {
  render () {
    const {
      confirmPassword,
      updateConfirmPassword,
      passwordsMatch
    } = this.props

    const filling = (confirmPassword !== '')
    const dataValidation = !passwordsMatch && filling ? 'ERROR' : ''

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
        {!passwordsMatch &&
          <p className={filling ? styles.textRed : null}>
            Password does not match
          </p>
        }
      </React.Fragment>
    )
  }
}

export default Layout
