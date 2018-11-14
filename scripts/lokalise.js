const fs = require('fs')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
const env = dotenv.config().parsed

const localesRootDirectory = './config/_locales/'

const getLanguages = async () => {
  const url = 'https://api.lokalise.co/api2/projects/' + env.LOKALISE_PROJECT_ID + '/languages'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-token': env.LOKALISE_API_TOKEN
  }
  const response = await fetch(url, {
    method: 'GET',
    headers
  })
  const languageList = await response.json()
  return languageList.languages
}

const getTranslations = async () => {
  const url = 'https://api.lokalise.co/api2/projects/' + env.LOKALISE_PROJECT_ID + '/keys' +
    '?include_translations=1' +
    '&filter_platforms=other'
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-token': env.LOKALISE_API_TOKEN
  }
  const response = await fetch(url, {
    method: 'GET',
    headers
  })
  const keyList = await response.json()
  return keyList
}

const generateLocalesDirectories = async () => {
  try {
    const languageList = await getLanguages()

    if (!fs.existsSync(localesRootDirectory)) {
      fs.mkdirSync(localesRootDirectory)
    }
    languageList.forEach(language => {
      const languageDirectory = localesRootDirectory + language.lang_iso
      if (!fs.existsSync(languageDirectory)) {
        fs.mkdirSync(languageDirectory)
      }
    })

    return languageList.map(l => l.lang_iso)
  } catch (err) {
    console.error(err)
  }
}

const generateI18nFiles = async (languagesIso) => {
  try {
    const keyList = await getTranslations()
    const languageList = await getLanguages()

    const globalKeyList = keyList.keys.map(key => {
      const keyName = key.key_name.other
      const translations = key.translations.map(t => ({
        language_iso: t.language_iso,
        translation: t.translation
      }))
      return {
        keyName,
        translations
      }
    })

    let errors = []

    languagesIso.forEach(langIso => {
      const errorsLanguage = []
      const languageObject = {}
      globalKeyList.map(key => {
        const languageKey = key.translations.filter(t => t.language_iso === langIso)
        if (languageKey[0].translation === '') {
          const languageName = languageList.filter(l => l.lang_iso === langIso)[0].lang_name
          errorsLanguage.push('[' + key.keyName + '] was not translated to: ' + languageName + ' (' + langIso + ')')
        }
        languageObject[key.keyName] = {
          message: languageKey[0].translation
        }
      })

      if (errorsLanguage.length > 0) {
        errorsLanguage.map(elem => console.log(elem))
        errors = errors.concat(errorsLanguage)
      } else {
        fs.writeFileSync(
          localesRootDirectory + langIso + '/messages.json',
          JSON.stringify(languageObject, null, '  ')
        )
      }
    })

    if (errors.length > 0) {
      throw new Error('i18n FAILED')
    }
  } catch (err) {
    console.error(err)
  }
}

const manageI18n = async () => {
  const languagesIso = await generateLocalesDirectories()
  await generateI18nFiles(languagesIso)
}

manageI18n()
