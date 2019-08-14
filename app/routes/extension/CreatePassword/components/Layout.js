import React from 'react'
import Page from 'components/layout/Page'
import FooterSteps from 'components/Footers/FooterSteps'
import CreatePasswordForm from './CreatePasswordForm/containers/CreatePasswordForm'
import warningImage from 'assets/images/warning.svg'
import { CONFIRM_PASSWORD_URL, WELCOME_URL } from 'routes/routes'
import {
  CREATE_PASSWORD_TITLE,
  CHANGE_PASSWORD_DESCRIPTION
} from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({ newPassword, manageCreatePassword, isReady, location }) => {
  const prevent = (e) => {
    e.preventDefault()
  }

  const nextLink = isReady
    ? {
        pathname: CONFIRM_PASSWORD_URL,
        state: {
          password: newPassword
        }
      }
    : ''

  return (
    <Page background="grey" location={location} simpleHeader>
      <form onSubmit={prevent}>
        <div className={styles.content}>
          <h1>{CREATE_PASSWORD_TITLE}</h1>
          <span className={styles.warningPassword}>
            <img src={warningImage} />
            <p>{CHANGE_PASSWORD_DESCRIPTION}</p>
          </span>
          <div className={styles.passwordForm}>
            <CreatePasswordForm
              newPassword={newPassword}
              manageCreatePassword={manageCreatePassword}
              isReady={isReady}
            />
          </div>
        </div>
        <FooterSteps
          link={WELCOME_URL}
          isReady={isReady}
          firstStep
          nextLink={nextLink}
        />
      </form>
    </Page>
  )
}

export default Layout
