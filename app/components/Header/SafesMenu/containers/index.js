import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'

import SafeItem from '../components/SafeItem'
import actions from './actions'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class SafesMenu extends Component {

  handleSelectSafe = (safeAddress) => (e) => {
    const { onSelectSafe } = this.props
    onSelectSafe(safeAddress)
  }

  render() {
    const {
      toggleSafes,
      showSafes,
      safes,
      selectSafe,
      onSelectSafe,
    } = this.props

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
                <SafeItem address={safe.address} />
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
    onSelectSafe: (address) => dispatch(actions.selectSafe(address))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SafesMenu)
