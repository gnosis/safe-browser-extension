const EthUtil = require('ethereumjs-util')
const abi = require('ethereumjs-abi')

class SignTypedDataEip712 {
  // Recursively finds all the dependencies of a type
  dependencies = (primaryType, found = []) => {
    if (found.includes(primaryType)) {
      return found
    }
    if (this.types[primaryType] === undefined) {
      return found
    }
    found.push(primaryType)
    for (let field of this.types[primaryType]) {
      for (let dep of this.dependencies(field.type, found)) {
        if (!found.includes(dep)) {
          found.push(dep)
        }
      }
    }
    return found
  }

  encodeType = (primaryType) => {
    // Get dependencies primary first, then alphabetical
    let deps = this.dependencies(primaryType)
    deps = deps.filter(t => t != primaryType)
    deps = [primaryType].concat(deps.sort())

    // Format as a string with fields
    let result = ''
    for (let type of deps) {
      result += `${type}(${this.types[type].map(({ name, type }) => `${type} ${name}`).join(',')})`
    }
    return result
  }

  typeHash = (primaryType) => {
    return EthUtil.keccak256(this.encodeType(primaryType))
  }

  encodeData = (primaryType, data) => {
    let encTypes = []
    let encValues = []

    // Add typehash
    encTypes.push('bytes32')
    encValues.push(this.typeHash(primaryType))

    // Add field contents
    for (let field of this.types[primaryType]) {
      let value = data[field.name]
      if (field.type == 'string' || field.type == 'bytes') {
        encTypes.push('bytes32')
        value = EthUtil.keccak256(value)
        encValues.push(value)
      } else if (this.types[field.type] !== undefined) {
        encTypes.push('bytes32')
        value = EthUtil.keccak256(this.encodeData(field.type, value))
        encValues.push(value)
      } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
        throw 'TODO: Arrays currently unimplemented in encodeData'
      } else {
        encTypes.push(field.type)
        encValues.push(value)
      }
    }

    return abi.rawEncode(encTypes, encValues)
  }

  structHash = (primaryType, data) => {
    return EthUtil.keccak256(this.encodeData(primaryType, data))
  }

  eip712Hash = (message) => {
    this.typedData = message
    this.types = message.types

    const eip712MessageHash = EthUtil.keccak256(
      Buffer.concat([
        Buffer.from('1901', 'hex'),
        this.structHash('EIP712Domain', this.typedData.domain),
        this.structHash(this.typedData.primaryType, this.typedData.message),
      ]),
    )
    const hexEip712MessageHash = '0x' + Buffer.from(eip712MessageHash).toString('hex')
    return hexEip712MessageHash
  }
}

export default SignTypedDataEip712
