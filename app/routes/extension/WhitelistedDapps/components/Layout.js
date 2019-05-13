import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import styles from 'assets/css/global.css'
import { ACCOUNT_URL } from 'routes/routes'
import {
  MANAGE_SITES_WHITELIST,
  DELETE_ALL,
  ADD,
  ADD_WEBSITE
} from '../../../../../config/messages'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      newDapp,
      errorMessage,
      whitelistedDapps,
      updateNewDapp,
      handleAddDapp,
      handleDeleteDapp,
      handleDeleteAllDapps,
      location
    } = this.props

    return (
      <Page location={location}>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link
              to={ACCOUNT_URL}
              className={cx(styles.btnBack, styles.active)}
            />
            <h2>{MANAGE_SITES_WHITELIST}</h2>
            <p
              className={styles.action_DeleteAll}
              onClick={handleDeleteAllDapps()}
            >
              {DELETE_ALL}
            </p>
          </span>
          <span className={styles.overlayPageContent}>
            <span className={styles.whitelist_add}>
              <form data-validation="ERROR" onSubmit={this.prevent}>
                <div className={styles.whitelistForm}>
                  <input
                    type="text"
                    placeholder={ADD_WEBSITE}
                    name="whitelist-add"
                    className={styles.noborder}
                    value={newDapp}
                    onChange={updateNewDapp}
                  />
                  <button
                    className={styles.button}
                    onClick={handleAddDapp(newDapp)}
                  >
                    {ADD}
                  </button>
                </div>
                {errorMessage && (
                  <p className={styles.textRed}>{errorMessage}</p>
                )}
              </form>
            </span>
            <ul className={styles.whitelist_items}>
              {whitelistedDapps.map((dapp) => (
                <li key={dapp}>
                  {dapp}
                  <button
                    className={styles.whitelist_itemDelete}
                    onClick={handleDeleteDapp(dapp)}
                  />
                </li>
              ))}
            </ul>
          </span>
        </div>
      </Page>
    )
  }
}

export default Layout
