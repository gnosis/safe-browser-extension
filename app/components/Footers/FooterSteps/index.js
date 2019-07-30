import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router'
import Button from 'components/layout/Button'
import { NEXT } from '../../../../config/messages'
import styles from './style.css'

const cx = classNames.bind(styles)

const FooterSteps = ({ isReady, firstStep, secondStep, link, nextLink }) => {
  const [actionURL, setActionURL] = useState(null)

  const handleButton = (link) => (e) => {
    setActionURL(link)
  }

  if (actionURL) {
    return <Redirect to={actionURL} />
  }
  return (
    <footer>
      <Button
        onClick={handleButton(link)}
        className={cx(styles.button, styles.btnBack, styles.active)}
        type="button"
      />
      <ul className={styles.stepperDots}>
        <li className={firstStep && styles.active} />
        <li className={secondStep && styles.active} />
      </ul>
      <Button
        onClick={handleButton(nextLink)}
        className={cx(styles.button, styles.btnNext, isReady && styles.active)}
      >
        <p>{NEXT}</p>
      </Button>
    </footer>
  )
}

export default FooterSteps
