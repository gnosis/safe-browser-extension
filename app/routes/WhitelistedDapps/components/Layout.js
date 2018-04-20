import React, { Component } from 'react'

import Page from 'components/Page'
import ClearFix from 'components/ClearFix'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      newDapp,
      errorMessage,
      whitelistedDapps,
      updateNewDapp,
      handleAddDapp,
      handleDeleteDapp
    } = this.props

    return (
      <Page account logOut padding='noPadding'>
        <div className={styles.innerPage}>
          <input
            type='text'
            value={newDapp}
            onChange={updateNewDapp}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button
            className={styles.button}
            onClick={handleAddDapp(newDapp)}
          >
            Add dApp
          </button>
        </div>
        <div>
          {whitelistedDapps.map((dapp) => (
            <div key={dapp} className={styles.dapp}>
              <div className={styles.name}>
                {dapp}
              </div>

              <button onClick={handleDeleteDapp(dapp)}>
                Delete
              </button>

              <ClearFix />
            </div>
          ))}
        </div>
      </Page>
    )
  }
}

export default Layout
