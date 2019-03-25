import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import CreatePasswordForm from 'routes/extension/CreatePassword/components/CreatePasswordForm/containers/CreatePasswordForm'
import ConfirmPasswordForm from 'routes/extension/ConfirmPassword/components/ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'
import { ACCOUNT_URL } from 'routes/routes'
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_DESCRIPTION,
  SAVE_NEW_PASSWORD
} from '../../../../../config/messages'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      newPassword,
      confirmPassword,
      manageCreatePassword,
      manageConfirmPassword,
      updateMasterPassword,
      confirmPasswordReady,
      createPasswordReady,
      location
    } = this.props

    return (
      <Page location={location}>
        <div className={styles.overlayPage} data-page="password">
          <span className={styles.overlayPageHeader}>
            <Link
              to={ACCOUNT_URL}
              className={cx(styles.btnBack, styles.active)}
            />
            <h2>{CHANGE_PASSWORD}</h2>
          </span>
          <span className={styles.warningPassword}>
            <img src={warningImage} />
            <p>{CHANGE_PASSWORD_DESCRIPTION}</p>
          </span>
          <span className={styles.overlayPageContent}>
            <form onSubmit={this.prevent}>
              <div className={styles.passwordForm}>
                <CreatePasswordForm
                  newPassword={newPassword}
                  manageCreatePassword={manageCreatePassword}
                  ready={this.props.createPasswordReady}
                />
                <ConfirmPasswordForm
                  confirmPassword={confirmPassword}
                  manageConfirmPassword={manageConfirmPassword}
                  passwordsMatch={this.props.confirmPasswordReady}
                />
                {createPasswordReady && confirmPasswordReady ? (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={updateMasterPassword}
                  >
                    {SAVE_NEW_PASSWORD}
                  </button>
                ) : (
                  <button className={styles.button}>{SAVE_NEW_PASSWORD}</button>
                )}
              </div>
            </form>
          </span>
        </div>
      </Page>
    )
  }
}

export default Layout
