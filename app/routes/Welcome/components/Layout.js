import React from 'react'
import { Link } from 'react-router-dom'

import Page from 'components/Page'
import gnosisOwl from 'assets/gnosis_owl.svg'
import styles from './index.css'

const Layout = () => (
  <Page withoutHeader>
    <div className={styles.header}>
      <img src={gnosisOwl} height={70} />
      <div className={styles.title}>
        <h1>Gnosis Safe</h1>
        <h2>Personal Edition</h2>
      </div>
    </div>

    <div className={styles.textContent}>
      Wallet to store your Ether and other ERC20 tokens secured by 2-factor authentication.
    </div>

    <Link to='/download-apps'>
      <button>CONTINUE</button>
    </Link>
  </Page>
)

export default Layout
