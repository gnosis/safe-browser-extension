import React, { Component } from 'react'
import { connect } from 'react-redux'
import wallet from 'ethereumjs-wallet'

class Account extends Component {
  componentWillMount() {
    const { password, v3 } = this.props.state

    const hdWallet = wallet.fromV3(v3, password)
    this.address = hdWallet.getChecksumAddressString()
  }

  render() {
    return (
      <div>
        Address: {this.address}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    state: state.account
  }
}

export default connect(
  mapStateToProps
)(Account)