const http = require("http")

const req = http.request("http://postman-echo.com/post", { method: "POST", headers: { "Content-Type": "application/json" } }, (res) => {
  let body = ""
  res.on("data", data => body += data.toString())
  res.on("end", () => console.log(body))
}
)
req.write(Buffer.from(JSON.stringify({ "client": "native nodejs client request" })))

req.end()