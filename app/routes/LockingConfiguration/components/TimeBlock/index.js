import React from 'react'

import styles from 'assets/css/global.css'

const TimeBlock = ({
  handleOptionChange,
  minutes,
  minTime
}) => (
    <div className={styles.radio}>
      <input
        type='radio'
        name='timeout'
        value={`${minTime}`}
        checked={minutes === minTime}
        readOnly
      />
      <label onClick={handleOptionChange(minTime)}>
        {minTime}min {minTime === 5 && ' (default)'}
      </label>
    </div>
  )

export default TimeBlock
