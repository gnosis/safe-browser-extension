import React from 'react'
import Page from 'components/layout/Page'
import ContentHeader from 'components/Headers/ContentHeader'
import TimeBlock from './TimeBlock'
import { ACCOUNT_URL } from 'routes/routes'
import { SET_LOCK_TIMEOUT } from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({ minutes, handleOptionChange, location }) => (
  <Page background="grey" location={location}>
    <div className={styles.content}>
      <ContentHeader backLink={ACCOUNT_URL} message={SET_LOCK_TIMEOUT} />
      <div className={styles.bodyContent}>
        <form className={styles.timeoutItems}>
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
      </div>
    </div>
  </Page>
)

export default Layout
