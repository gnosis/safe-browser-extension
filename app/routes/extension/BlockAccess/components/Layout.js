import React from 'react'
import Page from 'components/layout/Page'
import Button from 'components/layout/Button'
import Paragraph from 'components/layout/Paragraph'
import Brave from '../assets/brave.svg'
import {
  GET_CHROME,
  BRAVE_NOT_SUPPORTED,
  BRAVE_NOT_SUPPORTED_DESC
} from '../../../../../config/messages'
import styles from './style.css'

const Layout = ({ location }) => (
  <Page
    background="grey"
    page={styles.blockAccess}
    location={location}
    simpleHeader
  >
    <div className={styles.content}>
      <img src={Brave} />
      <h1 className={styles.title}>{BRAVE_NOT_SUPPORTED}</h1>
      <Paragraph className={styles.description}>
        {BRAVE_NOT_SUPPORTED_DESC}
      </Paragraph>
      <a href="https://www.google.com/chrome/" target="_blank">
        <Button className={styles.button}>{GET_CHROME}</Button>
      </a>
    </div>
  </Page>
)

export default Layout
