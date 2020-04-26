const { Router } = require("express")
const fs = require("fs")
const path = require("path")
const api_v3 = Router()

// http://localhost:3000/api/v3/user/theo
api_v3.get("/user/:user", req => {
    req.res.json({ user: req.params.user })
})

// http://localhost:3000/api/v3/stream-file
api_v3.get("/stream-file", req => {
    fs.createReadStream(path.join(__dirname, "./server.js")).pipe(req.res)
})

module.exports = api_v3