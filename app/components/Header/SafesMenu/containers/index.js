import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import selector from './selector'
import actions from './actions'
import { MSG_LOCK_ACCOUNT } from '../../../../../extension/utils/messages'
import Layout from '../components/Layout'

class SafesMenu extends Component {
  handleSelectSafe = (safeAddress) => (e) => {
    const { onSelectSafe } = this.props
    onSelectSafe(safeAddress)
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
  }

  render () {
    const {
      toggleSafes,
      showSafes,
      safes,
      noSafeMenu,
      currentSafeAlias
    } = this.props

    if (safes.safes.length === 0) {
      return (
        <Redirect to={{
          pathname: '/password',
          state: {
            dest: '/download-apps'
          }
        }} />
      )
    }

    return (
      <Layout
        safes={safes}
        currentAlias={currentSafeAlias}
        showSafes={showSafes}
        toggleSafes={toggleSafes}
        handleSelectSafe={this.handleSelectSafe}
        handleRemoveSafe={this.handleRemoveSafe}
        noSafeMenu={noSafeMenu}
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
