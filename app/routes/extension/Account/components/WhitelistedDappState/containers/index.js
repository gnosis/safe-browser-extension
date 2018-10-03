import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ga } from 'utils/analytics'
import { EXTENSION_SETTINGS } from 'utils/analytics/events'
import { normalizeUrl } from 'utils/helpers'
import actions from './actions'
import Layout from '../components/Layout'

class WhitelistedDappState extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

    this.setState({
      url: normalizedUrl,
      whitelisted: (whitelistedDapps.indexOf(normalizedUrl) > -1)
    })
  }

  handleWhitelistDapp = (dapp) => (e) => {
    this.setState(prevState => {
      if (!prevState.whitelisted) {
        this.props.onAddWhitelistedDapp(dapp)
        ga(['_trackEvent', EXTENSION_SETTINGS, 'click-add-to-whitelist-via-toggle', 'Add to whitelist via toggle: ' + dapp])
      } else {
        this.props.onDeleteWhitelistedDapp(dapp)
        ga(['_trackEvent', EXTENSION_SETTINGS, 'click-remove-from-whitelist-via-toggle', 'Remove from whitelist via toggle: ' + dapp])
      }
      return { whitelisted: !prevState.whitelisted }
    })
    e.preventDefault()
  }

  render () {
    const { url, whitelisted } = this.state
    const { whitelistedDapps } = this.props

    return (
      <Layout
        url={url}
        whitelisted={whitelisted}
        whitelistedDapps={whitelistedDapps}
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
    onDeleteWhitelistedDapp: (dapp) => dispatch(actions.deleteWhitelistedDapp(dapp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDappState)
