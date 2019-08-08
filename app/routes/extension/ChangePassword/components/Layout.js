import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Button from 'components/layout/Button'
import CreatePasswordForm from 'routes/extension/CreatePassword/components/CreatePasswordForm/containers/CreatePasswordForm'
import ConfirmPasswordForm from 'routes/extension/ConfirmPassword/components/ConfirmPasswordForm/containers/ConfirmPasswordForm'
import warningImage from 'assets/images/warning.svg'
import { ACCOUNT_URL } from 'routes/routes'
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_DESCRIPTION,
  SAVE_NEW_PASSWORD
} from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({
  newPassword,
  confirmPassword,
  manageCreatePassword,
  manageConfirmPassword,
  updateMasterPassword,
  confirmPasswordReady,
  createPasswordReady,
  location
}) => {
  const prevent = (e) => {
    e.preventDefault()
  }

  return (
    <Page background="grey" location={location}>
      <form onSubmit={prevent}>
        <div className={styles.content}>
          <span className={styles.contentHeader}>
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
          <span className={styles.contentBody}>
            <div className={styles.passwordForm}>
              <div className={styles.confirmPassword}>
                <CreatePasswordForm
                  newPassword={newPassword}
                  manageCreatePassword={manageCreatePassword}
                  isReady={createPasswordReady}
                />
              </div>
              <ConfirmPasswordForm
                confirmPassword={confirmPassword}
                manageConfirmPassword={manageConfirmPassword}
                passwordsMatch={confirmPasswordReady}
              />
              {createPasswordReady && confirmPasswordReady ? (
                <Button
                  className={styles.button}
                  onClick={updateMasterPassword}
                >
                  {SAVE_NEW_PASSWORD}
                </Button>
              ) : (
                <Button className={styles.button}>{SAVE_NEW_PASSWORD}</Button>
              )}
            </div>
          </span>
        </div>
      </form>
    </Page>
  )
}

export default Layout
