import React, { Component } from 'react'
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

class WhitelistedDapps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newDapp: '',
      errorMessage: ''
    }
  }

  updateNewDapp = (e) => {
    this.setState({ newDapp: e.target.value })
  }

  validateDapp = (dapp) => {
    if (!dapp) {
      this.setState({ errorMessage: INVALID_WEBSITE })
      return false
    }

    const { whitelistedDapps } = this.props

    if (whitelistedDapps.indexOf(dapp) > -1) {
      this.setState({ errorMessage: WEBSITE_WHITELISTED })
      return false
    }

    this.setState({ errorMessage: '' })
    return true
  }

  handleAddDapp = (dapp) => (e) => {
    const newDapp = normalizeUrl(dapp)

    if (this.validateDapp(newDapp)) {
      this.props.onAddWhitelistedDapp(newDapp)
      ga([
        '_trackEvent',
        EXTENSION_SETTINGS,
        'click-add-to-whitelist-via-settings',
        'Add to whitelist via settings: ' + newDapp
      ])
      this.setState({ newDapp: '' })
    }
  }

  handleDeleteDapp = (dapp) => (e) => {
    this.props.onDeleteWhitelistedDapp(dapp)
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-remove-from-whitelist-via-settings',
      'Remove from whitelist via settings: ' + dapp
    ])
  }

  handleDeleteAllDapps = () => (e) => {
    const { whitelistedDapps } = this.props

    if (whitelistedDapps.length <= 0) return
    this.props.ondeleteAllWhitelistedDapps()
    ga([
      '_trackEvent',
      EXTENSION_SETTINGS,
      'click-remove-entire-whitelist',
      'Remove entire whitelist'
    ])
  }

  render() {
    const { newDapp, errorMessage } = this.state
    const { whitelistedDapps } = this.props

    return (
      <Layout
        newDapp={newDapp}
        errorMessage={errorMessage}
        whitelistedDapps={whitelistedDapps}
        updateNewDapp={this.updateNewDapp}
        handleAddDapp={this.handleAddDapp}
        handleDeleteDapp={this.handleDeleteDapp}
        handleDeleteAllDapps={this.handleDeleteAllDapps}
        location={this.props.location}
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
      dispatch(actions.deleteWhitelistedDapp(dapp)),
    ondeleteAllWhitelistedDapps: () =>
      dispatch(actions.deleteAllWhitelistedDapps())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDapps)
