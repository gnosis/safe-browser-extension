import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Welcome from 'routes/Welcome/containers/Welcome'
import DownloadApps from 'routes/DownloadApps/containers/DownloadApps'
import CreatePassword from 'routes/CreatePassword/containers/CreatePassword'
import ConfirmPassword from 'routes/ConfirmPassword/containers/ConfirmPassword'
import Password from 'routes/Password/containers/Password'
import PairingProcess from 'routes/PairingProcess/containers/PairingProcess'
import Account from 'routes/Account/containers/Account'
import Settings from 'routes/Settings/containers/Settings'
import WhitelistedDapps from 'routes/WhitelistedDapps/containers/WhitelistedDapps'
import SafesList from 'routes/SafesList/containers/SafesList'

import './styles.css'

class App extends Component {
  componentWillMount() {
    const { safes } = this.props.state
    const validSafes = safes.safes && safes.safes.length > 0
    const url = validSafes ? '/account' : '/welcome'
    this.props.history.push(url)
  }

  render() {
    return (
      <div>
        <Route exact path='/welcome' component={Welcome} />
        <Route exact path='/download-apps' component={DownloadApps} />
        <Route exact path='/create-password' component={CreatePassword} />
        <Route exact path='/confirm-password' component={ConfirmPassword} />
        <Route exact path='/password' component={Password} />
        <Route exact path='/pairing' component={PairingProcess} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/whitelist' component={WhitelistedDapps} />
        <Route exact path='/safes' component={SafesList} />
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