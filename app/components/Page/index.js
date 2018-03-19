import React from 'react'

import Header from 'components/Header'

const Page = (props) => (
  <div>
    <Header
      logOut={props.logOut}
      whitelist={props.whitelist}
    />

    {props.children}
  </div>
)

export default Page