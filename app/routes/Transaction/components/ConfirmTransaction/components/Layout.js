import React, { Component } from 'react'

import FooterTransactions from 'routes/Transaction/components/Transaction/FooterTransactions'

class Layout extends Component {
  render() {
    const {
      unlockRequest,
      reviewedTx,
      handleConfirmTransaction,
      handleRejectTransaction,
      type,
    } = this.props

    return (
      <FooterTransactions
        reviewedTx={reviewedTx}
        unlockRequest={unlockRequest}
        handleRejectTransaction={handleRejectTransaction}
        handleConfirmTransaction={handleConfirmTransaction}
        type={type}
      />
    )
  }
}

export default Layout
