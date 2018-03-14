import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import ConfirmTransaction from 'components/ConfirmTransaction'

class Popup extends Component {

  render() {
    return (
      <ConfirmTransaction />
    )
  }
}

export default Popup