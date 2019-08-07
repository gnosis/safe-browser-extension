import React from 'react'
import Paragraph from 'components/layout/Paragraph'
import RadioInput from 'components/forms/RadioInput'
import {
  LOCKING_MIN,
  LOCKING_MIN_DEFAULT
} from '../../../../../../config/messages'

const TimeBlock = ({ handleOptionChange, minutes, minTime }) => (
  <RadioInput name="timeout" value={`${minTime}`} checked={minutes === minTime}>
    <Paragraph onClick={handleOptionChange(minTime)}>
      {minTime}
      &nbsp;
      {LOCKING_MIN}
      {minTime === 5 && LOCKING_MIN_DEFAULT}
    </Paragraph>
  </RadioInput>
)

export default TimeBlock
