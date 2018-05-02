import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUnencryptedEthAccount } from '../../containers/pairEthAccount'
import selector from './selector'

class UnlockedAccount extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const {
      selectUnencryptedMnemonic,
      renderQrImageFrom,
    } = this.props

    const localAccount = getUnencryptedEthAccount(selectUnencryptedMnemonic)
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
)(UnlockedAccount)
