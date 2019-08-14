import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ga } from 'utils/analytics'
import { SAFES } from 'utils/analytics/events'
import selector from './selector'
import actions from './actions'
import messages from '../../../../../../extension/utils/messages'
import Layout from '../components/Layout'
import { PASSWORD_URL, DOWNLOAD_APPS_URL } from 'routes/routes'

const SafesMenu = ({
  toggleSafes,
  showSafes,
  isPopup,
  safes,
  extensionTitle,
  popupTitle,
  onSelectSafe,
  onRemoveSafe
}) => {
  const handleSelectSafe = (safeAddress) => (e) => {
    onSelectSafe(safeAddress)
    toggleSafes()
    ga(['_trackEvent', SAFES, 'click-switch-safe', 'Switch Safe'])
  }

  const handleRemoveSafe = (safeAddress) => (e) => {
    e.stopPropagation()
    const safeList = safes.safes

    let newCurrentSafe
    if (safeList.length > 1) {
      const deletedIndex = safeList
        .map((safe) => safe.address)
        .indexOf(safeAddress)

      newCurrentSafe =
        safes.currentSafe === safeAddress
          ? deletedIndex === 0
            ? safeList[1].address
            : safeList[deletedIndex - 1].address
          : safes.currentSafe
    }
    onRemoveSafe(safeAddress, newCurrentSafe)

    if (safeList.length === 1) {
      chrome.runtime.sendMessage({
        msg: messages.MSG_LOCK_ACCOUNT
      })
    }
    ga(['_trackEvent', SAFES, 'click-remove-safe', 'Remove Safe'])
  }

  if (safes.safes.length === 0) {
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
      safes={safes}
      safeAlias={isPopup ? popupTitle : extensionTitle}
      showSafes={showSafes}
      toggleSafes={toggleSafes}
      handleSelectSafe={handleSelectSafe}
      handleRemoveSafe={handleRemoveSafe}
      isPopup={isPopup}
    />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSafe: (address) => dispatch(actions.selectSafe(address)),
    onRemoveSafe: (address, currentSafe) =>
      dispatch(actions.removeSafe(address, currentSafe))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(SafesMenu)
