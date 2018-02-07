import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import { restoreAccount } from '../../actions/account'

class RestoreAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mnemonic: '',
      errorMessage: '',
    }
  }

  updateMnemonic(mnemonic) {
    this.setState({ mnemonic })
  }

  handleRestoreAccount() {
    const { mnemonic, errorMessage } = this.state

    if (Bip39.validateMnemonic(mnemonic)) {
      const hdWallet = HdKey.fromMasterSeed(Bip39.mnemonicToSeed(mnemonic))

      // Get the first account using the standard hd path
      const walletHdPath = 'm/44\'/60\'/0\'/0'
      const v3 = hdWallet.derivePath(walletHdPath + '0').getWallet().toV3(this.props.account.password)

      //chrome.storage.local.set({'gnosisSafeWallet': v3}, function() {})
      this.props.onRestoreAccount(this.props.account.password, v3)

      this.props.history.push('/account')
    }
    else
      this.setState({ errorMessage: 'Invalid word phrase' })
  }

  render() {
    const { mnemonic, errorMessage } = this.state

    return (
      <div>
        <textarea
          type="text"
          placeholder="Secret twelve word phrase"
          value={mnemonic}
          onChange={(e) => this.updateMnemonic(e.target.value)} />

        <p>{errorMessage}</p>

        <button onClick={(e) => this.handleRestoreAccount()}>Restore account</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRestoreAccount: (password, v3) => dispatch(restoreAccount(password, v3))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestoreAccount)