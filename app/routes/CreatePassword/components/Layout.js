import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import CreatePasswordForm from './CreatePasswordForm/containers/CreatePasswordForm'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render() {
    const {
      newPassword,
      manageCreatePassword,
      ready,
    } = this.props

    const nextLink = ready
      ? {
        pathname: '/confirm-password',
        state: {
          password: newPassword,
        }
      }
      : ''

    return (
      <Page page={styles.password1} simpleHeader>
        <div className={styles.content}>
          <CreatePasswordForm
            newPassword={newPassword}
            manageCreatePassword={manageCreatePassword}
            ready={ready}
          />
        </div>
        <footer>
          <Link to='/welcome' className={cx(styles.btnBack, styles.active)}></Link>
          <ul className={styles.stepperDots}>
            <li className={styles.active}></li>
            <li></li>
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
