const express = require("express")
const app = express()

app.use(express.json())

app.post("/add", req => {
  const { v1, v2 } = req.body
  req.res.json({ result: v1 + v2 })
})

if (require.main == module) {
  app.listen(3000, () => { console.log("app started") })
}

module.exports = app