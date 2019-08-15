import React from 'react'
import classNames from 'classnames'
import Page from 'components/layout/Page'
import TextInput from 'components/forms/TextInput'
import Button from 'components/layout/Button'
import ContentHeader from 'components/Headers/ContentHeader'
import { getNetwork } from '../../../../../config'
import { UNLOCK, ENTER_PASSWORD } from '../../../../../config/messages'
import { ACCOUNT_URL } from 'routes/routes'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({
  password,
  updatePassword,
  validatePasswords,
  dataValidation,
  location
}) => {
  const prevent = (e) => {
    e.preventDefault()
  }

  return (
    <Page withoutHeader background="mountains" location={location}>
      <div className={styles.content}>
        {location.state.contentHeader && (
          <ContentHeader backLink={ACCOUNT_URL} color="darkblue" />
        )}
        <span
          className={cx(
            styles.safeLogo,
            location.state.contentHeader && styles.safeLogoSmMargin
          )}
          data-network={getNetwork()}
        />
        <form onSubmit={prevent}>
          <div className={styles.passwordForm}>
            <TextInput
              type="password"
              placeholder={ENTER_PASSWORD}
              value={password}
              onChange={updatePassword}
              autoFocus
              className={styles.passwordInput}
              dataValidation={dataValidation}
            />
            <Button onClick={validatePasswords} className={styles.button}>
              {UNLOCK}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  )
}

export default Layout
