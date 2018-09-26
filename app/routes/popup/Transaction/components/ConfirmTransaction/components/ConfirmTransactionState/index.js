import mobileImage from 'assets/images/mobile.svg'
import styles from 'assets/css/global.css'

const ConfirmTransactionState = () => (
  <div className={styles.transactionState}>
    <span className={styles.message}>
      <img src={mobileImage} height='55' width='30' />
      <p>This transaction has been initiated by the Gnosis Safe mobile app. When you confirm, the mobile app will submit the transaction.</p>
    </span>
  </div>
)

export default ConfirmTransactionState
