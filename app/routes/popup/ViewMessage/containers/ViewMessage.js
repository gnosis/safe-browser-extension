import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Headers/CompleteHeader'
import Layout from '../components/Layout'
import selector from './selector'
import styles from 'assets/css/global.css'

class ViewMessage extends Component {
  constructor(props) {
    super(props)

    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  render() {
    const { signMessages, location } = this.props

    return (
      <div className={styles.extensionPopup}>
        <div className={styles.extensionInner}>
          <Header isPopup location={location} />
          <div className={styles.Page}>
            <Layout signMessages={signMessages} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(selector)(ViewMessage)
