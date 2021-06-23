const getType = (v) => {
  if (v === null) return null
  if (v === undefined) return 'undefined'
  return v.constructor.name.toLowerCase()
}

const notEmpty = (term) => {
  if (!term) {
    return false
  }
  const termType = getType(term)
  switch (termType) {
    case 'object':
      return !Object.keys(term).length
    case 'array':
      return Boolean(term[0])
    default:
      return Boolean(term)
  }
}

function concatUrlParms(array) {
  return array.reduce((acc, str, index) => (index === 0 ? str : `${acc},${str}`), '')
}

function buildQueryString(params) {
  const urlParams = new URLSearchParams()
  Object.keys(params)
    .filter((key) => notEmpty(params[key]))
    .forEach((key) =>
      getType(params[key]) === 'array'
        ? urlParams.append(key, concatUrlParms(params[key]))
        : urlParams.append(key, params[key])
    )

  return urlParams
}

export default buildQueryString
