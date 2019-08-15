import React from 'react'
import Paragraph from 'components/layout/Paragraph'
import TextInput from 'components/forms/TextInput'
import {
  NEW_PASSWORD_IDENTICAL_CHARS,
  NEW_PASSWORD_NUMBER_AND_LETTER,
  NEW_PASSWORD_MIN_CHAR,
  NEW_PASSWORD
} from '../../../../../../../config/messages'
import styles from './style.css'

const Layout = ({
  errorLength,
  errorNumber,
  errorLetter,
  errorRow,
  newPassword,
  updateNewPassword,
  isReady
}) => {
  const rowStyle = errorRow ? 'green' : 'red'
  const numberLetterStyle = errorNumber && errorLetter ? 'green' : 'red'
  const lengthStyle = errorLength ? 'green' : 'red'
  const dataValidation = newPassword !== '' ? (!isReady ? 'ERROR' : 'OK') : ''

  return (
    <React.Fragment>
      <TextInput
        type="password"
        placeholder={NEW_PASSWORD}
        value={newPassword}
        onChange={updateNewPassword}
        dataValidation={dataValidation}
      />
      <Paragraph className={styles.requirement} color={newPassword && rowStyle}>
        {NEW_PASSWORD_IDENTICAL_CHARS}
      </Paragraph>
      <Paragraph
        className={styles.requirement}
        color={newPassword && numberLetterStyle}
      >
        {NEW_PASSWORD_NUMBER_AND_LETTER}
      </Paragraph>
      <Paragraph
        className={styles.requirement}
        color={newPassword && lengthStyle}
      >
        {NEW_PASSWORD_MIN_CHAR}
      </Paragraph>
    </React.Fragment>
  )
}

export default Layout
