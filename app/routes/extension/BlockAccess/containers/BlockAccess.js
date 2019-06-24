import React, { Component } from 'react'
import Layout from '../components/Layout'

class BlockAccess extends Component {
  render() {
    const { location } = this.props
    return (
      <Layout location={location} />
    )
  }
}

export default BlockAccess
