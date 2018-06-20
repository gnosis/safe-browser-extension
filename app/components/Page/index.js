import React from 'react'
import classNames from 'classnames/bind'

import Header from 'components/Header'
import SimpleHeader from 'components/SimpleHeader'
import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const header = (withoutHeader, simpleHeader, noBorder, properties) => {
  if (withoutHeader) {
    return
  }
  if (simpleHeader) {
    return <SimpleHeader noBorder={noBorder} />
  }
  return <Header properties={properties} />
}

const Page = ({
  page,
  withoutHeader,
  simpleHeader,
  noBorder,
  children,
  properties,
}) => (
    <div className={cx(styles.extension, page)}>
      <div className={styles.extensionInner}>
        {header(withoutHeader, simpleHeader, noBorder, properties)}
        {children}
      </div>
    </div>
  )

export default Page
