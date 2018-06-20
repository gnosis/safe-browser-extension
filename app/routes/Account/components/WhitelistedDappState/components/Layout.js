import React from 'react'

import styles from 'assets/css/global.css'

const Layout = ({
  url,
  whitelisted,
  whitelistedDapps,
  handleWhitelistDapp,
}) => (
    <div className={styles.whitelister} data-whitelisted={whitelisted}>
      {whitelisted !== undefined &&
        <React.Fragment>
          <p>{url}</p>
          <span className={styles.whitelistSwitch}>
            <label onClick={handleWhitelistDapp(url)}>
              <input type='checkbox' checked={whitelisted} readOnly/>
              <span className={styles.switch}></span>
              <span className={styles.toggle}></span>
            </label>
          </span>
        </React.Fragment>
      }
    </div>
  )

export default Layout
