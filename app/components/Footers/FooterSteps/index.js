import React from 'react'
import classNames from 'classnames/bind'
import Link from 'components/layout/Link'
import { NEXT } from '../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const FooterSteps = ({ isReady, firstStep, secondStep, link, nextLink }) => (
  <footer>
    <Link
      to={link}
      className={cx(styles.link, styles.btnBack, styles.active)}
    />
    <ul className={styles.stepperDots}>
      <li className={firstStep && styles.active} />
      <li className={secondStep && styles.active} />
    </ul>
    <Link
      to={nextLink}
      className={cx(styles.link, styles.btnNext, isReady && styles.active)}
    >
      <p>{NEXT}</p>
    </Link>
  </footer>
)

export default FooterSteps
