import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Password from 'routes/extension/Password/containers/Password'
import Transaction from 'routes/popup/Transaction/containers/Transaction'
import 'assets/css/global.css'

class Popup extends Component {
  componentWillMount () {
    this.props.history.push('/transaction')
  }

  render () {
    return (
      <div>
        <Route exact path='/password' component={Password} />
        <Route exact path='/transaction' component={Transaction} />
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
