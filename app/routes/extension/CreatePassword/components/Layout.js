import React, { Component } from 'react'

import Page from 'components/Page'
import Footer from 'components/Footer'
import CreatePasswordForm from './CreatePasswordForm/containers/CreatePasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'
import {
  CONFIRM_PASSWORD_URL,
  WELCOME_URL
} from 'routes/routes'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      newPassword,
      manageCreatePassword,
      ready
    } = this.props

    const nextLink = ready
      ? {
        pathname: CONFIRM_PASSWORD_URL,
        state: {
          password: newPassword
        }
      }
      : ''

    return (
      <Page page={styles.password1} simpleHeader>
        <form onSubmit={this.prevent}>
          <div className={styles.content}>
            <h1>Secure and encrypt your browser extension with a password</h1>
            <span className={styles.warningPassword}>
              <img src={warningImage} />
              <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
            </span>
            <div className={styles.passwordForm}>
              <CreatePasswordForm
                newPassword={newPassword}
                manageCreatePassword={manageCreatePassword}
                ready={ready}
              />
            </div>
          </div>
          <Footer
            link={WELCOME_URL}
            ready={ready}
            firstStep
            nextLink={nextLink}
          />
        </form>
      </Page>
    )
  }
}

export default Layout
