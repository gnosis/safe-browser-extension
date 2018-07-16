import React, { Component } from 'react'
import { connect } from 'react-redux'

import { normalizeUrl } from 'utils/helpers'

import actions from './actions'
import Layout from '../components/Layout'

class WhitelistedDappState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      whitelisted: undefined,
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
    const { whitelisted } = this.state

    whitelisted
      ? this.props.onDeleteWhitelistedDapp(dapp)
      : this.props.onAddWhitelistedDapp(dapp)

    this.setState((prevState) => ({
      whitelisted: !prevState.whitelisted
    }))
    e.preventDefault()
  }

  render() {
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
