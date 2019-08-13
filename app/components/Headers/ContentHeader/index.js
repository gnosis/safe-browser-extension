import React from 'react'
import classNames from 'classnames'
import Link from 'components/layout/Link'
import { BACK } from '../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const ContentHeader = ({ backLink, message, rightAction, rightMessage, rightStyle }) => (
  <span className={styles.contentHeader}>
    <Link to={backLink} className={cx(styles.btnBack, styles.active)}>
      <p>{BACK}</p>
    </Link>
    <h2>{message}</h2>
    {rightMessage && (
      <p className={cx(styles.right, rightStyle)} onClick={rightAction()}>
        {rightMessage}
      </p>
    )}
  </span>
)

export default ContentHeader
