import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import { generatePairingCodeContent } from './pairEthAccount'
import { createQrImage } from 'utils/qrdisplay'
import config from '../../../../config'
import actions from './actions'
import selector from './selector'

class PairingProcess extends Component {
  constructor(props) {
    super(props)

    this.qrPairingRef = React.createRef()
    const { location } = this.props
    const validPassword = location && location.state && location.state.password
    this.password = validPassword ? location.state.password : undefined
  }

  renderQrImageFrom = (privateKey) => {
    createQrImage(
      this.qrPairingRef.current,
      generatePairingCodeContent(privateKey),
      4
    )
  }

  handlePaired = (e) => {
    // MOCK CONNECTION TO SAFE ACCOUNT
    const { safes } = this.props
    const connectedSafes = (safes.safes !== undefined)
      ? safes.safes.length
      : 0

    const newSafeAdress = config.mockSafesAdresses[connectedSafes]
    this.props.onAddSafe(newSafeAdress)
    this.props.history.push('/account')
  }

  render() {
    const { hasAccount, hasLockedAccount } = this.props
    return (
      <Layout
        qrPairingRef={this.qrPairingRef}
        hasAccount={hasAccount}
        hasLockedAccount={hasLockedAccount}
        password={this.password}
        renderQrImageFrom={this.renderQrImageFrom}
        handlePaired={this.handlePaired}
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
