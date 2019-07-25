import React, { useState } from 'react'
import Layout from '../components/Layout'

const Welcome = () => {
  const [disclaimerVisibility, setDisclaimerVisibility] = useState(false)

  const toggleDisclaimer = () => {
    setDisclaimerVisibility(prevDisclaimerVisibility => !prevDisclaimerVisibility)
  }

  return (
    <Layout
      showDisclaimer={disclaimerVisibility}
      toggleDisclaimer={toggleDisclaimer}
    />
  )
}

export default Welcome
