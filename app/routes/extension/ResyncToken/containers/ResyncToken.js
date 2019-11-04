import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import {
  setUpNotifications,
  authPushNotificationService
} from 'routes/extension/DownloadApps/containers/pairingNotifications'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic,
  getAllEthAccounts
} from 'routes/extension/DownloadApps/containers/pairEthAccount'
import Layout from '../components/Layout'
import selector from './selector'
import { ERROR_SYNCING, SYNCED_TOKEN } from '../../../../../config/messages'

const ResyncToken = ({
  location,
  safes,
  selectEncryptedMnemonic,
  selectUnencryptedMnemonic
}) => {
  const [message, setMessage] = useState(null)

  const validPassword = location && location.state && location.state.password
  const password = validPassword ? location.state.password : undefined

  const handleResync = () => async (e) => {
    const currentSafe = safes.safes.filter(
      (safe) => safe.address === safes.currentSafe
    )[0]

    const accounts = 
      !selectUnencryptedMnemonic && password
        ? getDecryptedAllEthAccounts(selectEncryptedMnemonic, password, safes)
        : getAllEthAccounts(selectUnencryptedMnemonic, safes)

    try {
      const token = await setUpNotifications()
      if (token === null) {
        setMessage(ERROR_SYNCING)
        return
      }
      const auth = await authPushNotificationService(token, accounts)
      setMessage(auth ? SYNCED_TOKEN : ERROR_SYNCING)
    } catch (err) {
      setMessage(ERROR_SYNCING)
      console.error(err)
    }

    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-resync-push-token',
      'Resync push token'
    ])

    setTimeout(() => {
      setMessage(null)
    }, 1000)
  }

  return (
    <Layout handleResync={handleResync} message={message} location={location} />
  )
}

export default connect(selector)(ResyncToken)
