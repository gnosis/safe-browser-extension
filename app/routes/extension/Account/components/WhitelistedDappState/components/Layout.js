import React from 'react'
import styles from 'assets/css/global.css'

const Layout = ({
  showWhitelistedDappState,
  url,
  whitelisted,
  handleWhitelistDapp
}) => (
  <div className={styles.whitelister} data-whitelisted={whitelisted}>
    {showWhitelistedDappState && whitelisted !== undefined && (
      <React.Fragment>
        <p>{url}</p>
        <span className={styles.whitelistSwitch}>
          <label onClick={handleWhitelistDapp(url)}>
            <input type="checkbox" checked={whitelisted} readOnly />
            <span className={styles.switch} />
            <span className={styles.toggle} />
          </label>
        </span>
      </React.Fragment>
    )}
  </div>
)

export default Layout
