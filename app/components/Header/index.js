import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import gnosisOwl from 'assets/gnosis_owl.svg'
import ClearFix from 'components/ClearFix'
import styles from './index.css'

import { logOutAccount } from 'actions/account'

class Header extends Component {

  handleLogOut = () => {
    this.props.onLogOut()

    this.props.history.push('/welcome')
  }

  render() {
    const { account, settings, logOut } = this.props

    return (
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <img src={gnosisOwl} height={30} />
        </div>

        <div className={styles.rightHeader}>
          {settings &&
            <Link to='/settings'
              className={styles.menuElem}>
              Settings
            </Link>
          }

          {account &&
            <Link to='/account'
              className={styles.menuElem}>
              Account
            </Link>
          }

          {logOut &&
            <span
              onClick={this.handleLogOut}
              className={styles.menuElem}>
              Log out
            </span>
          }
        </div>

        <ClearFix />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(logOutAccount())
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Header))