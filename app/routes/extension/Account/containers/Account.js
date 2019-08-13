import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ga } from 'utils/analytics'
import { SAFES } from 'utils/analytics/events'
import Layout from '../components/Layout'
import { PASSWORD_URL, DOWNLOAD_APPS_URL } from 'routes/routes'
import selector from './selector'
import { getNetwork } from '../../../../../config'
import { MAINNET } from '../../../../../config/names'

const Account = ({ safes, location, transactions, currentSafeAlias }) => {
  const [newSafe, setNewSafe] = useState(false)

  const handleAddNewSafe = () => {
    ga([
      '_trackEvent',
      SAFES,
      'click-connect-to-new-safe',
      'Connect to new Safe'
    ])
    setNewSafe(true)
  }

  const handleOpenEtherScan = async () => {
    await ga([
      '_trackEvent',
      SAFES,
      'click-view-safe-on-etherscan',
      'View Safe on Etherscan'
    ])

    const etherScanUrl =
      getNetwork() === MAINNET
        ? 'http://etherscan.io/address/'
        : 'http://rinkeby.etherscan.io/address/'
    window.open(etherScanUrl + safes.currentSafe)
  }

  const focusTransactionWindow = () => {
    const windowId = transactions.windowId
    if (windowId) {
      chrome.windows.update(windowId, { focused: true })
    }
  }

  setTimeout(() => focusTransactionWindow(), 100)

  if (newSafe) {
    return (
      <Redirect
        to={{
          pathname: PASSWORD_URL,
          state: {
            dest: DOWNLOAD_APPS_URL,
            contentHeader: true
          }
        }}
      />
    )
  }
  if (safes.currentSafe === undefined) {
    return (
      <Redirect
        to={{
          pathname: PASSWORD_URL,
          state: {
            dest: DOWNLOAD_APPS_URL
          }
        }}
      />
    )
  }
  return (
    <Layout
      currentSafe={safes.currentSafe}
      currentSafeAlias={currentSafeAlias}
      location={location}
      handleOpenEtherScan={handleOpenEtherScan}
      handleAddNewSafe={handleAddNewSafe}
    />
  )
}

export default connect(selector)(Account)
