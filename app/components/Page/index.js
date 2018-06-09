import React from 'react'
import classNames from 'classnames/bind'

import Header from 'components/Header'
import SimpleHeader from 'components/SimpleHeader'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const header = (withoutHeader, simpleHeader, noBorder) => {
  if (withoutHeader) {
    return
  }
  if (simpleHeader) {
    return <SimpleHeader noBorder={noBorder} />
  }
  return <Header />
}

const Page = ({
  page,
  withoutHeader,
  simpleHeader,
  noBorder,
  children,
}) => (
    <div className={cx(styles.extension, page)}>
      <div className={styles.extensionInner}>
        {header(withoutHeader, simpleHeader, noBorder)}
        {children}
      </div>
    </div>
  )

export default Page
