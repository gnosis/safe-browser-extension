import React from 'react'
import classNames from 'classnames/bind'
import Link from 'components/layout/Link'
import { BACK } from '../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const ContentHeader = ({
  color = 'green',
  backLink,
  message,
  rightAction,
  rightMessage,
  rightStyle
}) => (
  <div className={cx(styles.contentHeader, color)}>
    <Link to={backLink} className={cx(styles.btnBack, styles.active, color)}>
      <p>{BACK}</p>
    </Link>
    {message && <h2>{message}</h2>}
    {rightMessage && (
      <p className={cx(styles.right, rightStyle)} onClick={rightAction()}>
        {rightMessage}
      </p>
    )}
  </div>
)

export default ContentHeader
