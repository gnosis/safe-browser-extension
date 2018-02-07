import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import CreateAccount from '../CreateAccount'
import RestoreAccount from '../RestoreAccount'
import Account from '../Account'

import './styles.css'

class App extends Component {
  componentWillMount() {
    const serializedState = localStorage.getItem('state')
    if (!serializedState) {
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
        <Route exact path='/restore-account' component={RestoreAccount} />
        <Route exact path='/account' component={Account} />
      </div>
    )
  }
}

export default withRouter(connect()(App))