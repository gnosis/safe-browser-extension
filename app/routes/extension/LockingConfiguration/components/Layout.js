import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Page from 'components/layout/Page'
import TimeBlock from './TimeBlock'
import { ACCOUNT_URL } from 'routes/routes'
import { SET_LOCK_TIMEOUT } from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({ minutes, handleOptionChange, location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <span className={styles.contentHeader}>
        <Link to={ACCOUNT_URL} className={cx(styles.btnBack, styles.active)} />
        <h2>{SET_LOCK_TIMEOUT}</h2>
      </span>
      <span className={styles.bodyContent}>
        <form className={styles.timeout_items}>
          <TimeBlock
            handleOptionChange={handleOptionChange}
            minutes={minutes}
            minTime={5}
          />
          <TimeBlock
            handleOptionChange={handleOptionChange}
            minutes={minutes}
            minTime={10}
          />
          <TimeBlock
            handleOptionChange={handleOptionChange}
            minutes={minutes}
            minTime={30}
          />
          <TimeBlock
            handleOptionChange={handleOptionChange}
            minutes={minutes}
            minTime={60}
          />
        </form>
      </span>
    </div>
  </Page>
)

export default Layout
