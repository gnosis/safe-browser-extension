import React from 'react'

import styles from 'assets/css/global.css'
import {
  LOCKING_MIN,
  LOCKING_MIN_DEFAULT
} from '../../../../../../config/messages'

const TimeBlock = ({ handleOptionChange, minutes, minTime }) => (
  <div className={styles.radio}>
    <input
      type="radio"
      name="timeout"
      value={`${minTime}`}
      checked={minutes === minTime}
      readOnly
    />
    <label onClick={handleOptionChange(minTime)}>
      {minTime}
      {LOCKING_MIN} {minTime === 5 && LOCKING_MIN_DEFAULT}
    </label>
  </div>
)

export default TimeBlock
