import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Welcome from 'routes/Welcome/containers/Welcome'
import DownloadApps from 'routes/DownloadApps/containers/DownloadApps'
import CreateAccount from 'routes/CreateAccount/containers/CreateAccount'
import Account from 'routes/Account/containers/Account'
import WhitelistedDapps from 'routes/WhitelistedDapps/containers/WhitelistedDapps'

import './styles.css'

class App extends Component {
  componentWillMount() {
    const { account } = this.props.state

    if (Object.keys(account).length === 0) {
      this.props.history.push('/welcome')
    }
    else {
      this.props.history.push('/account')
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/welcome' component={Welcome} />
        <Route exact path='/download-apps' component={DownloadApps} />
        <Route exact path='/create-password' component={CreateAccount} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/whitelisted-dapps' component={WhitelistedDapps} />
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