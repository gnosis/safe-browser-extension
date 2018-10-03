export const UPDATE_SAFE_ALIAS = 'UPDATE_SAFE_ALIAS'

export const updateSafeAlias = (address, alias) => {
  return {
    type: UPDATE_SAFE_ALIAS,
    address,
    alias
  }
}
