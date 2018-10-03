import React, { Component } from 'react'

import styles from 'assets/css/global.css'

class Layout extends Component {
  render () {
    const {
      newPassword,
      error,
      updateNewPassword,
      ready
    } = this.props

    const rowStyle = (error && error.row) ? styles.textGreen : styles.textRed
    const numberLetterStyle = (error && error.number && error.letter) ? styles.textGreen : styles.textRed
    const lengthStyle = (error && error.length) ? styles.textGreen : styles.textRed
    const dataValidation = !ready && newPassword !== '' ? 'ERROR' : ''

    return (
      <React.Fragment>
        <div data-validation={dataValidation}>
          <input
            type='password'
            placeholder='New password'
            value={newPassword}
            onChange={updateNewPassword}
          />
        </div>
        <p className={newPassword && rowStyle}>
          No more than 2 identical characters in a row
        </p>
        <p className={newPassword && numberLetterStyle}>
          Password with at least 1 number and 1 letter
        </p>
        <p className={newPassword && lengthStyle}>
          Use a minimum of 8 characters
        </p>
      </React.Fragment>
    )
  }
}

export default Layout
