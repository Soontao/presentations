const fs = require("fs")

const readFileString = (path, cb) => fs.readFile(path, { encoding: "UTF-8" }, cb)

module.exports = { readFileString }

// module.exports.readFileString = readFileString // almost same
