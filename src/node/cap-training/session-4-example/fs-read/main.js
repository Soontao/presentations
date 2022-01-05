const path = require("path")
const fs = require("fs")

if (require.main == module) {

  fs.readFile(path.join(__dirname, "../../session-1.js"), (err, data) => {
    if (err) { // if err, not exist or no privilege
      console.error(err)
    } else {
      // data: Buffer
      // 6865	6c6c 6f20	616c
      // 6963	652e
      console.log(data)
    }
  })

  // fs.readFile("./hello.txt", { encoding: "UTF-8" }, (err, data) => {
  //   if (err) { // process error
  //     console.error(err)
  //   } else {
  //     // data: string
  //     // hello alice.
  //     console.log(data)
  //   }
  // })


}


