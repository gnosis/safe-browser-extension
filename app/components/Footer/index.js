import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actionURL: ''
    }
  }

  handleButton = (link) => (e) => {
    this.setState({ actionURL: link })
  }

  render = () => {
    const {
      link,
      ready,
      firstStep,
      secondStep,
      nextLink
    } = this.props
    const { actionURL } = this.state

    if (actionURL !== '') {
      return <Redirect to={actionURL} />
    }
    return (
      <footer>
        <button
          onClick={this.handleButton(link)}
          className={cx(styles.btnBack, styles.active)}
          type='button'
        />
        <ul className={styles.stepperDots}>
          <li className={firstStep && styles.active} />
          <li className={secondStep && styles.active} />
        </ul>
        <button
          onClick={this.handleButton(nextLink)}
          className={cx(styles.btnNext, ready && styles.active)}
        >
          <p>Next</p>
        </button>
      </footer>
    )
  }
}

export default Footer
