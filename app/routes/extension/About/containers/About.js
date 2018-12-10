import React, { Component } from 'react'

import Layout from '../components/Layout'
import { getVersion } from '../../../../../config'

class About extends Component {
  componentWillMount = () => {
    this.versionNumber = getVersion()
  }

  render () {
    return (
      <Layout
        versionNumber={this.versionNumber}
        location={this.props.location}
      />
    )
  }
}

export default About
