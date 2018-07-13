import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import Footer from 'components/Footer'
import ConfirmPasswordForm from './ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      confirmPassword,
      properties,
      manageConfirmPassword,
      ready,
    } = this.props

    const nextLink = ready
      ? {
        pathname: '/download-apps',
        state: properties
      }
      : ''

    return (
      <Page page={styles.password2} simpleHeader>
        <div className={styles.content}>
          <h1>Almost done!<br />Confirm your password.</h1>
          <span className={styles.warningPassword}>
            <img src={warningImage} />
            <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
          </span>
          <form onSubmit={this.prevent}>
            <ConfirmPasswordForm
              confirmPassword={confirmPassword}
              manageConfirmPassword={manageConfirmPassword}
              ready={ready}
            />
          </form>
        </div>
        <Footer
          link={'/create-password'}
          ready={ready}
          nextLink={nextLink}
        />
      </Page>
    )
  }
}

export default Layout
