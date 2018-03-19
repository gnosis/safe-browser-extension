import React from 'react'
import { Link } from 'react-router-dom'

import ContentPage from 'components/ContentPage'
import gnosisOwl from 'assets/gnosis_owl.svg'
import styles from './index.css'

const Welcome = () => (
  <ContentPage>
    <div className={styles.title}>
      <img src={gnosisOwl} height={70} />
    </div>

    <p>
      TO-DO: Text explaining the purpose of the chrome extension.
    </p>

    <Link to='/download-apps'>
      <button>Continue</button>
    </Link>
  </ContentPage>
)

export default Welcome