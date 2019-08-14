import React from 'react'
import classNames from 'classnames/bind'
import styles from './style.css'

const cx = classNames.bind(styles)

const Paragraph = ({ color, bold, className, ...props }) => (
  <p
    className={cx(styles.paragraph, bold && styles.bold, color, className)}
    {...props}
  />
)

export default Paragraph
