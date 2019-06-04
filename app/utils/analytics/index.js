import React, { Component } from 'react'

const GOOGLE_ANALYTICS_URL = 'https://ssl.google-analytics.com/ga.js'

export const ga = (...args) => {
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
    const { NODE_ENV, NETWORK } = process.env
    let gaTrackingId

    if (NODE_ENV === 'production') {
      gaTrackingId = (NETWORK === 'mainnet')
          ? process.env.PRODUCTION_MAINNET_GA_TRACKING_ID
          : process.env.PRODUCTION_RINKEBY_GA_TRACKING_ID
    }

    ga(['_setAccount', gaTrackingId])
    ga(['_trackPageview'])
  }
}
loadGoogleAnalytics()

export const withAnalytics = (WrappedComponent, options = {}) => {
  const HOC = class extends Component {
    componentDidMount() {
      ga(['_trackPageview'])
    }

    componentWillReceiveProps(nextProps) {
      const nextPage = nextProps.location.pathname
      const currentPage =
        (this.props.location && this.props.location.pathname) ||
        window.location.pathname

      if (currentPage !== nextPage) {
        ga(['_trackPageview'])
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}
