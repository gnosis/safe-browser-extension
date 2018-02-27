import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { logOutAccount } from '../../actions/account'

class Header extends Component {

  handleLogOut() {
    this.props.onLogOut()

    this.props.history.push('/create-password')
  }

  render() {
    const { account, whitelist, logOut } = this.props

    return (
      <div className='header'>
        Gnosis
        
        <div>
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
              onClick={(e) => this.handleLogOut()}
              className='menu-elem'>
              Log out
          </span>
          }
        </div>
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