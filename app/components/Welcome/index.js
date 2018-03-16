import React from 'react'
import { Link } from 'react-router-dom'

import Header from 'components/Header'
import Owl from 'assets/gnosis_owl.svg'

const Welcome = () => (
  <div>
    <Header />

    <div className='container'>
      <div className='title'>
        <Owl height={70}/>
      </div>

      <p>
        TO-DO: Text explaining the purpose of the chrome extension.
      </p>

      <Link to='/create-password'>
        <button>Continue</button>
      </Link>
    </div>
  </div>
)

export default Welcome