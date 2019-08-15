import React, { Component } from 'react'
import Paragraph from 'components/layout/Paragraph'
import TextInput from 'components/forms/TextInput'
import {
  PASSWORD_DOESNT_MATCH,
  CONFIRM_PASSWORD
} from '../../../../../../../config/messages'
import styles from './style.css'

class Layout extends Component {
  render() {
    const {
      confirmPassword,
      updateConfirmPassword,
      passwordsMatch
    } = this.props

    const filled = confirmPassword !== ''
    const dataValidation = filled ? (!passwordsMatch ? 'ERROR' : 'OK') : ''
    const requirementStyle = filled ? 'red' : 'green'

    return (
      <React.Fragment>
        <TextInput
          type="password"
          placeholder={CONFIRM_PASSWORD}
          value={confirmPassword}
          onChange={updateConfirmPassword}
          dataValidation={dataValidation}
        />
        {!passwordsMatch && (
          <Paragraph
            className={styles.requirement}
            color={filled && requirementStyle}
          >
            {PASSWORD_DOESNT_MATCH}
          </Paragraph>
        )}
      </React.Fragment>
    )
  }
}

export default Layout
