const fs = require("fs").promises;
const path = require("path");

const f1 = async () => {
  const c = await fs.readFile(path.join(__dirname, "./name-list.txt"), { encoding: "UTF-8" })
  console.log(c)
}

f1()
