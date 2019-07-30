import React, { Component } from 'react'
import Page from 'components/Page'
import FooterSteps from 'components/Footers/FooterSteps'
import CreatePasswordForm from './CreatePasswordForm/containers/CreatePasswordForm'
import styles from 'assets/css/global.css'
import warningImage from 'assets/images/warning.svg'
import { CONFIRM_PASSWORD_URL, WELCOME_URL } from 'routes/routes'
import {
  CREATE_PASSWORD_TITLE,
  CHANGE_PASSWORD_DESCRIPTION
} from '../../../../../config/messages'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const { newPassword, manageCreatePassword, ready, location } = this.props

    const nextLink = ready
      ? {
          pathname: CONFIRM_PASSWORD_URL,
          state: {
            password: newPassword
          }
        }
      : ''

    return (
      <Page page={styles.password1} location={location} simpleHeader>
        <form onSubmit={this.prevent}>
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
                ready={ready}
              />
            </div>
          </div>
          <FooterSteps
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
