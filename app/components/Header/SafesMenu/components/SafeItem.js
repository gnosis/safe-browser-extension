import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from 'assets/css/global.css'
import edit from 'assets/images/edit.svg'
import trashWhite from 'assets/images/trash_white.svg'
import identicon from 'assets/images/identicon.png'
import actions from './actions'

class SafeItem extends Component {
  constructor(props) {
    super(props)

    this.aliasRef = React.createRef()

    this.state = {
      editSafeAlias: false,
    }
  }

  showEditSafeAlias = () => {
    this.setState({ editSafeAlias: true })
  }

  saveEditSafeAlias = (address) => (e) => {
    e.stopPropagation()
    const { onUpdateSafeAlias } = this.props
    const alias = this.aliasRef.current.textContent

    if (!alias) {
      return
    }
    this.setState({ editSafeAlias: false })
    onUpdateSafeAlias(address, alias)
  }

  render() {
    const { editSafeAlias } = this.state
    const {
      removeSafe,
      address,
      alias,
    } = this.props

    const addressDisplayed = address.substring(0, 8) + '...' + address.substring(address.length - 6, address.length)
    return (
      <React.Fragment>
        <img src={identicon} height='24' width='24' />
        <span>
          <p contentEditable={editSafeAlias} ref={this.aliasRef}>{alias}</p>
          <small>{addressDisplayed}</small>
          <span className={styles.safeTools}>
            <button
              className={styles.safeToolsSave}
              onClick={this.saveEditSafeAlias(address)}
            >SAVE</button>
            <img
              src={edit}
              height='12'
              width='12'
              className={styles.safeToolsEdit}
              onClick={this.showEditSafeAlias}
            />
            <img
              src={trashWhite}
              height='12'
              width='12'
              className={styles.safeToolsDelete}
              onClick={removeSafe(address)}
            />
          </span>
        </span>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSafeAlias: (address, alias) => dispatch(actions.updateSafeAlias(address, alias))
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(SafeItem)
