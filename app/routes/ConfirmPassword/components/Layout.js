import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const {
      password,
      error,
      updatePasswordField,
      updateMasterPassword,
      properties,
    } = this.props

    return (
      <Page>
        <p className={styles.text}>Confirm the master password</p>
        <input
          type='password'
          placeholder='Confirm password'
          value={password}
          onChange={updatePasswordField}
        />
        <div>
          <div className={(error && error.match) ? styles.correct : styles.wrong}>
            <p>Passwords must match</p>
          </div>
        </div>
        {this.props.continue && properties.option === 'createPassword' &&
          <Link to={{
            pathname: properties.dest,
            state: properties
          }}>
            <button>CONTINUE</button>
          </Link>
        }
        {this.props.continue && properties.option === 'updatePassword' &&
          <button onClick={updateMasterPassword}>CONTINUE</button>
        }
        {!this.props.continue &&
          <button>CONTINUE</button>
        }
      </Page>
    )
  }
}

export default Layout
