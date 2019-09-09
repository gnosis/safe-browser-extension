const path = require('path')
const fs = require('fs')
const manifest = require(path.resolve(__dirname, '../config/manifest_template.json'))
const config = require(path.resolve(__dirname, '../config'))
const names = require(path.resolve(__dirname, '../config/names'))

const buildDirectory = './build/'
const envVars = [
  'PRODUCTION_MAINNET_GA_TRACKING_ID',
  'PRODUCTION_RINKEBY_GA_TRACKING_ID',
  'INFURA_PROJECT_ID',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'TRAVIS_BUILD_NUMBER'
]

export const generateEnvVariables = () => {
  const envKeys = Object
    .keys(process.env)
    .filter(key => envVars.includes(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key])
      return env
    }, {
      'NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify(names.DEVELOPMENT),
      'NETWORK': process.env.NETWORK ? JSON.stringify(process.env.NETWORK) : JSON.stringify(names.RINKEBY)
    })

  return { 'process.env': envKeys }
}

export const generateManifestFile = () => {
  try {
    if (!fs.existsSync(buildDirectory)) {
      fs.mkdirSync(buildDirectory)
    }

    const title = (config.getNetwork() === names.MAINNET)
      ? 'Gnosis Safe - Smart Wallet'
      : 'Gnosis Safe - Rinkeby'

    manifest.name = title
    manifest.browser_action.default_title = title

    fs.writeFileSync(
      buildDirectory + 'manifest.json',
      JSON.stringify(manifest, null, '  ')
    )
  } catch (err) {
    console.error(err)
  }
}
