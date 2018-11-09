const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const manifest = require(path.resolve(__dirname, '../config/manifest_template.json'))
const config = require(path.resolve(__dirname, '../config'))
const names = require(path.resolve(__dirname, '../config/names'))
const env = dotenv.config().parsed

export const generateEnvVariables = () => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})
  envKeys['process.env.NODE_ENV'] = process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : `"${names.DEVELOPMENT}"`
  envKeys['process.env.NETWORK'] = process.env.NETWORK ? `"${process.env.NETWORK}"` : `"${names.RINKEBY}"`

  return envKeys
}

export const generateManifestFile = () => {
  try {
    const title = (config.getNetwork() === names.MAINNET)
      ? 'Gnosis Safe'
      : 'Gnosis Safe - Rinkeby'

    manifest.name = title
    manifest.browser_action.default_title = title

    fs.writeFileSync(
      './build/manifest.json',
      JSON.stringify(manifest, null, '  ')
    )
  } catch (err) {
    console.error(err)
  }
}
