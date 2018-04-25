import React, { Component } from 'react'

import Page from 'components/Page'
import TimeBlock from './TimeBlock'
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
          <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={5} />
          <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={10} />
          <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={30} />
          <TimeBlock handleOptionChange={handleOptionChange} minutes={minutes} minTime={60} />
        </form>
        <div>
          <button
            className={styles.button}
            onClick={handleSaveConfig}
          >
            Save configuration
          </button>
        </div>
      </Page>
    )
  }
}

export default Layout
