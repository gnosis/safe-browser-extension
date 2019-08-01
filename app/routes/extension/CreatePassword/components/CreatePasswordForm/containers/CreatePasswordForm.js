import React, { useState } from 'react'
import Layout from '../components/Layout'

const CreatePasswordForm = ({ newPassword, manageCreatePassword, isReady }) => {
  const [errorLength, setErrorLength] = useState(false)
  const [errorNumber, setErrorNumber] = useState(false)
  const [errorLetter, setErrorLetter] = useState(false)
  const [errorRow, setErrorRow] = useState(false)

  const validateLength = (password) => {
    const validLength = password !== '' && password.length >= 8
    setErrorLength(validLength)
    return validLength
  }

  const validateNumber = (password) => {
    const expression = /.*\d+.*/
    const validExpression = password !== '' && expression.test(password)
    setErrorNumber(validExpression)
    return validExpression
  }

  const validateLetter = (password) => {
    const expression = /.*[a-zA-Z]+.*/
    const validExpression = password !== '' && expression.test(password)
    setErrorLetter(validExpression)
    return validExpression
  }

  const validateRow = (password) => {
    const expression = /.*(.)\1{2}.*/
    const validExpression = password !== '' && !expression.test(password)
    setErrorRow(validExpression)
    return validExpression
  }

  const updateNewPassword = (e) => {
    const password = e.target.value

    const hasErrorLength = validateLength(password)
    const hasErrorNumber = validateLetter(password)
    const hasErrorLetter = validateNumber(password)
    const hasErrorRow = validateRow(password)

    const isReady =
      hasErrorLength && hasErrorNumber && hasErrorLetter && hasErrorRow
    manageCreatePassword(password, isReady)
  }

  return (
    <Layout
      errorLength={errorLength}
      errorNumber={errorNumber}
      errorLetter={errorLetter}
      errorRow={errorRow}
      newPassword={newPassword}
      updateNewPassword={updateNewPassword}
      isReady={isReady}
    />
  )
}

export default CreatePasswordForm
