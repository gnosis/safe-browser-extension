import React, { Component } from 'react'

import styles from 'assets/css/global.css'
import edit from 'assets/images/edit.svg'
import trashWhite from 'assets/images/trash_white.svg'
import identicon from 'assets/images/identicon.png'

class SafeItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editSafeAlias: false,
    }
  }

  toggleEditSafeAlias = () => {
    const { editSafeAlias } = this.state
    this.setState({ editSafeAlias: !editSafeAlias })
  }

  render() {
    const { editSafeAlias } = this.state

    return (
      <React.Fragment>
        <img src={identicon} height='24' width='24' />
        <span>
          <p contentEditable={editSafeAlias}>Tobias Funds</p>
          <small>0x034992...394942</small>
          <span className={styles.safeTools}>
            <button
              className={styles.safeToolsSave}
              onClick={this.toggleEditSafeAlias}
            >SAVE</button>
            <img
              src={edit}
              height='12'
              width='12'
              className={styles.safeToolsEdit}
              onClick={this.toggleEditSafeAlias}
            />
            <img
              src={trashWhite}
              height='12'
              width='12'
              className={styles.safeToolsDelete}
            />
          </span>
        </span>
      </React.Fragment>
    )
  }
}

export default SafeItem
