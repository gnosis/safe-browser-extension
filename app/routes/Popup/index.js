import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import Password from 'routes/Password/containers/Password'
import ConfirmTransaction from 'routes/ConfirmTransaction/containers/ConfirmTransaction'
import 'routes/App/styles.css'

class Popup extends Component {
  componentWillMount() {
    const { account } = this.props.state
    const validAccount = account.secondFA && Object.keys(account.secondFA).length > 0 && account.lockedState
    const url = (validAccount)
      ? {
        pathname: '/password',
        state: {
          dest: '/confirm-transaction'
        }
      }
      : '/confirm-transaction'

    this.props.history.push(url)
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