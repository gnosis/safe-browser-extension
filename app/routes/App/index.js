import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Welcome from 'routes/Welcome/containers/Welcome'
import DownloadApps from 'routes/DownloadApps/containers/DownloadApps'
import ChangePassword from 'routes/ChangePassword/containers/ChangePassword'
import CreatePassword from 'routes/CreatePassword/containers/CreatePassword'
import ConfirmPassword from 'routes/ConfirmPassword/containers/ConfirmPassword'
import Password from 'routes/Password/containers/Password'
import Account from 'routes/Account/containers/Account'
import Settings from 'routes/Settings/containers/Settings'
import WhitelistedDapps from 'routes/WhitelistedDapps/containers/WhitelistedDapps'
import LockingConfiguration from 'routes/LockingConfiguration/containers/LockingConfiguration'

import 'assets/css/global.css'

class App extends Component {
  componentWillMount() {
    navigator.permissions.query({ name: 'notifications' })
      .then(function (permission) {
        if (permission.state === 'granted') {
          return
        }
        if (chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage()
        }
        else {
          window.open(chrome.runtime.getURL('options/options.html'))
        }
      })

    const { account, safes } = this.props.state
    const validAccount = account.secondFA && Object.keys(account.secondFA).length > 0
    const validSafes = safes.safes && safes.safes.length > 0
    const url = (validAccount && validSafes)
      ? '/account'
      : ((validAccount)
        ? {
          pathname: '/password',
          state: {
            dest: '/download-apps'
          }
        }
        : '/welcome')

    this.props.history.push(url)
  }

  render() {
    return (
      <div>
        <Route exact path='/welcome' component={Welcome} />
        <Route exact path='/download-apps' component={DownloadApps} />
        <Route exact path='/change-password' component={ChangePassword} />
        <Route exact path='/create-password' component={CreatePassword} />
        <Route exact path='/confirm-password' component={ConfirmPassword} />
        <Route exact path='/password' component={Password} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/whitelist' component={WhitelistedDapps} />
        <Route exact path='/locking' component={LockingConfiguration} />
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