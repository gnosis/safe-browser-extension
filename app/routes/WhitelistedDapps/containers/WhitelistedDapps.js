import React, { Component } from 'react'
import { connect } from 'react-redux'

import { normalizeUrl } from 'utils/helpers'

import Layout from '../components/Layout'
import actions from './actions'

class WhitelistedDapps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newDapp: '',
      errorMessage: '',
    }
  }

  updateNewDapp = (e) => {
    this.setState({ newDapp: e.target.value })
  }

  validateDapp = (dapp) => {
    if (!dapp) {
      this.setState({ errorMessage: 'Invalid URL' })
      return false
    }

    const { whitelistedDapps } = this.props

    if (whitelistedDapps.indexOf(dapp) > -1) {
      this.setState({ errorMessage: 'URL already whitelisted' })
      return false
    }

    this.setState({ errorMessage: '' })
    return true
  }

  handleAddDapp = (dapp) => (e) => {
    const newDapp = normalizeUrl(dapp)

    if (this.validateDapp(newDapp)) {
      this.props.onAddWhitelistedDapp(newDapp)

      this.setState({ newDapp: '' })
    }
  }

  handleDeleteDapp = (dapp) => (e) => {
    this.props.onDeleteWhitelistedDapp(dapp)
  }

  handleDeleteAllDapps = () => (e) => {
    this.props.ondeleteAllWhitelistedDapps()
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
    onDeleteWhitelistedDapp: (dapp) => dispatch(actions.deleteWhitelistedDapp(dapp)),
    ondeleteAllWhitelistedDapps: () => dispatch(actions.deleteAllWhitelistedDapps()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDapps)
