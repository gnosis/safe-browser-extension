import React from 'react'
import classNames from 'classnames/bind'
import Button from 'components/layout/Button'
import Link from 'components/layout/Link'
import { CREATE_PASSWORD_URL } from 'routes/routes'
import {
  TERMS,
  REVIEW_TERMS,
  AGREE,
  NO_THANKS
} from '../../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Disclaimer = ({ showDisclaimer, toggleDisclaimer }) => (
  <div className={cx(styles.disclaimer, showDisclaimer ? styles.show : null)}>
    <span>
      <h2>{TERMS}</h2>
      <p>{REVIEW_TERMS}</p>
      <div className={styles.buttonsContainer}>
        <Button onClick={toggleDisclaimer} naked>
          {NO_THANKS}
        </Button>
        <Link to={CREATE_PASSWORD_URL}>
          <Button>{AGREE}</Button>
        </Link>
      </div>
    </span>
  </div>
)

export default Disclaimer
