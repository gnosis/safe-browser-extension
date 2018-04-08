import React, { Component } from 'react'
import { connect } from 'react-redux'

import ClearFix from 'components/ClearFix'
import { normalizeUrl } from 'utils/helpers'
import styles from './index.css'

import actions from './actions'

class WhitelistedDappState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
    }
  }

  componentDidMount = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url
      this.isWhitelistedDapp(url)
    })
  }

  isWhitelistedDapp = (url) => {
    this.setState({
      url: normalizeUrl(url)
    })
  }

  handleAddDapp = (dapp) => (e) => {
    this.props.onAddWhitelistedDapp(dapp)
  }

  handleDeleteDapp = (dapp) => (e) => {
    this.props.onDeleteWhitelistedDapp(dapp)
  }

  render() {
    const { url } = this.state
    const { whitelistedDapps } = this.props

    return (
      <div className={styles.whitelistedStatus}>
        {(whitelistedDapps.indexOf(normalizeUrl(url)) > -1)
          ?
          <div className={styles.whitelistedDapp}>
            <div className={styles.status}>{url} is whitelisted</div>
            <button onClick={this.handleDeleteDapp(url)}>REMOVE</button>
            <ClearFix />
          </div>
          :
          <div className={styles.notWhitelistedDapp}>
            <div className={styles.status}>{url} is not whitelisted</div>
            <button onClick={this.handleAddDapp(url)}>WHITELIST</button>
            <ClearFix />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ whitelistedDapps }, props) => {
  return {
    whitelistedDapps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWhitelistedDapp: (dapp) => dispatch(actions.addWhitelistedDapp(dapp)),
    onDeleteWhitelistedDapp: (dapp) => dispatch(actions.deleteWhitelistedDapp(dapp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDappState)
