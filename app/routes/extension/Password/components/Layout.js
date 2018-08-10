import React, { Component } from 'react'

import Page from 'components/Page'
import styles from 'assets/css/global.css'

class Layout extends Component {
  prevent = (e) => {
    e.preventDefault()
  }

  render () {
    const {
      password,
      updatePassword,
      validatePasswords,
      rotation,
      dataValidation
    } = this.props

    return (
      <Page
        page={styles.unlockSafe}
        withoutHeader
      >
        <div className={styles.content}>
          <span className={styles.safeLogo} data-network='rinkeby' />
          <span className={styles.lockshape} data-validation={dataValidation}>

            <svg id={styles.keyhole} width='18' height='34' viewBox='0 0 18 34' xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'>
              <defs>
                <path d='M61.071447,65.1415942 L58.3839642,82 L71.5550411,82 L68.8675583,65.1415942 C71.8636105,63.680578 73.9444444,60.5979764 73.9444444,57.0229805 C73.9444444,52.0405372 69.9266393,48 64.9722273,48 C60.0178153,48 56.0000102,52.0405372 56.0000102,57.0229805 C55.9946889,60.6033195 58.0700817,63.680578 61.0715832,65.1415942 L61.071447,65.1415942 Z'
                  id='path-1' />
                <filter x='-8.4%' y='-4.4%' width='116.7%' height='108.8%' filterUnits='objectBoundingBox'
                  id='filter-2'>
                  <feGaussianBlur stdDeviation='1.5' in='SourceAlpha' result='shadowBlurInner1'
                  />
                  <feOffset in='shadowBlurInner1' result='shadowOffsetInner1' />
                  <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic'
                    k2='-1' k3='1' result='shadowInnerInner1' />
                  <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.398097826 0'
                    in='shadowInnerInner1' />
                </filter>
              </defs>
              <g id='Browser-extension' fill='none' fillRule='evenodd'>
                <g id='10.-Password-unlock-screen' transform='translate(-335 -293)' fillRule='nonzero'>
                  <g id='#container' transform='translate(159 82)'>
                    <g id='browser-extension-door-hole-unlock' transform='translate(120 163)'>
                      <g id='Shape'>
                        <use fill='#A2A8BA' fillRule='evenodd' xlinkHref='#path-1' />
                        <use fill='#000' filter='url(#filter-2)' xlinkHref='#path-1' />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>

            <span className={styles.lockshape_dots} style={rotation} />
          </span>
          <form onSubmit={this.prevent} data-validation={dataValidation}>
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              name='unlock'
              onChange={updatePassword}
              className={styles.noborder}
              autoFocus
            />
            <button
              onClick={validatePasswords}
              className={styles.button}
            >
              UNLOCK
            </button>
          </form>
        </div>
      </Page>
    )
  }
}

export default Layout
