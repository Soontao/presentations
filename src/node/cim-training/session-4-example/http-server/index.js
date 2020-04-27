var http = require('http');

const indexAPI = (req, res) => {
  req.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ "server": "nodejs" }));
}

http.createServer(async function (request, response) {

  switch (request.url) { // dispatch
    case "/":
      indexAPI(request, response)
      break;
    default:
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404');
      break;
  }

}).listen(8888);
