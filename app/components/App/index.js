import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import CreateAccount from 'components/CreateAccount'
import Account from 'components/Account'
import WhitelistedDApps from 'components/WhitelistedDApps'

import './styles.css'


class App extends Component {
  componentWillMount() {
    const { account } = this.props.state

    if (Object.keys(account).length === 0) {
      this.props.history.push('/create-password')
    }
    else {
      this.props.history.push('/account')
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/create-password' component={CreateAccount} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/whitelisted-dapps' component={WhitelistedDApps} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    state
  }
}

export default withRouter(connect(
  mapStateToProps
)(App))