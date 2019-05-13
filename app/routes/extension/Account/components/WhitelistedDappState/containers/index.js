import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import { normalizeUrl } from 'utils/helpers'
import actions from './actions'
import Layout from '../components/Layout'

class WhitelistedDappState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showWhitelistedDappState: undefined,
      url: '',
      whitelisted: undefined
    }
  }

  componentDidMount = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url
      this.isWhitelistedDapp(url)
    })
  }

  isWhitelistedDapp = (url) => {
    const { whitelistedDapps } = this.props

    const normalizedUrl = normalizeUrl(url)
    const whitelistableDapp =
      normalizedUrl.indexOf('.') > -1 ||
      normalizedUrl.substring(0, 9) === 'localhost'
    const whitelisted = whitelistedDapps.indexOf(normalizedUrl) > -1

    this.setState({
      showWhitelistedDappState: whitelistableDapp,
      url: normalizedUrl,
      whitelisted
    })
  }

  handleWhitelistDapp = (dapp) => (e) => {
    this.setState((prevState) => {
      if (!prevState.whitelisted) {
        this.props.onAddWhitelistedDapp(dapp)
        ga([
          '_trackEvent',
          EXTENSION_SETTINGS,
          'click-add-to-whitelist-via-toggle',
          'Add to whitelist via toggle: ' + dapp
        ])
      } else {
        this.props.onDeleteWhitelistedDapp(dapp)
        ga([
          '_trackEvent',
          EXTENSION_SETTINGS,
          'click-remove-from-whitelist-via-toggle',
          'Remove from whitelist via toggle: ' + dapp
        ])
      }
      return { whitelisted: !prevState.whitelisted }
    })
    e.preventDefault()
  }

  render() {
    const { showWhitelistedDappState, url, whitelisted } = this.state

    return (
      <Layout
        showWhitelistedDappState={showWhitelistedDappState}
        url={url}
        whitelisted={whitelisted}
        handleWhitelistDapp={this.handleWhitelistDapp}
      />
    )
  }
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
