import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'
import { PASSWORD_URL, REPLACE_RECOVERY_PHRASE_URL } from 'routes/routes'
import { createQrImage } from 'utils/qrdisplay'
import {
  getDecryptedEthAccount,
  createAccountFromMnemonic
} from 'routes/extension/DownloadApps/containers/pairEthAccount'
import Layout from '../components/Layout'
import selector from './selector'

const ReplaceRecoveryPhrase = ({
  selectEncryptedMnemonic,
  selectUnencryptedMnemonic,
  safes,
  location
}) => {
  const validPassword = location && location.state && location.state.password
  const password = validPassword ? location.state.password : undefined
  const qrReplaceRecoveryPhraseRef = React.createRef()

  useEffect(() => {
    createQrImage(
      document.getElementById('qr-replace-recovery-phrase'),
      generateQrCodeContent(),
      3
    )
  })

  const generateQrCodeContent = () => {
    const safe = safes.safes.filter(
      (safe) => safe.address === safes.currentSafe
    )[0]

    const account =
      !selectUnencryptedMnemonic && password
        ? getDecryptedEthAccount(
            selectEncryptedMnemonic,
            password,
            safe.accountIndex || 0
          )
        : createAccountFromMnemonic(
            selectUnencryptedMnemonic,
            safe.accountIndex || 0
          )

    const data = EthUtil.sha3('GNO' + safe.address)
    const vrs = EthUtil.ecsign(data, account.getPrivateKey())
    const r = new BigNumber(EthUtil.bufferToHex(vrs.r))
    const s = new BigNumber(EthUtil.bufferToHex(vrs.s))

    const qrCodeContent = JSON.stringify({
      address: safe.address,
      signature: {
        r: r.toString(10),
        s: s.toString(10),
        v: vrs.v
      }
    })
    return qrCodeContent
  }

  const url = {
    pathname: PASSWORD_URL,
    state: {
      dest: REPLACE_RECOVERY_PHRASE_URL
    }
  }

  if (safes.currentSafe === undefined) {
    return <Redirect to={url} />
  }
  return (
    <Layout
      currentSafe={safes.currentSafe}
      qrReplaceRecoveryPhraseRef={qrReplaceRecoveryPhraseRef}
      location={location}
    />
  )
}

export default connect(selector)(ReplaceRecoveryPhrase)
