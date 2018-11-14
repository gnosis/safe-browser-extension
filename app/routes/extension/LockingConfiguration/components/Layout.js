import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Page from 'components/Page'
import TimeBlock from './TimeBlock'
import styles from 'assets/css/global.css'
import { ACCOUNT_URL } from 'routes/routes'
import { SET_LOCK_TIMEOUT } from '../../../../../config/messages'

const cx = classNames.bind(styles)

class Layout extends Component {
  render () {
    const {
      minutes,
      handleOptionChange
    } = this.props

    return (
      <Page>
        <div className={styles.overlayPage}>
          <span className={styles.overlayPageHeader}>
            <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
            <h2>{SET_LOCK_TIMEOUT}</h2>
          </span>
          <span className={styles.overlayPageContent}>
            <form className={styles.timeout_items}>
              <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={5} />
              <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={10} />
              <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={30} />
              <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={60} />
            </form>
          </span>
        </div>
      </Page>
    )
  }
}

export default Layout
