import React, { Component } from 'react'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {
  render() {
    const { handleResync } = this.props
    return (
      <Page account logOut padding='noPadding'>
        <div className={styles.innerPage}>
          <button onClick={handleResync()} >Resync push token</button>
        </div>
      </Page >
    )
  }
}

export default Layout
