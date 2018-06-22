import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import SafeItem from '../components/SafeItem'
import actions from './actions'
import { MSG_LOCK_ACCOUNT } from '../../../../../extension/utils/messages'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class SafesMenu extends Component {

  handleSelectSafe = (safeAddress) => (e) => {
    const { onSelectSafe } = this.props
    onSelectSafe(safeAddress)
  }

  handleRemoveSafe = (safeAddress) => (e) => {
    e.stopPropagation()
    const { safes, onRemoveSafe } = this.props
    const safeList = safes.safes

    let newCurrentSafe = undefined
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
        msg: MSG_LOCK_ACCOUNT,
      })
    }

    // TO-DO: Delete pairing
  }

  render() {
    const {
      toggleSafes,
      showSafes,
      safes,
      selectSafe,
      onSelectSafe,
    } = this.props
    
    if (safes.safes.length === 0) {
      return(
        <Redirect to={{
          pathname: '/password',
          state: {
            dest: '/download-apps'
          }
        }} /> 
      )
    }
    return (
      <React.Fragment>
        <span
          className={cx(styles.safeIcon, styles.hasMenu)}
          onClick={toggleSafes}
        >
          <i>currentSafe</i>
        </span>
        <span className={cx(styles.safeMenu, showSafes ? styles.active : null)}>
          <ul>
            {safes.safes && safes.safes.map((safe) => (
              <li
                className={cx(styles.safeMenuSafeItem, safe.address === safes.currentSafe ? styles.active : null)}
                onClick={this.handleSelectSafe(safe.address)}
                key={safe.address}
              >
                <SafeItem
                  address={safe.address}
                  alias={safe.alias}
                  removeSafe={this.handleRemoveSafe}
                />
              </li>
            ))}
            <li className={styles.safeMenuNewSafe}>
              <p>Connect to new Safe</p>
            </li>
          </ul>
        </span>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ safes }, props) => {
  return {
    safes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSafe: (address) => dispatch(actions.selectSafe(address)),
    onRemoveSafe: (address, currentSafe) => dispatch(actions.removeSafe(address, currentSafe)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SafesMenu)
