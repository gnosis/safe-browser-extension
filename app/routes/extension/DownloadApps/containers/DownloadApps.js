import React, { useState, useEffect } from 'react'
import Bip39 from 'bip39'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ga } from 'utils/analytics'
import { ONBOARDING } from 'utils/analytics/events'
import {
  createEthAccount,
  createAccountFromMnemonic,
  decryptMnemonic,
  getDecryptedEthAccount,
  getDecryptedAllEthAccounts,
  generatePairingCodeContent
} from './pairEthAccount'
import {
  setUpNotifications,
  authPushNotificationService
} from './pairingNotifications'
import { createQrImage } from 'utils/qrdisplay'
import Layout from '../components/Layout'
import { ACCOUNT_URL } from 'routes/routes'
import actions from './actions'
import selector from './selector'
import { getAndroidAppUrl, getIosAppUrl } from '../../../../../config'
import { NOTIFICATIONS_PERMISSION_REQUIRED } from '../../../../../config/messages'
import messages from '../../../../../extension/utils/messages'

const DownloadApps = ({
  location,
  safes,
  account,
  onCreateAccount,
  selectEncryptedMnemonic
}) => {
  const iosAppUrl = getIosAppUrl()
  const androidAppUrl = getAndroidAppUrl()
  const qrPairingRef = React.createRef()

  const validPassword = location && location.state && location.state.password
  const password = validPassword ? location.state.password : undefined

  const [message, setMessage] = useState('')
  const [currentSafe, setCurrentSafe] = useState(null)
  const [pairedSafes, setPairedSafes] = useState(safes.safes.length)

  useEffect(() => {
    createUniqueAccount()
  }, [])

  useEffect(() => {
    if (selectEncryptedMnemonic) {
      registerToken()
    }
  }, [selectEncryptedMnemonic])

  useEffect(() => {
    if (safes !== null && safes.safes.length > pairedSafes) {
      setPairedSafes(safes.safes.length)
      setCurrentSafe(safes.currentSafe)
    }
  }, [safes])

  const createUniqueAccount = async () => {
    const hasAccount = account.secondFA && account.secondFA.seed

    if (!password || hasAccount) {
      return
    }
    if (!hasAccount) {
      const mnemonic = Bip39.generateMnemonic()
      const currentAccount = createAccountFromMnemonic(mnemonic, 0)
      const { encryptedMnemonic, hmac } = createEthAccount(mnemonic, password)

      onCreateAccount(
        currentAccount.getChecksumAddressString(),
        encryptedMnemonic,
        hmac
      )
    }
  }

  const registerToken = async () => {
    const nextOwnerAccountIndex = account.secondFA.currentAccountIndex
      ? account.secondFA.currentAccountIndex + 1
      : 1

    const nextOwnerAccount =
      password &&
      getDecryptedEthAccount(
        selectEncryptedMnemonic,
        password,
        nextOwnerAccountIndex
      )

    const accounts = password && getDecryptedAllEthAccounts(selectEncryptedMnemonic, password, safes)

    try {
      const token = await setUpNotifications()
      if (token === null) {
        setMessage(NOTIFICATIONS_PERMISSION_REQUIRED)
        return
      }
      const auth = await authPushNotificationService(token, accounts.concat(nextOwnerAccount))
      if (auth) {
        renderQrImageFrom(nextOwnerAccount.getPrivateKey())

        const mnemonic = decryptMnemonic(selectEncryptedMnemonic, password)
        chrome.runtime.sendMessage({
          msg: messages.MSG_TEMPORARY_UNLOCK,
          message: mnemonic
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const openGooglePlay = (e) => {
    chrome.tabs.create({ url: androidAppUrl })
    ga([
      '_trackEvent',
      ONBOARDING,
      'click-download-android-app',
      'Download Android app'
    ])
  }

  const openAppStore = (e) => {
    chrome.tabs.create({ url: iosAppUrl })
    ga([
      '_trackEvent',
      ONBOARDING,
      'click-download-iphone-app',
      'Download iPhone app'
    ])
  }

  const renderQrImageFrom = (privateKey) => {
    createQrImage(
      qrPairingRef.current,
      generatePairingCodeContent(privateKey),
      3
    )
  }

  if (currentSafe) {
    return <Redirect to={ACCOUNT_URL} />
  }
  return (
    <Layout
      password={password}
      location={location}
      openGooglePlay={openGooglePlay}
      openAppStore={openAppStore}
      iosAppUrl={iosAppUrl}
      qrPairingRef={qrPairingRef}
      message={message}
    />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, seed, hmac) =>
      dispatch(actions.createAccount(address, seed, hmac))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(DownloadApps)
