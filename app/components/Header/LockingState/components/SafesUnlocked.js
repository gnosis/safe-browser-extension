import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from 'assets/css/global.css'

class SafesUnlocked extends Component {
  constructor(props) {
    super(props)

    this.autoLockInterval = this.props.account.autoLockInterval
    const diffSeconds = this.setTime(this.autoLockInterval)
    this.state = {
      time: this.secondsToTime(diffSeconds),
      seconds: diffSeconds,
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(
      this.countDown,
      1000
    )
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  setTime = (autoLockInterval) => {
    this.initDate = new Date(this.props.account.unlockingTime).getTime()
    this.endDate = new Date(this.initDate + (autoLockInterval * 60000))
    this.now = new Date()
    const diffSeconds = Math.trunc(Math.abs(this.endDate - this.now) / 1000)

    return diffSeconds
  }

  secondsToTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const secondsLeft = secs % 60
    const seconds = Math.ceil(secondsLeft)

    return {
      minutes,
      seconds,
    }
  }

  countDown = () => {
    const newAutoLockInterval = this.props.account.autoLockInterval

    if (this.autoLockInterval !== newAutoLockInterval) {
      this.autoLockInterval = newAutoLockInterval
      const seconds = this.setTime(newAutoLockInterval)
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      })
      return
    }
    this.setState((prevState) => ({
      time: this.secondsToTime(prevState.seconds - 1),
      seconds: (prevState.seconds - 1)
    }))
  }

  render() {
    const { handleLockAccount } = this.props
    const { minutes, seconds } = this.state.time

    const minutesString = (minutes < 10) ? '0' + minutes.toString() : minutes.toString()
    const secondsString = (seconds < 10) ? '0' + seconds.toString() : seconds.toString()
    const timeoutString = minutesString + 'm ' + secondsString + 's'

    return (
      <span
        className={styles.lockedState}
        onClick={handleLockAccount}
        data-locked='false'
        data-timeout={timeoutString}
      >
      </span>
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account
  }
}

export default connect(
  mapStateToProps,
)(SafesUnlocked)
