import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import selector from './selector'

const ViewMessage = ({ signMessages, location }) => (
  <Layout signMessages={signMessages} location={location} />
)

export default connect(selector)(ViewMessage)
