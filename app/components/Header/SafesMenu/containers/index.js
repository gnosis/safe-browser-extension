import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { ga } from 'utils/analytics'
import { SAFES } from 'utils/analytics/events'
import selector from './selector'
import actions from './actions'
import { MSG_LOCK_ACCOUNT } from '../../../../../extension/utils/messages'
import Layout from '../components/Layout'

class SafesMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addNewSafe: false
    }
  }

  handleSelectSafe = (safeAddress) => (e) => {
    const { onSelectSafe } = this.props
    onSelectSafe(safeAddress)
    ga(['_trackEvent', SAFES, 'click-switch-safe', 'Switch Safe'])
  }

  handleAddNewSafe = () => {
    ga(['_trackEvent', SAFES, 'click-connect-to-new-safe', 'Connect to new Safe'])
    this.setState({ addNewSafe: true })
  }

  handleRemoveSafe = (safeAddress) => (e) => {
    e.stopPropagation()
    const { safes, onRemoveSafe } = this.props
    const safeList = safes.safes

    let newCurrentSafe
    if (safeList.length > 1) {
      const deletedIndex = safeList.map(safe => safe.address).indexOf(safeAddress)

      newCurrentSafe = (safes.currentSafe === safeAddress)
        ? ((deletedIndex === 0)
          ? safeList[1].address
          : safeList[deletedIndex - 1].address)
        : safes.currentSafe
    }
    onRemoveSafe(safeAddress, newCurrentSafe)

    if (safeList.length === 1) {
      chrome.runtime.sendMessage({
        msg: MSG_LOCK_ACCOUNT
      })
    }
    ga(['_trackEvent', SAFES, 'click-remove-safe', 'Remove Safe'])
  }

  render () {
    const {
      toggleSafes,
      showSafes,
      showingTransaction,
      safes,
      extensionTitle,
      popupTitle
    } = this.props
    const { addNewSafe } = this.state

    if (addNewSafe || safes.safes.length === 0) {
      return (
        <Redirect to={{
          pathname: '/password',
          state: {
            dest: '/download-apps'
          }
        }} />
      )
    }

    const safeAlias = (showingTransaction)
      ? popupTitle
      : extensionTitle
    return (
      <Layout
        safes={safes}
        safeAlias={safeAlias}
        showSafes={showSafes}
        toggleSafes={toggleSafes}
        handleSelectSafe={this.handleSelectSafe}
        handleRemoveSafe={this.handleRemoveSafe}
        handleAddNewSafe={this.handleAddNewSafe}
        showingTransaction={showingTransaction}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSafe: (address) => dispatch(actions.selectSafe(address)),
    onRemoveSafe: (address, currentSafe) => dispatch(actions.removeSafe(address, currentSafe))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(SafesMenu)
