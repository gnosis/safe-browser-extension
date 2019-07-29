import React from 'react'
import classNames from 'classnames/bind'
import styles from './style.css'

const cx = classNames.bind(styles)

const Paragraph = ({ color, className, ...props }) => (
  <p className={cx(styles.paragraph, className, color)} {...props} />
)

export default Paragraph
