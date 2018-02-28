import React, { Component } from 'react'
import { connect } from 'react-redux'
import HdKey from 'ethereumjs-wallet/hdkey'
import Bip39 from 'bip39'
import CryptoJs from 'crypto-js'

import Header from 'components/Header'

import { createAccount } from 'actions/account'

class CreateAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirmPassword: '',
      errorMessage: '',
    }
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  updateConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value })
  }

  validatePasswords = () => {
    const { password, confirmPassword } = this.state

    if (!password || password.length < 10) {
      this.setState({ errorMessage: 'Password too short (min 10 chars)' })
      return false
    }

    if (password !== confirmPassword) {
      this.setState({ errorMessage: 'Passwords don\'t match' })
      return false
    }

    this.setState({ errorMessage: '' })
    return true
  }

  handleCreateAccount = () => {
    if (this.validatePasswords()) {
      const mnemonic = Bip39.generateMnemonic()
      const seed = Bip39.mnemonicToSeed(mnemonic)
      const hdWallet = HdKey.fromMasterSeed(seed)
      //console.log(mnemonic)

      // Get the first account using the standard hd path
      const walletHdPath = 'm/44\'/60\'/0\'/0'
      const address = hdWallet.derivePath(walletHdPath + '/0').getWallet().getChecksumAddressString()

      const encryptedSeed = CryptoJs.AES.encrypt(mnemonic, this.state.password)
      this.props.onCreateAccount(address, encryptedSeed.toString())

      this.props.history.push('/account')
    }
  }

  handleRestoreAccount = () => {
    if (this.validatePasswords()) {
      this.props.history.push({
        pathname: '/restore-account',
        password: this.state.password
      })
    }
  }

  render() {
    const { password, confirmPassword, errorMessage } = this.state

    return (
      <div>
        <Header />
        
        <div className='container'>
          <input
            type='password'
            placeholder='New password'
            value={password}
            onChange={this.updatePassword} />

          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={this.updateConfirmPassword} />

          {errorMessage &&
            <p>{errorMessage}</p>
          }

          <button onClick={this.handleCreateAccount}> Create account </button>

          <button onClick={this.handleRestoreAccount}> Restore account </button>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (address, seed) => dispatch(createAccount(address, seed))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateAccount)