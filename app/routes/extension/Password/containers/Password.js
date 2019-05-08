import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import CryptoJs from 'crypto-js'
import {
  setUpNotifications,
  authPushNotificationService
} from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairingNotifications'
import { getDecryptedEthAccount } from 'routes/extension/DownloadApps/components/PairingProcess/containers/pairEthAccount'
import actions from './actions'
import selector from './selector'
import Layout from '../components/Layout'

class Password extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      errorMessage: '',
      continue: false,
      dataValidation: '',
      rotation: { 'transform': 'rotate(0deg)' }
    }
  }

  updatePassword = (e) => {
    const currentPassword = e.target.value
    const rotateRandom = [15, 30, -45, 120, 230, -10]
    const rotation = {
      'transform': 'rotate(' + rotateRandom[Math.floor(Math.random() * rotateRandom.length)] + 'deg)'
    }

    this.setState({
      password: currentPassword,
      rotation
    })
  }

  validatePasswords = async () => {
    const { password } = this.state
    const { account } = this.props
    const encryptedSeed = account.secondFA.seed
    const decryptedHmac = CryptoJs.HmacSHA256(encryptedSeed, CryptoJs.SHA256(password)).toString()

    if (decryptedHmac === account.secondFA.hmac) {
      this.setState({ dataValidation: 'OK' })
      await this.notifyVersionUpdate()

      setTimeout(() => {
        this.setState({ continue: true })
      }, 500)
      return
    }

    this.setState({ dataValidation: 'ERROR' })
    setTimeout(() => {
      this.setState({ dataValidation: '' })
    }, 500)
  }

  notifyVersionUpdate = async () => {
    const { password } = this.state
    const {
      device,
      notifyDeviceUpdated,
      selectEncryptedMnemonic
    } = this.props

    if (!device.lastUpdateNotified && password && selectEncryptedMnemonic) {
      try {
        const currentAccount = getDecryptedEthAccount(selectEncryptedMnemonic, password)
        const token = await setUpNotifications()
        const auth = await authPushNotificationService(token, [currentAccount])
        if (token && auth) {
          notifyDeviceUpdated()
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  render () {
    const {
      password,
      rotation,
      dataValidation,
    } = this.state

    if (this.state.continue) {
      return <Redirect to={{
        pathname: this.props.location.state.dest,
        state: {
          ...this.props.location.state,
          password
        }
      }} />
    }

    return (
      <Layout
        password={password}
        updatePassword={this.updatePassword}
        validatePasswords={this.validatePasswords}
        dataValidation={dataValidation}
        rotation={rotation}
        location={this.props.location}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    notifyDeviceUpdated: () => dispatch(actions.notifyDeviceUpdated())
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(Password)
