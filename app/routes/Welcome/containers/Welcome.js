import React, { Component } from 'react'

import Layout from '../components/Layout'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDisclaimer: false,
    }
  }

  toggleDisclaimer = () => {
    const { showDisclaimer } = this.state
    this.setState({ showDisclaimer: !showDisclaimer })
  }

  render() {
    const { showDisclaimer } = this.state

    return (
      <Layout
        showDisclaimer={showDisclaimer}
        toggleDisclaimer={this.toggleDisclaimer}
      />
    )
  }
}

export default Welcome
