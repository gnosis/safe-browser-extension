import React from 'react'
import Layout from '../components/Layout'
import { getAppVersionNumber } from '../../../../../config'

const About = ({ location }) => {
  const versionNumber = getAppVersionNumber()

  return <Layout versionNumber={versionNumber} location={location} />
}

export default About
