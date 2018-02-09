import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Header from '../Header'
import CreateAccount from '../CreateAccount'
import RestoreAccount from '../RestoreAccount'
import Account from '../Account'

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
        <Header />
        <div className='container'>
          <Route exact path='/create-password' component={CreateAccount} />
          <Route exact path='/restore-account' component={RestoreAccount} />
          <Route exact path='/account' component={Account} />
        </div>
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