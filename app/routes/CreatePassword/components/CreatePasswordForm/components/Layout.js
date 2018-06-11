import React, { Component } from 'react'

import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      newPassword,
      error,
      updateNewPassword,
      ready,
    } = this.props

    const rowStyle = (error && error.row) ? styles.textGreen : styles.textRed
    const numberLetterStyle = (error && error.number && error.letter) ? styles.textGreen : styles.textRed
    const lengthStyle = (error && error.length) ? styles.textGreen : styles.textRed
    const dataValidation = !ready && newPassword !== '' ? 'ERROR' : ''

    return (
      <React.Fragment>
        <h1>Secure and encrypt your browser extension with a password</h1>
        <span className={styles.warningPassword}>
          <img src={warningImage} />
          <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
        </span>
        <form onSubmit={this.prevent}>
          <span data-validation={dataValidation}>
            <input
              type='password'
              placeholder='New password'
              value={newPassword}
              onChange={updateNewPassword}
            />
          </span>
          <p className={newPassword === '' ? null : rowStyle}>
            No more than 2 identical characters in a row
          </p>
          <p className={newPassword === '' ? null : numberLetterStyle}>
            Password with at least 1 number and 1 letter
          </p>
          <p className={newPassword === '' ? null : lengthStyle}>
            Use a minimum of 8 characters
          </p>
        </form>
      </React.Fragment>
    )
  }
}

export default Layout
