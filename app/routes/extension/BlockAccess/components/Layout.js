import React, { Component } from 'react'
import Page from 'components/layout/Page'
import Brave from 'assets/images/brave.svg'
import styles from 'assets/css/global.css'
import {
  GET_CHROME,
  BRAVE_NOT_SUPPORTED,
  BRAVE_NOT_SUPPORTED_DESC
} from '../../../../../config/messages'

class Layout extends Component {
  render() {
    const { location } = this.props

    return (
      <Page page={styles.blockAccess} location={location} simpleHeader>
        <div className={styles.overlayPage}>
          <center>
            <img src={Brave} />
            <h1 className={styles.title}>{BRAVE_NOT_SUPPORTED}</h1>
            <h1 className={styles.description}>{BRAVE_NOT_SUPPORTED_DESC}</h1>
            <a href="https://www.google.com/chrome/" target="_blank">
              <button className={styles.button}>{GET_CHROME}</button>
            </a>
          </center>
        </div>
      </Page>
    )
  }
}

export default Layout
