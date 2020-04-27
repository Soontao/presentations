
/**
 * create an async value
 * @param {any} value 
 */
const createAsyncValue = async value => {
  return new Promise((resolve, reject) => {
    // do something here
    // interval c++ call
    if (value instanceof Error) {
      reject(value)
    } else {
      resolve(value)
    }
  })
}

module.exports = { createAsyncValue }