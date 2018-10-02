import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Password from 'routes/extension/Password/containers/Password'
import Transaction from 'routes/popup/Transaction/containers/Transaction'
import 'assets/css/global.css'
import {
  PASSWORD_URL,
  TRANSACTION_URL
} from 'routes/routes'

class Popup extends Component {
  componentWillMount () {
    this.props.history.push(TRANSACTION_URL)
  }

  render () {
    return (
      <div>
        <Route exact path={PASSWORD_URL} component={Password} />
        <Route exact path={TRANSACTION_URL} component={Transaction} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    state
  }
}

export default withRouter(connect(
  mapStateToProps
)(Popup))
