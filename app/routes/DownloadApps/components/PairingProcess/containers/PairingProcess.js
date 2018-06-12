import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import { generatePairingCodeContent } from './pairEthAccount'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../../../config'
import actions from './actions'
import selector from './selector'

class PairingProcess extends Component {
  constructor(props) {
    super(props)

    this.qrPairingRef = React.createRef()
  }

  renderQrImageFrom = (privateKey) => {
    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(privateKey),
      3
    )
  }

  handlePaired = (e) => {
    const { safes } = this.props
    if (safes != null && safes.safes.length > 0)
      this.props.history.push('/account')
  }

  render() {
    const {
      hasAccount,
      hasLockedAccount,
      toggleQr,
      password,
    } = this.props

    return (
      <Layout
        qrPairingRef={this.qrPairingRef}
        hasAccount={hasAccount}
        hasLockedAccount={hasLockedAccount}
        password={password}
        renderQrImageFrom={this.renderQrImageFrom}
        toggleQr={toggleQr}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSafe: (address) => dispatch(actions.addSafe(address)),
  }
}

export default connect(
  selector,
  mapDispatchToProps,
)(PairingProcess)
PairingProcess