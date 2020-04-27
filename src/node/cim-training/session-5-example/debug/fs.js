const fs = require("fs").promises

const main = async () => {
  try {
    await fs.readFile("./not-exist")
  } catch (error) {
    console.log("some thing happened")
  }

}

if (require.main == module) {
  main()
}


