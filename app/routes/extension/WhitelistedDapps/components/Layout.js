import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      newDapp,
      errorMessage,
      whitelistedDapps,
      updateNewDapp,
      handleAddDapp,
      handleDeleteDapp,
      handleDeleteAllDapps
    } = this.props

    return (
      <Page>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link to='/account' className={cx(styles.btnBack, styles.active)}>
              <p>Back</p>
            </Link>
            <h2>Manage Whitelist</h2>
            <p
              className={styles.action_DeleteAll}
              onClick={handleDeleteAllDapps()}
            >Delete All</p>
          </span>
          <span className={styles.overlayPageContent}>
            <span className={styles.whitelist_add}>
              <form data-validation='ERROR' onSubmit={this.prevent}>
                <div className={styles.whitelistForm}>
                  <input
                    type='text'
                    placeholder='Add website'
                    name='whitelist-add'
                    className={styles.noborder}
                    value={newDapp}
                    onChange={updateNewDapp}
                  />
                  <button
                    className={styles.button}
                    onClick={handleAddDapp(newDapp)}
                  >ADD</button>
                  {errorMessage &&
                    <p className={styles.textRed}>{errorMessage}</p>
                  }
                </div>
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
