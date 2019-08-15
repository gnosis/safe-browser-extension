import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blockie from 'components/Blockie'
import edit from 'assets/images/edit.svg'
import trashWhite from 'assets/images/trash_white.svg'
import actions from './actions'
import { SAVE } from '../../../../../../../config/messages'
import styles from '../style.css'

const SafeItem = ({ removeSafe, address, alias, onUpdateSafeAlias }) => {
  const [editSafeAlias, setEditSafeAlias] = useState(false)

  const aliasRef = React.createRef()
  const addressDisplayed =
    address.substring(0, 8) +
    '...' +
    address.substring(address.length - 6, address.length)

  const handleSafeAliasClick = (e) => {
    if (editSafeAlias) {
      e.stopPropagation()
    }
  }

  const showEditSafeAlias = (e) => {
    e.stopPropagation()
    setEditSafeAlias(true)
  }

  const saveEditSafeAlias = (address) => (e) => {
    e.stopPropagation()
    const trimAlias = aliasRef.current.textContent.trim()
    aliasRef.current.textContent = trimAlias
    const alias = trimAlias

    if (!alias) {
      return
    }
    setEditSafeAlias(false)
    onUpdateSafeAlias(address, alias)
  }

  const placeCursorAtEnd = (element) => {
    if (
      typeof window.getSelection !== 'undefined' &&
      typeof document.createRange !== 'undefined'
    ) {
      const range = document.createRange()
      range.selectNodeContents(element)
      range.collapse(false)
      const sElement = window.getSelection()
      sElement.removeAllRanges()
      sElement.addRange(range)
    } else if (typeof document.body.createTextRange !== 'undefined') {
      const textRange = document.body.createTextRange()
      textRange.moveToElementText(element)
      textRange.collapse(false)
      textRange.select()
    }
  }

  const handleSafeAliasLength = () => {
    const alias = aliasRef.current.textContent
    if (alias.length > 30) {
      aliasRef.current.textContent = alias.substring(0, 30)
      placeCursorAtEnd(aliasRef.current)
    }
  }

  return (
    <React.Fragment>
      <div className={styles.identicon}>
        <Blockie address={address} diameter={24} />
      </div>
      <span>
        <p
          contentEditable={editSafeAlias}
          ref={aliasRef}
          onInput={handleSafeAliasLength}
          onClick={handleSafeAliasClick}
        >
          {alias}
        </p>
        <small>{addressDisplayed}</small>
        <span className={styles.safeTools}>
          <button
            className={styles.safeToolsSave}
            onClick={saveEditSafeAlias(address)}
          >
            {SAVE}
          </button>
          <img
            src={edit}
            height="12"
            width="12"
            className={styles.safeToolsEdit}
            onClick={showEditSafeAlias}
          />
          <img
            src={trashWhite}
            height="12"
            width="12"
            className={styles.safeToolsDelete}
            onClick={removeSafe(address)}
          />
        </span>
      </span>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSafeAlias: (address, alias) =>
      dispatch(actions.updateSafeAlias(address, alias))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SafeItem)
