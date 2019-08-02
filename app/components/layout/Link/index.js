import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './style.css'

const cx = classNames.bind(styles)

const AuthenticatorLink = ({ className, externalLink, ...props }) => (
  <Link
    className={cx(styles.link, className, externalLink && styles.externalLink)}
    {...props}
  />
)

export default AuthenticatorLink
