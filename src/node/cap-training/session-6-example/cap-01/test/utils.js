

const spyAllPrototype = (object, accessType) => {

  for (const name of Object.getOwnPropertyNames(object)) {
    jest.spyOn(object, name, accessType)
  }
}

const spyAll = (object, accessType) => {
  Object.keys(object).forEach(key => {
    jest.spyOn(object, key, accessType)
  })
}

module.exports = { spyAll, spyAllPrototype }