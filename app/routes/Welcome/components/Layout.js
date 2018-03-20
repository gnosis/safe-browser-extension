import React from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import gnosisOwl from 'assets/gnosis_owl.svg'
import styles from './index.css'

const Layout = () => (
  <Page withoutHeader>
    <div className={styles.title}>
      <img src={gnosisOwl} height={70} />
    </div>

    <p>
      TO-DO: Text explaining the purpose of the chrome extension.
    </p>

    <Link to='/download-apps'>
      <button>Continue</button>
    </Link>
  </Page>
)

export default Layout
