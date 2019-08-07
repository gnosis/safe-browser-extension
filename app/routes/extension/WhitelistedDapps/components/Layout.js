import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Page from 'components/layout/Page'
import Paragraph from 'components/layout/Paragraph'
import TextInput from 'components/forms/TextInput'
import Button from 'components/layout/Button'
import { ACCOUNT_URL } from 'routes/routes'
import {
  MANAGE_SITES_WHITELIST,
  DELETE_ALL,
  ADD,
  ADD_WEBSITE
} from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({
  newDapp,
  errorMessage,
  whitelistedDapps,
  updateNewDapp,
  handleAddDapp,
  handleDeleteDapp,
  handleDeleteAllDapps,
  location
}) => {
  const prevent = (e) => {
    e.preventDefault()
  }

  return (
    <Page background="grey" location={location}>
      <div className={styles.content}>
        <span className={styles.contentHeader}>
          <Link
            to={ACCOUNT_URL}
            className={cx(styles.btnBack, styles.active)}
          />
          <h2>{MANAGE_SITES_WHITELIST}</h2>
          <Paragraph
            className={styles.actionDeleteAll}
            onClick={handleDeleteAllDapps()}
          >
            {DELETE_ALL}
          </Paragraph>
        </span>
        <span className={styles.contentBody}>
          <span className={styles.whitelistAdd}>
            <form data-validation="ERROR" onSubmit={prevent}>
              <div className={styles.whitelistForm}>
                <TextInput
                  type="text"
                  placeholder={ADD_WEBSITE}
                  name="whitelist-add"
                  className={styles.input}
                  value={newDapp}
                  onChange={updateNewDapp}
                />
                <Button
                  className={styles.button}
                  onClick={handleAddDapp(newDapp)}
                >
                  {ADD}
                </Button>
              </div>
              {errorMessage && (
                <Paragraph className={styles.message}>{errorMessage}</Paragraph>
              )}
            </form>
          </span>
          <ul className={styles.whitelistItems}>
            {whitelistedDapps.map((dapp) => (
              <li key={dapp}>
                {dapp}
                <button onClick={handleDeleteDapp(dapp)} />
              </li>
            ))}
          </ul>
        </span>
      </div>
    </Page>
  )
}

export default Layout
