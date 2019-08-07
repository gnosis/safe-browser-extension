import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'
import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import { createEthAccount } from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import Layout from '../components/Layout'
import actions from './actions'
import selector from './selector'
import messages from '../../../../../extension/utils/messages'
import { ACCOUNT_URL } from 'routes/routes'

const ChangePassword = ({
  selectUnencryptedMnemonic,
  selectEncryptedMnemonic,
  onUpdateMasterPassword,
  location
}) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [createPasswordReady, setCreatePasswordReady] = useState(false)
  const [confirmPasswordReady, setConfirmPasswordReady] = useState(false)
  const [redirectToAccount, setRedirectToAccount] = useState(false)

  const validPassword = location && location.state && location.state.password
  const oldPassword = validPassword ? location.state.password : undefined

  const manageCreatePassword = (newPassword, createPasswordReady) => {
    setNewPassword(newPassword)
    setCreatePasswordReady(createPasswordReady)
    setConfirmPasswordReady(newPassword !== '' && newPassword === confirmPassword)
  }

  const manageConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword)
    setConfirmPasswordReady(newPassword !== '' && newPassword === confirmPassword)
  }

  const updateMasterPassword = () => {
    if (!createPasswordReady || !confirmPasswordReady) {
      return
    }

    let mnemonic
    if (oldPassword && selectEncryptedMnemonic) {
      mnemonic = CryptoJs.AES.decrypt(
        selectEncryptedMnemonic,
        oldPassword
      ).toString(CryptoJs.enc.Utf8)
    } else if (selectUnencryptedMnemonic) {
      mnemonic = selectUnencryptedMnemonic
    } else return

    const { encryptedMnemonic, hmac } = createEthAccount(mnemonic, newPassword)

    chrome.runtime.sendMessage({
      msg: messages.MSG_LOCK_ACCOUNT
    })

    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-change-password',
      'Change password'
    ])

    onUpdateMasterPassword(encryptedMnemonic, hmac)
    setRedirectToAccount(true)
  }

  if (redirectToAccount) {
    return <Redirect to={ACCOUNT_URL} />
  }
  return (
    <Layout
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      manageCreatePassword={manageCreatePassword}
      manageConfirmPassword={manageConfirmPassword}
      updateMasterPassword={updateMasterPassword}
      confirmPasswordReady={confirmPasswordReady}
      createPasswordReady={createPasswordReady}
      location={location}
    />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMasterPassword: (encryptedMnemonic, hmac) =>
      dispatch(actions.updateMasterPassword(encryptedMnemonic, hmac))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(ChangePassword)
