import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Welcome from 'routes/Welcome/containers/Welcome'
import DownloadApps from 'routes/DownloadApps/containers/DownloadApps'
import ConnectionType from 'routes/ConnectionType/containers/ConnectionType'
import CreatePassword from 'routes/CreatePassword/containers/CreatePassword'
import ConfirmPassword from 'routes/ConfirmPassword/containers/ConfirmPassword'
import Password from 'routes/Password/containers/Password'
import PairingProcess from 'routes/PairingProcess/containers/PairingProcess'
import Account from 'routes/Account/containers/Account'
import Settings from 'routes/Settings/containers/Settings'
import WhitelistedDapps from 'routes/WhitelistedDapps/containers/WhitelistedDapps'

import './styles.css'

class App extends Component {
  componentWillMount() {
    const { account } = this.props.state

    if (account.length === 0) {
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
        <Route exact path='/connection-type' component={ConnectionType} />
        <Route exact path='/create-password' component={CreatePassword} />
        <Route exact path='/confirm-password' component={ConfirmPassword} />
        <Route exact path='/password' component={Password} />
        <Route exact path='/pairing' component={PairingProcess} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/whitelist' component={WhitelistedDapps} />
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