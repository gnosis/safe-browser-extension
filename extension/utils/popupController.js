class PopupController {
  constructor (props) {
    this.openedPopup = false
    this.storageController = props.storageController
  }

  focusPopup = () => {
    const providerRequest = this.storageController.getStoreState().enabledDapps.providerRequest
    const transactions = this.storageController.getStoreState().transactions
    const popUpWindowId = (providerRequest && providerRequest.windowId) || (transactions && transactions.windowId)

    chrome.windows.update(popUpWindowId, { 'focused': true })
  }

  showPopup = (cb) => {
    if (!this.openedPopup) {
      chrome.windows.create({
        url: '/popup.html',
        type: 'popup',
        height: 630,
        width: 390
      }, (window) => {
        cb(window)
      })
      this.openedPopup = true
    } else {
      this.focusPopup()
    }
  }

  handleClosePopup = () => {
    this.openedPopup = false
  }
}

export default PopupController
