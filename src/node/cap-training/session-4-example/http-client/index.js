const http = require("http")

const reqOpt = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
}

const resCb = (res) => { // Response instance - EventEmitter

  let body = "" // variable

  // res -- uuid -- data
  res.on("data", function (data) { // multi times // event listener
    body += data.toString()
  })

  res.on("end", () => console.log(body))

}

const req = http.request("http://postman-echo.com/post", reqOpt, resCb)

req.write(
  Buffer.from(JSON.stringify({ "client": "native nodejs client request" }))
)

req.end()