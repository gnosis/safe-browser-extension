import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import CreatePasswordForm from 'components/CreatePasswordForm/containers/CreatePasswordForm'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      newPassword,
      manageCreatePassword,
      ready,
    } = this.props

    return (
      <Page>
        <CreatePasswordForm
          newPassword={newPassword}
          manageCreatePassword={manageCreatePassword}
        />
        {ready &&
          <Link to={{
            pathname: '/confirm-password',
            state: {
              password: newPassword,
            }
          }}>
            <button>CONTINUE</button>
          </Link>
        }
        {!ready && <button>CONTINUE</button>}
      </Page>
    )
  }
}

export default Layout
