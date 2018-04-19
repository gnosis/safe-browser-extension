import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import styles from './index.css'

class Layout extends Component {

  render() {
    const {
      minutes,
      handleOptionChange,
      handleSaveConfig,
    } = this.props

    return (
      <Page account logOut>
        <form>
          <div className={styles.item}>
            <input type='radio' value='5' checked={minutes === 5} onChange={handleOptionChange} />
            5min (default)
          </div>
          <div className={styles.item}>
            <input type='radio' value='10' checked={minutes === 10} onChange={handleOptionChange} />
            10min
          </div>
          <div className={styles.item}>
            <input type='radio' value='30' checked={minutes === 30} onChange={handleOptionChange} />
            30min
          </div>
          <div className={styles.item}>
            <input type='radio' value='60' checked={minutes === 60} onChange={handleOptionChange} />
            60min
          </div>
        </form>
        <div className={styles.innerPage}>
          <button onClick={handleSaveConfig}>Save configuration</button>
        </div>
      </Page>
    )
  }
}

export default Layout
