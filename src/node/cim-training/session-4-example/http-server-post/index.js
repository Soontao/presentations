var http = require('http');

http.createServer(function (request, response) {

  switch (request.url) { // dispatch
    case "/":
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ "server": "nodejs" }));
      break;
    case "/post":
      let d = ""
      request.on("data", data => {
        d += data.toString()
      })
      request.on("end", () => {
        // server logic 
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
          "content": parseInt(JSON.parse(d).sum, 10)
        }));
      })
      break
    default:
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404');
      break;
  }

}).listen(8888);
