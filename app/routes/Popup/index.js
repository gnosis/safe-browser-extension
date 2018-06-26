import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Password from 'routes/Password/containers/Password'
import ConfirmTransaction from 'routes/ConfirmTransaction/containers/ConfirmTransaction'
import 'assets/css/global.css'

class Popup extends Component {
  componentWillMount() {
    this.props.history.push('/confirm-transaction')
  }

  render() {
    return (
      <div>
        <Route exact path='/password' component={Password} />
        <Route exact path='/confirm-transaction' component={ConfirmTransaction} />
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
