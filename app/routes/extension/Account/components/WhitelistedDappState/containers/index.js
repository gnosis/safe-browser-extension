import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import { normalizeUrl } from 'utils/helpers'
import actions from './actions'
import Layout from '../components/Layout'

const WhitelistedDappState = ({
  whitelistedDapps,
  onAddWhitelistedDapp,
  onDeleteWhitelistedDapp
}) => {
  const [showWhitelistedDappState, setShowWhitelistedDappState] = useState(null)
  const [url, setUrl] = useState('')
  const [whitelisted, setWhitelisted] = useState(null)

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url
      isWhitelistedDapp(url)
    })
  })

  const isWhitelistedDapp = (url) => {
    const normalizedUrl = normalizeUrl(url)
    const whitelistableDapp =
      normalizedUrl.indexOf('.') > -1 ||
      normalizedUrl.substring(0, 9) === 'localhost'
    const whitelisted = whitelistedDapps.indexOf(normalizedUrl) > -1

    setShowWhitelistedDappState(whitelistableDapp)
    setUrl(normalizedUrl)
    setWhitelisted(whitelisted)
  }

  const handleWhitelistDapp = (dapp) => (e) => {
    setWhitelisted((prevWhitelisted) => {
      if (!prevWhitelisted) {
        onAddWhitelistedDapp(dapp)
        ga([
          '_trackEvent',
          EXTENSION_SETTINGS,
          'click-add-to-whitelist-via-toggle',
          'Add to whitelist via toggle: ' + dapp
        ])
      } else {
        onDeleteWhitelistedDapp(dapp)
        ga([
          '_trackEvent',
          EXTENSION_SETTINGS,
          'click-remove-from-whitelist-via-toggle',
          'Remove from whitelist via toggle: ' + dapp
        ])
      }
      return !prevWhitelisted
    })
    e.preventDefault()
  }

  return (
    <Layout
      showWhitelistedDappState={showWhitelistedDappState}
      url={url}
      whitelisted={whitelisted}
      handleWhitelistDapp={handleWhitelistDapp}
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
      dispatch(actions.deleteWhitelistedDapp(dapp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDappState)
