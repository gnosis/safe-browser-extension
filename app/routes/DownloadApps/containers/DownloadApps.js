import React, { Component } from 'react'

import Layout from '../components/Layout'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'

class DownloadApps extends Component {
  constructor(props) {
    super(props)

    this.androidAppLink = config.androidAppLink
    this.iOSAppLink = config.iOSAppLink
  }

  componentDidMount = () => {
    createQrImage(
      document.getElementById('qr-android'),
      this.androidAppLink,
      4
    )
    createQrImage(
      document.getElementById('qr-ios'),
      this.iOSAppLink,
      4
    )
  }

  handleOpenApp = (url) => (e) => {
    chrome.tabs.create({ url })
  }

  render() {
    return (
      <Layout
        androidAppLink={this.androidAppLink}
        iOSAppLink={this.iOSAppLink}
        handleOpenApp={this.handleOpenApp}
      />
    )
  }
}

export default DownloadApps
