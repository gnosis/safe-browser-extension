import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Page from 'components/Page'
import TimeBlock from './TimeBlock'

import styles from 'assets/css/global.css'

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
            <Link to='/account' className={cx(styles.btnBack, styles.active)}>
              <p>Back</p>
            </Link>
            <h2>Set Lock Timeout</h2>
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
