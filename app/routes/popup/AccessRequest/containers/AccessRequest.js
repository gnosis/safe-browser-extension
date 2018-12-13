import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import messages from '../../../../../extension/utils/messages'
import selector from './selector'
import actions from './actions'

class AccessRequest extends Component {

  rejectAccessRequest = () => {
    chrome.runtime.sendMessage({
      msg: messages.MSG_REJECT_PROVIDER_REQUEST,
      detail: {
        error: 'Ethereum provider access rejected'
      }
    })
    window.close()
  }

  approveAccessRequest = () => {
    const {
      onApproveAccessRequest,
      providerRequest
    } = this.props

    chrome.runtime.sendMessage({
      msg: messages.MSG_APPROVE_PROVIDER_REQUEST
    })
    onApproveAccessRequest(providerRequest.origin)
    window.close()
  }

  render () {
    const {
      providerRequest,
      location
    } = this.props

    return (
      <Layout
        location={location}
        providerRequest={providerRequest}
        rejectAccessRequest={this.rejectAccessRequest}
        approveAccessRequest={this.approveAccessRequest}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onApproveAccessRequest: (origin) => dispatch(actions.approveAccessRequest(origin)),
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(AccessRequest)
