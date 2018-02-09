import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { logOutAccount } from '../../actions/account'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  handleLogOut() {
    this.props.onLogOut()

    this.props.history.push('/create-password')
  }

  render() {
    const { account } = this.props.state

    return (
      <div className='header'>
        Gnosis
        {!(Object.keys(account).length === 0) &&
          <span
            onClick={(e) => this.handleLogOut()}
            className='logout'>
            Log out
          </span>
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