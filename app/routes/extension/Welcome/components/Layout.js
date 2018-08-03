import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const Layout = ({
  showDisclaimer,
  toggleDisclaimer
}) => (
  <div className={cx(styles.extension, styles.welcome)}>
    <div className={styles.extensionInner}>
      <div className={styles.content}>
        <span className={cx(styles.safeLogo, styles.animated, styles.fadeInUp)} />
        <h1>Safely store Ether and ERC20 tokens with 2-factor authentication.</h1>
        <button onClick={toggleDisclaimer} className={cx(styles.button, styles.round)}>
          GET STARTED
        </button>
      </div>
    </div>
    <div className={cx(styles.disclaimer, showDisclaimer ? styles.show : null)}>
      <span>
        <h2>Terms</h2>
        <p>By continuing you accept and agree with the <a href='https://safe.gnosis.io/terms' target='_blank'>Terms of Use</a> and and <a href='https://safe.gnosis.io/privacy' target='_blank'>Privacy Policy</a>.</p>
        <div>
          <button onClick={toggleDisclaimer} className={cx(styles.button, styles.naked)}>NO THANKS</button>
          <Link to='/create-password' className={styles.button}>AGREE</Link>
        </div>
      </span>
    </div>
  </div>
)

export default Layout
