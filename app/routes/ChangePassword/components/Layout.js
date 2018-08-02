import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import CreatePasswordForm from 'routes/CreatePassword/components/CreatePasswordForm/containers/CreatePasswordForm'
import ConfirmPasswordForm from 'routes/ConfirmPassword/components/ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      newPassword,
      confirmPassword,
      manageCreatePassword,
      manageConfirmPassword,
      updateMasterPassword,
      confirmPasswordReady,
      createPasswordReady
    } = this.props

    return (
      <Page>
        <div className={cx(styles.overlayPage, styles.active)} data-page='password'>
          <span className={styles.overlayPageHeader}>
            <Link to='/account' className={cx(styles.btnBack, styles.active)}>
              <p>Back</p>
            </Link>
            <h2>Change password</h2>
          </span>
          <span className={styles.warningPassword}>
            <img src={warningImage} />
            <p>Password is used to unlock the extension and confirm transactions. <strong>Don't share this password with others!</strong></p>
          </span>
          <span className={styles.overlayPageContent}>
            <span className={styles.overlayPageContent}>
              <form onSubmit={this.prevent}>
                <CreatePasswordForm
                  newPassword={newPassword}
                  manageCreatePassword={manageCreatePassword}
                  ready={this.props.createPasswordReady}
                />
                <ConfirmPasswordForm
                  confirmPassword={confirmPassword}
                  manageConfirmPassword={manageConfirmPassword}
                  ready={this.props.confirmPasswordReady}
                />
                {createPasswordReady && confirmPasswordReady
                  ? <button className={styles.button} onClick={updateMasterPassword}>SAVE NEW PASSWORD</button>
                  : <button className={styles.button}>SAVE NEW PASSWORD</button>
                }
              </form>
            </span>
          </span>
        </div>
      </Page>
    )
  }
}

export default Layout
