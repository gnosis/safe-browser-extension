import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const { existsMasterPassword } = this.props

    return (
      <Page>
        <p className={styles.text}>Select connection type</p>
        {existsMasterPassword &&
          <Link to={{
            pathname: '/password',
            state: {
              dest: '/pairing',
              connectionType: '2FA'
            }
          }}>
            <button>CONNECT FOR 2FA</button>
          </Link>
        }
        {!existsMasterPassword &&
          <Link to={{
            pathname: '/create-password',
            state: {
              dest: '/pairing',
              connectionType: '2FA'
            }
          }}>
            <button>CONNECT FOR 2FA</button>
          </Link >
        }
        <p className={styles.text}>or</p>
        <Link to={{
          pathname: '/pairing',
          state: { connectionType: 'RELAYER' }
        }}>
          <button>CONNECT AS RELAYER</button>
        </Link>
      </Page >
    )
  }
}

export default Layout
