import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Header from 'components/Header'

import { restoreAccount } from 'actions/account'

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
    const { password } = this.props.location

    if (Bip39.validateMnemonic(mnemonic)) {
      const seed = Bip39.mnemonicToSeed(mnemonic)
      const hdWallet = HdKey.fromMasterSeed(seed)

      // Get the first account using the standard hd path
      const walletHdPath = 'm/44\'/60\'/0\'/0'
      const address = hdWallet.derivePath(walletHdPath + '/0').getWallet().getChecksumAddressString()

      const encryptedSeed = CryptoJs.AES.encrypt(mnemonic, password)
      this.props.onRestoreAccount(address, encryptedSeed.toString())

      this.props.history.push('/account')
    }
    else
      this.setState({ errorMessage: 'Invalid word phrase' })
  }

  render() {
    const { mnemonic, errorMessage } = this.state

    return (
      <div>
        <Header />
        
        <div className='container'>
          <textarea
            type="text"
            placeholder="Secret twelve word phrase"
            value={mnemonic}
            onChange={(e) => this.updateMnemonic(e.target.value)} />

          {errorMessage &&
            <p>{errorMessage}</p>
          }

          <button onClick={(e) => this.handleRestoreAccount()}>Restore account</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRestoreAccount: (address, seed) => dispatch(restoreAccount(address, seed))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RestoreAccount)