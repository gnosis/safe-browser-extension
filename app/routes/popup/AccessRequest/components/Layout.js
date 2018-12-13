import React from 'react'
import classNames from 'classnames/bind'

import Header from 'components/Header'
import FooterButtons from 'components/Footers/FooterButtons/containers'
import { ACCESS_REQUEST_URL } from 'routes/routes'
import styles from 'assets/css/global.css'
import {
  REJECT,
  APPROVE
} from '../../../../../config/messages'

const cx = classNames.bind(styles)

const Layout = ({
  location,
  providerRequest,
  rejectAccessRequest,
  approveAccessRequest
}) => (
  <div className={styles.extensionPopup}>
    <div className={styles.extensionInner}>
      <Header
        noBorder
        txReview
        location={location}
      />
      <div className={styles.Page}>
        <div className={styles.accessRequest}>
          <br /><br /><br /><br /><br />
          <h2>{providerRequest.origin}</h2>
          <br /><br />
          <h2>{providerRequest.title}</h2>
          <br /><br />
          <img src={providerRequest.image} />
        </div>
        <FooterButtons
          nextUrl={ACCESS_REQUEST_URL}
          rejectionText={REJECT}
          confirmationText={APPROVE}
          handleRejection={rejectAccessRequest}
          handleConfirmation={approveAccessRequest}
        />
      </div>
    </div>
  </div>
)

export default Layout
