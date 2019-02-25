import React from 'react'
import classNames from 'classnames/bind'

import styles from 'assets/css/global.css'

const cx = classNames.bind(styles)

const HeaderPopup = ({
  title,
  reviewedElement,
  numElements,
  previousElement,
  elementNumber,
  nextElement
}) => (
  <React.Fragment>
    <span className={styles.PageHeader}>
      <h2>{title}</h2>
      {numElements > 1 && (
        <span className={styles.pagination}>
          <span onClick={previousElement} className={cx(
            styles.btnBack,
            (reviewedElement || elementNumber === 0) ? styles.hide : styles.active)
          } />
          <p><strong>{elementNumber + 1}</strong> of <strong>{numElements}</strong></p>
          <span to='#' onClick={nextElement} className={cx(
            styles.btnNext,
            (reviewedElement || elementNumber === (numElements - 1)) ? styles.hide : styles.active)
          } />
        </span>
      )}
    </span>
  </React.Fragment>
)

export default HeaderPopup
