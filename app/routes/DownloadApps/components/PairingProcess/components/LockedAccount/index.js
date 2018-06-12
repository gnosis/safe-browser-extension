import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getDecryptedEthAccount } from '../../containers/pairEthAccount'
import selector from './selector'

class LockedAccount extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const {
      selectEncryptedMnemonic,
      password,
      renderQrImageFrom,
    } = this.props

    const localAccount = getDecryptedEthAccount(selectEncryptedMnemonic, password)
    renderQrImageFrom(localAccount.getPrivateKey())
  }

  render() {
    return(
      <div></div>
    )
  }
}

export default connect(
  selector,
)(LockedAccount)
