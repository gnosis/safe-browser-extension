import React from 'react'
import classNames from 'classnames'
import Paragraph from 'components/layout/Paragraph'
import styles from './style.css'
import {
  WHITELISTED_SITE,
  RESTRICTED_SITE
} from '../../../../../../../config/messages'

const cx = classNames.bind(styles)

const Layout = ({
  showWhitelistedDappState,
  url,
  whitelisted,
  handleWhitelistDapp
}) => (
  <div className={styles.whitelister} data-whitelisted={whitelisted}>
    {url && showWhitelistedDappState && whitelisted !== undefined && (
      <React.Fragment>
        <Paragraph
          className={cx(styles.url, !whitelisted && styles.notWhitelisted)}
        >
          {url}
        </Paragraph>
        <Paragraph
          className={cx(styles.status, !whitelisted && styles.notWhitelisted)}
        >
          {whitelisted ? WHITELISTED_SITE : RESTRICTED_SITE}
        </Paragraph>
        <span className={styles.whitelistSwitch}>
          <label onClick={handleWhitelistDapp(url)}>
            <input type="checkbox" checked={whitelisted} readOnly />
            <span className={styles.track} />
            <span className={styles.knob} />
          </label>
        </span>
      </React.Fragment>
    )}
  </div>
)

export default Layout
