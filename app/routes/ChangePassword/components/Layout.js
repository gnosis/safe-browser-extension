import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import CreatePasswordForm from 'components/CreatePasswordForm/containers/CreatePasswordForm'
import ConfirmPasswordForm from 'components/ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      newPassword,
      confirmPassword,
      manageCreatePassword,
      manageConfirmPassword,
      updateMasterPassword,
      confirmPasswordReady,
      ready,
    } = this.props

    return (
      <Page>
        <CreatePasswordForm
          newPassword={newPassword}
          manageCreatePassword={manageCreatePassword}
        />
        <ConfirmPasswordForm
          confirmPassword={confirmPassword}
          manageConfirmPassword={manageConfirmPassword}
          ready={this.props.confirmPasswordReady}
        />
        {ready
          ? <button onClick={updateMasterPassword}>Save new password</button>
          : <button>Save new password</button>
        }
      </Page>
    )
  }
}

export default Layout
