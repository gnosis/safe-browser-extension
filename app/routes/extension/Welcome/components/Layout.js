import React from 'react'
import classNames from 'classnames/bind'
import Button from 'components/layout/Button'
import Disclaimer from './Disclaimer'
import { GET_STARTED, SLOGAN } from '../../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const Layout = ({ showDisclaimer, toggleDisclaimer }) => (
  <div className={cx(styles.extension, styles.welcome)}>
    <div className={styles.extensionInner}>
      <div className={styles.content}>
        <span className={cx(styles.safeLogo, styles.animated, styles.fadeInUp)}>
          <span className={styles.safeTitle} />
          <span className={styles.authTitle}>Authenticator</span>
        </span>
        <h1>{SLOGAN}</h1>
        <Button onClick={toggleDisclaimer}>{GET_STARTED}</Button>
      </div>
    </div>
    <Disclaimer
      showDisclaimer={showDisclaimer}
      toggleDisclaimer={toggleDisclaimer}
    />
  </div>
)

export default Layout
