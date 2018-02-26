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

  handleManageWhitelistedDApps() {
    this.props.history.push('/whitelisted-dapps')
  }

  renderMenuButtons() {
    let url = this.props.location.pathname

    switch (url) {
      case '/account':
        return (
          <div>
            <Link to='/whitelisted-dapps'
              className='menu-elem'>
              DApps
            </Link>
          </div>
        )

      default:
        if (url !== '/restore-account')
          return (
            <Link to='/account'
              className='menu-elem'>
              Account
            </Link>
          )
    }
  }

  render() {
    const { account } = this.props.state

    return (
      <div className='header'>
        Gnosis
        {!(Object.keys(account).length === 0) &&
          <div>
            {this.renderMenuButtons()}

            <span
              onClick={(e) => this.handleLogOut()}
              className='menu-elem'>
              Log out
            </span>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(logOutAccount())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))