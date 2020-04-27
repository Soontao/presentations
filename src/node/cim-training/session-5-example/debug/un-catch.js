const fs = require("fs")

// Uncaught Exceptions
const main = () => {
  fs.readFile("./not-exist")
}

if (require.main == module) {
  main()
}


