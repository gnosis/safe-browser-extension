import React from 'react'
import { Link } from 'react-router-dom'
import styles from './style.css'

const AuthenticatorLink = ({ ...props }) => (
  <Link className={styles.link} {...props} />
)

export default AuthenticatorLink