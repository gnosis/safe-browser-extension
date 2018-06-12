import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import ConfirmPasswordForm from './ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      confirmPassword,
      properties,
      manageConfirmPassword,
      ready,
    } = this.props

    return (
      <Page>
        <ConfirmPasswordForm
          confirmPassword={confirmPassword}
          manageConfirmPassword={manageConfirmPassword}
          ready={ready}
        />
        {ready &&
          <Link to={{
            pathname: '/pairing',
            state: properties
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
