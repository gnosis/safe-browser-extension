import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'
import { CREATE_PASSWORD_URL } from 'routes/routes'
import { getNetwork } from '../../../../../config'
import {
  EXTENSION_STORE_DESCRIPTION,
  GET_STARTED,
  TERMS,
  REVIEW_TERMS,
  AGREE,
  TERMS_FIRST_BULLET,
  TERMS_SECOND_BULLET,
  NO_THANKS,
  PERSONAL_EDITION
} from '../../../../../config/messages'

const cx = classNames.bind(styles)

const Layout = ({ showDisclaimer, toggleDisclaimer }) => (
  <div className={cx(styles.extension, styles.welcome)}>
    <div className={styles.extensionInner}>
      <div className={cx(styles.content, showDisclaimer && styles.blur)}>
        <span
          className={cx(styles.safeLogo, styles.animated, styles.fadeInUp)}
          data-network={getNetwork()}
        >
          <span className={styles.edition}>{PERSONAL_EDITION}</span>
        </span>
        <h1>{EXTENSION_STORE_DESCRIPTION}</h1>
        <button
          onClick={toggleDisclaimer}
          className={cx(styles.button, styles.round)}
        >
          {GET_STARTED}
        </button>
      </div>
    </div>
    <div className={cx(styles.disclaimer, showDisclaimer ? styles.show : null)}>
      <span>
        <h2>{TERMS}</h2>
        <p>
          {REVIEW_TERMS}
          <ul>
            <li>{TERMS_FIRST_BULLET}</li>
            <li>{TERMS_SECOND_BULLET}</li>
          </ul>
        </p>
        <div>
          <button
            onClick={toggleDisclaimer}
            className={cx(styles.button, styles.naked)}
          >
            {NO_THANKS}
          </button>
          <Link to={CREATE_PASSWORD_URL} className={styles.button}>
            {AGREE}
          </Link>
        </div>
      </span>
    </div>
  </div>
)

export default Layout
