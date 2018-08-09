import React, { Component } from 'react'

import config from '../../config'

const GOOGLE_ANALYTICS_URL = 'https://ssl.google-analytics.com/ga.js'

const ga = (...args) => {
  var _gaq = window._gaq || []
  _gaq.push(...args)
}

const loadGoogleAnalytics = () => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = GOOGLE_ANALYTICS_URL
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)

  script.onload = () => {
    ga(['_setAccount', config.gaTrackingId])
  }
}
loadGoogleAnalytics()

const withTracker = (WrappedComponent, options = {}) => {
  const HOC = class extends Component {
    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export default withTracker
