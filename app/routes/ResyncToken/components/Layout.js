import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Page from 'components/Page'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Layout extends Component {
  render() {
    const { handleResync } = this.props

    return (
      <Page>
        <button
          className={cx(styles.button, styles.buttonResync)}
          onClick={handleResync()}
        >
          Resync push token
        </button>
      </Page>
    )
  }
}

export default Layout
