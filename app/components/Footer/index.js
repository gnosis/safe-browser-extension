import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const Footer = ({
  link,
  ready,
  nextLink
}) => (
    <footer>
      <Link to={link} className={cx(styles.btnBack, styles.active)}></Link>
      <ul className={styles.stepperDots}>
        <li></li>
        <li className={styles.active}></li>
      </ul>
      <Link to={nextLink} className={cx(styles.btnNext, ready ? styles.active : null)}>
        <p>Next</p>
      </Link>
    </footer>
  )

export default Footer
