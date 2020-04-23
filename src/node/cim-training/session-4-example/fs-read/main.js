const fs = require("fs")

if (require.name == module) {

  fs.readFile("./hello.txt", (err, data) => {
    if (err) { // if err, not exist or no privilege

    } else {
      // data: Buffer
      // 6865	6c6c 6f20	616c
      // 6963	652e
    }

  })

  fs.readFile("./hello.txt", { encoding: "UTF-8" }, (err, data) => {
    if (err) { // process error

    } else {
      // data: string
      // hello alice.
    }
  })

}


