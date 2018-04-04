export const CREATE_RELAYER_ACCOUNT = 'CREATE_RELAYER_ACCOUNT'

export const createRelayerAccount = (address, seed) => ({
  type: CREATE_RELAYER_ACCOUNT,
  address,
  seed,
})
