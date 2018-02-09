import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addWhitelistedDApp, deleteWhitelistedDApp } from '../../actions/whitelistedDApps'

class WhitelistedDApps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newDApp: '',
    }
  }

  updateNewDapp(value) {
    this.setState({ newDApp: value })
  }

  handleAddDApp() {
    const newDApp = this.state.newDApp

    if (newDApp !== '') {
      this.props.onAddWhitelistedDApp(newDApp)
      this.setState({ newDApp: '' })
    }
  }

  handleDeleteDApp(dapp) {
    this.props.onDeleteWhitelistedDApp(dapp)
  }

  render() {
    const { newDApp } = this.state
    const { whitelistedDApps } = this.props

    return (
      <div>
        <input
          type='text'
          value={newDApp}
          onChange={(e) => this.updateNewDapp(e.target.value)} />

        <button onClick={() => this.handleAddDApp()}>Add DApp</button>

        <div>
          {whitelistedDApps.map((dapp) => (
            <div key={dapp} className='dapp'>
              <div className='name'>
                {dapp}
              </div>
              
              <button onClick={() => this.handleDeleteDApp(dapp)}>
                Delete
              </button>
              <div className='clean'></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ whitelistedDApps }, props) => {
  return {
    whitelistedDApps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWhitelistedDApp: (dapp) => dispatch(addWhitelistedDApp(dapp)),
    onDeleteWhitelistedDApp: (dapp) => dispatch(deleteWhitelistedDApp(dapp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitelistedDApps)