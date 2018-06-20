import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class NavigationDrawer extends Component {
  render() {
    const { account, showMenu } = this.props

    const changePasswordUrl = account.lockedState
      ? {
        pathname: '/password',
        state: {
          dest: '/change-password'
        }
      }
      : '/change-password'

    return (
      <ul className={cx(styles.safeDrawerMenu, showMenu ? styles.active : null)}>
        <li data-menu='whitelist'>
          <Link to='whitelist'>Manage sites whitelist</Link>
        </li>
        <li data-menu='timeout'>
          <Link to='/locking'>Set lock timeout</Link>
        </li>
        <li data-menu='password'>
          <Link to={changePasswordUrl}>Change password</Link>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account,
  }
}

export default connect(
  mapStateToProps,
)(NavigationDrawer)
