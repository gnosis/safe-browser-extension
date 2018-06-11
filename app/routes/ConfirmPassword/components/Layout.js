import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import ConfirmPasswordForm from './ConfirmPasswordForm/containers/ConfirmPasswordForm'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render() {
    const {
      confirmPassword,
      properties,
      manageConfirmPassword,
      ready,
    } = this.props

    const nextLink = ready
      ? {
        pathname: '/download-apps',
        state: properties
      }
      : ''

    return (
      <Page page={styles.password2} simpleHeader>
        <div className={styles.content}>
          <ConfirmPasswordForm
            confirmPassword={confirmPassword}
            manageConfirmPassword={manageConfirmPassword}
            ready={ready}
          />
        </div>
        <footer>
          <Link to='/create-password' className={cx(styles.btnBack, styles.active)}></Link>
          <ul className={styles.stepperDots}>
            <li></li>
            <li className={styles.active}></li>
          </ul>
          <Link to={nextLink} className={cx(styles.btnNext, ready ? styles.active : null)}>
            <p>Next</p>
          </Link>
        </footer>
      </Page>
    )
  }
}

export default Layout
