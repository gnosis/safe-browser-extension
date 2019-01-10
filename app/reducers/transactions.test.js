import rootReducer from 'reducers'
import { createStore } from 'redux'
import {
  addTransaction,
  removeTransaction,
  removeAllTransactions,
  setPaymentToken
} from 'actions/transactions'

const ethTransaction = {
  data: '',
  dataGas: '45144',
  from: '0x9e080f90BbB68d68b5874eEa42961a9C0424509B',
  gasPrice: '5000000001',
  gasToken: '0x0000000000000000000000000000000000000000',
  id: '579551c2-7887-48b1-b9e5-e00346254c57',
  nonce: '9',
  operation: '0',
  operationalGas: '25000',
  refundReceiver: '0',
  safe: '0x9e080f90BbB68d68b5874eEa42961a9C0424509B',
  to: '0x9e080f90BbB68d68b5874eEa42961a9C0424509B',
  txGas: '58058',
  type: 'confirmTransaction',
  value: '1230000000000000'
}

const tokenTransaction = {
  data: '0xa9059cbb0000000000000000000000009e080f90bbb68d68b5874eea42961a9c0424509b000000000000000000000000000000000000000000000000000000000000000c',
  dataGas: '46744',
  from: '0x9e080f90BbB68d68b5874eEa42961a9C0424509B',
  gasPrice: '5000000001',
  gasToken: '0x0000000000000000000000000000000000000000',
  id: '5402a476-993d-45e3-abb7-c902efff5b44',
  nonce: '9',
  operation: '0',
  operationalGas: '25200',
  refundReceiver: '0',
  safe: '0x9e080f90BbB68d68b5874eEa42961a9C0424509B',
  to: '0xb3a4Bc89d8517E0e2C9B66703d09D3029ffa1e6d',
  txGas: '67361',
  type: 'confirmTransaction',
  value: '0'
}
const paymentToken = {
  address: '0xb3a4Bc89d8517E0e2C9B66703d09D3029ffa1e6d',
  decimals: 6,
  logoUri: 'http://gnosis-safe-token-logos.s3.amazonaws.com/0xb3a4Bc89d8517E0e2C9B66703d09D3029ffa1e6d.png',
  name: 'Love Rinkeby',
  symbol: 'RLOVE'
}

describe('Test transactions redux reducer', () => {
  test('Add transaction test', () => {
    // GIVEN
    const stateBefore = {
      transactions: {
        paymentToken,
        txs: [],
        windowId: 0
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(addTransaction(ethTransaction, 0, 0, 0))

    // THEN
    const expectedState = {
      paymentToken,
      txs: [{
        tx: ethTransaction
      }],
      windowId: 0
    }
    expect(actualStore.getState().transactions).toEqual(expectedState)
  })

  test('Remove transaction test', () => {
    // GIVEN
    const stateBefore = {
      transactions: {
        paymentToken,
        txs: [{
          tx: ethTransaction,
        }, {
          tx: tokenTransaction
        }],
        windowId: 0
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    const position = 0
    actualStore.dispatch(removeTransaction(position))

    // THEN
    const expectedState = {
      paymentToken,
      txs: [{
        tx: tokenTransaction
      }],
      windowId: 0
    }
    expect(actualStore.getState().transactions).toEqual(expectedState)
  })

  test('Remove all transactions test', () => {
    // GIVEN
    const stateBefore = {
      transactions: {
        paymentToken,
        txs: [{
          tx: ethTransaction
        }, {
          tx: tokenTransaction
        }],
        windowId: 0
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(removeAllTransactions())

    // THEN
    const expectedState = {
      paymentToken,
      txs: [],
      windowId: undefined
    }
    expect(actualStore.getState().transactions).toEqual(expectedState)
  })

  test('Set token as payment token test', () => {
    // GIVEN
    const stateBefore = {
      transactions: {
        paymentToken: {},
        txs: [{
          tx: ethTransaction
        }],
        windowId: 0
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(setPaymentToken(paymentToken))

    // THEN
    const expectedState = {
      paymentToken,
      txs: [{
        tx: ethTransaction
      }],
      windowId: 0
    }
    expect(actualStore.getState().transactions).toEqual(expectedState)
  })

  test('Set Ether as payment token test', () => {
    // GIVEN
    const stateBefore = {
      transactions: {
        paymentToken,
        txs: [{
          tx: ethTransaction
        }],
        windowId: 0
      }
    }
    const actualStore = createStore(rootReducer, stateBefore)

    // WHEN
    actualStore.dispatch(setPaymentToken(null))

    // THEN
    const expectedState = {
      txs: [{
        tx: ethTransaction
      }],
      windowId: 0
    }
    expect(actualStore.getState().transactions).toEqual(expectedState)
  })
})
