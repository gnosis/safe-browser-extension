import React, { Component } from 'react'

import Page from 'components/Page'
import Footer from 'components/Footer'
import ConfirmPasswordForm from './ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      confirmPassword,
      properties,
      manageConfirmPassword,
      ready
    } = this.props

    const nextLink = ready
      ? {
        pathname: '/download-apps',
        state: properties
      }
      : ''

    return (
      <Page page={styles.password2} simpleHeader>
        <form onSubmit={this.prevent}>
          <div className={styles.content}>
            <h1>Almost done!<br />Confirm your password.</h1>
            <span className={styles.warningPassword}>
              <img src={warningImage} />
              <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
            </span>
            <div className={styles.passwordForm}>
              <ConfirmPasswordForm
                confirmPassword={confirmPassword}
                manageConfirmPassword={manageConfirmPassword}
                ready={ready}
              />
            </div>
          </div>
          <Footer
            link={'/create-password'}
            ready={ready}
            secondStep
            nextLink={nextLink}
          />
        </form>
      </Page>
    )
  }
}

export default Layout
