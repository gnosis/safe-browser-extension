import React, { Component } from 'react'

import styles from 'assets/css/global.css'
import {
  PASSWORD_DOESNT_MATCH,
  CONFIRM_PASSWORD
} from '../../../../../../../config/messages'

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
            placeholder={CONFIRM_PASSWORD}
            value={confirmPassword}
            onChange={updateConfirmPassword}
          />
        </div>
        {!passwordsMatch &&
          <p className={filling ? styles.textRed : null}>
            {PASSWORD_DOESNT_MATCH}
          </p>
        }
      </React.Fragment>
    )
  }
}

export default Layout
