import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Transaction from 'routes/popup/Transaction/containers/Transaction'

import Welcome from 'routes/extension/Welcome/containers/Welcome'
import DownloadApps from 'routes/extension/DownloadApps/containers/DownloadApps'
import ChangePassword from 'routes/extension/ChangePassword/containers/ChangePassword'
import CreatePassword from 'routes/extension/CreatePassword/containers/CreatePassword'
import ConfirmPassword from 'routes/extension/ConfirmPassword/containers/ConfirmPassword'
import Password from 'routes/extension/Password/containers/Password'
import Account from 'routes/extension/Account/containers/Account'
import WhitelistedDapps from 'routes/extension/WhitelistedDapps/containers/WhitelistedDapps'
import LockingConfiguration from 'routes/extension/LockingConfiguration/containers/LockingConfiguration'
import ResyncToken from 'routes/extension/ResyncToken/containers/ResyncToken'

import 'assets/css/global.css'

export const PopupRoutes = () => (
  <Switch>
    <Redirect exact from="/" to={Transaction} />
    <Route exact path='/password' component={Password} />
    <Route exact path='/transaction' component={Transaction} />
  </Switch>
)

export const ExtensionRoutes = () => {
  
  
  return (
    <Switch>
      <Redirect exact from="/" to={WELCOME_ADDRESS} />
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/download-apps' component={DownloadApps} />
      <Route exact path='/change-password' component={ChangePassword} />
      <Route exact path='/create-password' component={CreatePassword} />
      <Route exact path='/confirm-password' component={ConfirmPassword} />
      <Route exact path='/password' component={Password} />
      <Route exact path='/account' component={Account} />
      <Route exact path='/whitelist' component={WhitelistedDapps} />
      <Route exact path='/locking' component={LockingConfiguration} />
      <Route exact path='/resync-token' component={ResyncToken} />
    </Switch>       
  )
}