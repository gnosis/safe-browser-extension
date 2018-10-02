import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

class Footer extends Component {
  render = () => {
    const {
      ready,
      firstStep,
      secondStep,
      link,
      nextLink
    } = this.props

    return (
      <footer>
        <Link
          to={link}
          className={cx(styles.btnBack, styles.active)}
          type='button'
        />
        <ul className={styles.stepperDots}>
          <li className={firstStep && styles.active} />
          <li className={secondStep && styles.active} />
        </ul>
        <Link
          to={nextLink}
          className={cx(styles.btnNext, ready && styles.active)}
        >
          <p>Next</p>
        </Link>
      </footer>
    )
  }
}

export default Footer
