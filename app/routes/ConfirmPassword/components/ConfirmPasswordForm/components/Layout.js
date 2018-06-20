import React, { Component } from 'react'

import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      confirmPassword,
      updateConfirmPassword,
      ready,
    } = this.props

    const matchStyle = ready ? styles.textGreen : styles.textRed
    const dataValidation = !ready && confirmPassword !== '' ? 'ERROR' : ''

    return (
      <React.Fragment>
        <h1>Almost done!<br />Confirm your password.</h1>
        <span className={styles.warningPassword}>
          <img src={warningImage} />
          <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
        </span>
        <form onSubmit={this.prevent}>
          <span data-validation={dataValidation}>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={updateConfirmPassword}
            />
          </span>
          <p className={confirmPassword === '' ? null : matchStyle}>
            Password doesn't match
          </p>
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
