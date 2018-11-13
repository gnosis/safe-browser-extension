import React, { Component } from 'react'

import Page from 'components/Page'
import keyHole from 'assets/images/keyhole.svg'
import styles from 'assets/css/global.css'
import { getNetwork } from '../../../../../config'
import {
  UNLOCK,
  PERSONAL_EDITION
} from '../../../../../config/messages'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      password,
      updatePassword,
      validatePasswords,
      rotation,
      dataValidation
    } = this.props

    return (
      <Page
        page={styles.unlockSafe}
        withoutHeader
      >
        <form onSubmit={this.prevent} data-validation={dataValidation}>
          <div className={styles.content}>
            <span
              className={styles.safeLogo}
              data-network={getNetwork()}
            >
              <span className={styles.edition}>{PERSONAL_EDITION}</span>
            </span>
            <div className={styles.lockshape} data-validation={dataValidation}>
              <img
                id={styles.keyhole}
                src={keyHole}
              />
              <span className={styles.lockshape_dots} style={rotation} />
            </div>
            <div className={styles.passwordForm}>
              <div>
                <input
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  name='unlock'
                  onChange={updatePassword}
                  className={styles.noborder}
                  autoFocus
                />
                <button
                  onClick={validatePasswords}
                  className={styles.button}
                >
                  {UNLOCK}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Page>
    )
  }
}

export default Layout
