import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import gnosisOwl from 'assets/gnosis_owl.svg'

import { logOutAccount } from 'actions/account'

class Header extends Component {

  handleLogOut = () => {
    this.props.onLogOut()

    this.props.history.push('/welcome')
  }

  render() {
    const { account, whitelist, logOut } = this.props

    return (
      <div className='header'>
        <div className='left-header'>
          <img src={gnosisOwl} height={30} />
        </div>

        <div className='right-header'>
          {whitelist &&
            <Link to='/whitelisted-dapps'
              className='menu-elem'>
              DApps
            </Link>
          }

          {account &&
            <Link to='/account'
              className='menu-elem'>
              Account
            </Link>
          }

          {logOut &&
            <span
              onClick={this.handleLogOut}
              className='menu-elem'>
              Log out
            </span>
          }
        </div>

        <div className='clean'></div>
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