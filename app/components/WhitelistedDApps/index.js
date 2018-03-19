import React, { Component } from 'react'
import { connect } from 'react-redux'

import Page from 'components/Page'
import { normalizeUrl } from 'utils/helpers'
import ClearFix from 'components/ClearFix'
import styles from './index.css'

import { addWhitelistedDApp, deleteWhitelistedDApp } from 'actions/whitelistedDApps'

class WhitelistedDApps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newDApp: '',
      errorMessage: '',
    }
  }

  updateNewDApp = (e) => {
    this.setState({ newDApp: e.target.value })
  }

  validateDApp = (dApp) => {
    if (!dApp) {
      this.setState({ errorMessage: 'Invalid DApp' })
      return false
    }

    const { whitelistedDApps } = this.props

    if (whitelistedDApps.indexOf(dApp) > -1) {
      this.setState({ errorMessage: 'DApp already whitelisted' })
      return false
    }

    this.setState({ errorMessage: '' })
    return true
  }

  handleAddDApp = (dApp) => (e) => {
    const newDApp = normalizeUrl(dApp)

    if (this.validateDApp(newDApp)) {
      this.props.onAddWhitelistedDApp(newDApp)

      this.setState({ newDApp: '' })
    }
  }

  handleDeleteDApp = (dApp) => (e) => {
    this.props.onDeleteWhitelistedDApp(dApp)
  }

  render() {
    const { newDApp, errorMessage } = this.state
    const { whitelistedDApps } = this.props

    return (
      <Page
        account={true}
        logOut={true}
      >
        <input
          type='text'
          value={newDApp}
          onChange={this.updateNewDApp} />

        {errorMessage &&
          <p>{errorMessage}</p>
        }
        <button onClick={this.handleAddDApp(newDApp)}>Add DApp</button>

        <div>
          {whitelistedDApps.map((dapp) => (
            <div key={dapp} className={styles.dapp}>
              <div className={styles.name}>
                {dapp}
              </div>

              <button onClick={this.handleDeleteDApp(dapp)}>
                Delete
              </button>
              
              <ClearFix />
            </div>
          ))}
        </div>
      </Page>
    )
  }
}

const mapStateToProps = ({ whitelistedDApps }, props) => {
  return {
    whitelistedDApps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWhitelistedDApp: (dapp) => dispatch(addWhitelistedDApp(dapp)),
    onDeleteWhitelistedDApp: (dapp) => dispatch(deleteWhitelistedDApp(dapp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDApps)