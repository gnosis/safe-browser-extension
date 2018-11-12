import React, { Component } from 'react'

import styles from 'assets/css/global.css'
import {
  NEW_PASSWORD_IDENTICAL_CHARS,
  NEW_PASSWORD_NUMBER_AND_LETTER,
  NEW_PASSWORD_MIN_CHAR
} from '../../../../../../../config/messages'

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
          {NEW_PASSWORD_IDENTICAL_CHARS}
        </p>
        <p className={newPassword && numberLetterStyle}>
          {NEW_PASSWORD_NUMBER_AND_LETTER}
        </p>
        <p className={newPassword && lengthStyle}>
          {NEW_PASSWORD_MIN_CHAR}
        </p>
      </React.Fragment>
    )
  }
}

export default Layout
