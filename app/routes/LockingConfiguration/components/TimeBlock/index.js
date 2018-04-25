import React from 'react'
import styles from './index.css'

const TimeBlock = ({ handleOptionChange, minutes, minTime }) => (
  <div className={styles.timeBlock}>
    <input
      type='radio'
      value={`${minTime}`}
      checked={minutes === minTime}
      onChange={handleOptionChange}
    />
    {minTime}min {minTime === 5 && ' (default)'}
  </div>
)

export default TimeBlock
