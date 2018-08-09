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
    ga(['_trackPageview'])
  }
}
loadGoogleAnalytics()

const withTracker = (WrappedComponent, options = {}) => {
  const HOC = class extends Component {
    componentDidMount () {
      ga(['_trackPageview'])
    }

    componentWillReceiveProps (nextProps) {
      const nextPage = nextProps.location.pathname
      const currentPage = (this.props.location && this.props.location.pathname) || window.location.pathname

      if (currentPage !== nextPage) {
        ga(['_trackPageview'])
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export default withTracker
