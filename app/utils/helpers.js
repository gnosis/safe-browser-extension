export const normalizeUrl = (url) => {
  var domain

  domain = (url.indexOf('://') > -1)
    ? url.split('/')[2]
    : url.split('/')[0]

  domain = domain.split(':')[0]
  domain = domain.split('?')[0]

  if (domain.substr(0, 4) === 'www.')
    domain = domain.slice(4)

  return domain
}