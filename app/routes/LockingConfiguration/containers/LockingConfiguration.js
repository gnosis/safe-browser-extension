import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Layout from '../components/Layout'
import actions from './actions'

class LockingConfiguration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minutes: props.account.lockingConfig
    }
  }

  handleOptionChange = (e) => {
    this.setState({ minutes: parseInt(e.target.value) })
  }

  handleSaveConfig = () => {
    this.props.onConfigureLocking(this.state.minutes)
  }

  render() {
    const { minutes } = this.state

    return (
      <Layout
        minutes={minutes}
        handleOptionChange={this.handleOptionChange}
        handleSaveConfig={this.handleSaveConfig}
      />
    )
  }
}

const mapStateToProps = ({ account }, props) => {
  return {
    account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConfigureLocking: (minutes) => dispatch(actions.configureLocking(minutes)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LockingConfiguration)
