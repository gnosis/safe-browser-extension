import React from 'react'
import classNames from 'classnames'
import Link from 'components/layout/Link'
import { BACK } from '../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const ContentHeader = ({
  backLink,
  message,
  rightAction,
  rightMessage,
  rightStyle,
  passwordBack
}) => (
  <span
    className={cx(styles.contentHeader, passwordBack && styles.transparent)}
  >
    <Link
      to={backLink}
      className={cx(
        styles.btnBack,
        passwordBack && styles.passwordBack,
        styles.active
      )}
    >
      <p>{BACK}</p>
    </Link>
    {message && <h2>{message}</h2>}
    {rightMessage && (
      <p className={cx(styles.right, rightStyle)} onClick={rightAction()}>
        {rightMessage}
      </p>
    )}
  </span>
)

export default ContentHeader
