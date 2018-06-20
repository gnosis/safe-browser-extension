import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import Footer from 'components/Footer'
import CreatePasswordForm from './CreatePasswordForm/containers/CreatePasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      newPassword,
      manageCreatePassword,
      ready,
    } = this.props

    const nextLink = ready
      ? {
        pathname: '/confirm-password',
        state: {
          password: newPassword,
        }
      }
      : ''

    return (
      <Page page={styles.password1} simpleHeader>
        <div className={styles.content}>
          <h1>Secure and encrypt your browser extension with a password</h1>
          <span className={styles.warningPassword}>
            <img src={warningImage} />
            <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
          </span>
          <form onSubmit={this.prevent}>
            <CreatePasswordForm
              newPassword={newPassword}
              manageCreatePassword={manageCreatePassword}
              ready={ready}
            />
          </form>
        </div>
        <Footer
          link={'/welcome'}
          ready={ready}
          nextLink={nextLink}
        />
      </Page>
    )
  }
}

export default Layout
