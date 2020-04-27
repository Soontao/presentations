const { createAsyncValue } = require("./createAsyncValue")

// request handler
const main = async (request, response) => {
  // async/await
  try {
    // micro-service internal invoke
    const rt = createAsyncValue("v2").catch(err => { })
  } catch (error) { // 
    console.log("some error happened")
  }
}

const main = (request, response) => {
  return new Promise((resolve, reject) => {
    return createAsyncValue("v2").then(rt => {

    }).catch((error) => console.log("some error happened"))
  })
}

if (require.main == module) {
  main() // promise
}