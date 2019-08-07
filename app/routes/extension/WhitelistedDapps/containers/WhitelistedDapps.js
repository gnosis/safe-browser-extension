import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import { normalizeUrl } from 'utils/helpers'
import Layout from '../components/Layout'
import actions from './actions'
import {
  INVALID_WEBSITE,
  WEBSITE_WHITELISTED
} from '../../../../../config/messages'

const WhitelistedDapps = ({
  whitelistedDapps,
  location,
  onAddWhitelistedDapp,
  onDeleteWhitelistedDapp,
  ondeleteAllWhitelistedDapps
}) => {
  const [newDapp, setNewDapp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const updateNewDapp = (e) => {
    setNewDapp(e.target.value)
  }

  const validateDapp = (dapp) => {
    if (!dapp) {
      setErrorMessage(INVALID_WEBSITE)
      return false
    }

    if (whitelistedDapps.indexOf(dapp) > -1) {
      setErrorMessage(WEBSITE_WHITELISTED)
      return false
    }

    setErrorMessage('')
    return true
  }

  const handleAddDapp = (dapp) => (e) => {
    const newDapp = normalizeUrl(dapp)

    if (validateDapp(newDapp)) {
      onAddWhitelistedDapp(newDapp)
      ga([
        '_trackEvent',
        EXTENSION_SETTINGS,
        'click-add-to-whitelist-via-settings',
        'Add to whitelist via settings: ' + newDapp
      ])
      setNewDapp('')
    }
  }

  const handleDeleteDapp = (dapp) => (e) => {
    onDeleteWhitelistedDapp(dapp)
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-remove-from-whitelist-via-settings',
      'Remove from whitelist via settings: ' + dapp
    ])
  }

  const handleDeleteAllDapps = () => (e) => {
    if (whitelistedDapps.length <= 0) {
      return
    }
    ondeleteAllWhitelistedDapps()
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-remove-entire-whitelist',
      'Remove entire whitelist'
    ])
  }

  return (
    <Layout
      newDapp={newDapp}
      errorMessage={errorMessage}
      whitelistedDapps={whitelistedDapps}
      updateNewDapp={updateNewDapp}
      handleAddDapp={handleAddDapp}
      handleDeleteDapp={handleDeleteDapp}
      handleDeleteAllDapps={handleDeleteAllDapps}
      location={location}
    />
  )
}

const mapStateToProps = ({ whitelistedDapps }, props) => {
  return {
    whitelistedDapps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWhitelistedDapp: (dapp) => dispatch(actions.addWhitelistedDapp(dapp)),
    onDeleteWhitelistedDapp: (dapp) =>
      dispatch(actions.deleteWhitelistedDapp(dapp)),
    ondeleteAllWhitelistedDapps: () =>
      dispatch(actions.deleteAllWhitelistedDapps())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDapps)
