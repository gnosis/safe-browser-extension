import React from 'react'
import classNames from 'classnames/bind'

import Header from 'components/Header'
import styles from './index.css'

const cx = classNames.bind(styles)

const Page = ({
  children,
  padding,
  ...props,
}) => {
  const classes = cx(
    styles.container,
    padding
  )

  return (
    <div>
      {!props.withoutHeader &&
        <Header
          account={props.account}
          logOut={props.logOut}
          settings={props.settings}
        />
      }
      <div className={classes}>
        {children}
      </div>
    </div>
  )
}

export default Page
