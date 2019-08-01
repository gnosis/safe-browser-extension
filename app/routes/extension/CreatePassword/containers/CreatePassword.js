import React, { useState } from 'react'
import Layout from '../components/Layout'

const CreatePassword = ({ ...props }) => {
  const [newPassword, setNewPassword] = useState('')
  const [isReady, setIsReady] = useState(false)

  const manageCreatePassword = (newPassword, isReady) => {
    setNewPassword(newPassword)
    setIsReady(isReady)
  }

  return (
    <Layout
      newPassword={newPassword}
      manageCreatePassword={manageCreatePassword}
      isReady={isReady}
      location={props.location}
    />
  )
}

export default CreatePassword
