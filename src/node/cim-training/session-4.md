---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 4

---

## Agenda - NodeJS Basics

* Module system
* Core modules
  * fs
  * path
  * process
  * os
  * net/http
  * event
* Callback & Async

---

## Module System - [CommonJS](https://zh.wikipedia.org/wiki/CommonJS)

<br>

```js
const fs = require("fs") // load module

const moduleInternalStringUTF8 = "UTF-8" // internal variable, not exported

const readFileString = (path, cb) => fs.readFile(path, { encoding: moduleInternalStringUTF8 }, cb)

module.exports = { readFileString }

// module.exports.readFileString = readFileString // almost same
```

<br>

[nodejs module document](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html)

---

## Module System

> Load only once, later `require` will use cache

---

## Module System

> Cycle dependency issue

---

## Module System 

> Load JSON file


```js
const c = require("./config.json")

console.log(c.name) // alice
```

---

## Module System

> index.js & directory

---

## Module System

> Search logic

```text
require(X) from module at path Y

1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with '/'
   a. set Y to be the filesystem root
3. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
4. LOAD_NODE_MODULES(X, dirname(Y))
5. THROW "not found"
```

---

## [File System](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)

> provide local file system access

* buffer, binary
* string, encoded
* Promise API

> DONT use sync functions on server side programming.

---

## [Process](https://nodejs.org/dist/latest-v10.x/docs/api/process.html)

---

## Process - environment

> access system environment variables

```js
process.env.PATH
```


---

## Process -- custom exit logic

<br>

```js
process.on("SIGINT", async () => { // interrupt
   await server.destroy(); // destroy runtime
   if (conn.isConnected) { await conn.close(); } // close connection
   process.exit();
});
```
---

## [path](https://nodejs.org/dist/latest-v10.x/docs/api/path.html)

> platform path library

```js
path.join(__dirname, "./name-list.txt") // convert to absolute path
```

---

## [path](https://nodejs.org/dist/latest-v10.x/docs/api/path.html)

> ALWAYS use '/' instead of '\\'

```js
path.join(__dirname, "./../cim-training/session-1.js") // even you are in windows
```

> because if you use '\\' symbol in source code, the server can not correctly process it on linux.

---

## [os](https://nodejs.org/dist/latest-v10.x/docs/api/os.html)

<br>

```js
os.homedir() // user home
os.tmpdir() // tmp dir
```


---

## [net](https://nodejs.org/dist/latest-v10.x/docs/api/net.html) - access low-level TCP/UDP API

```js
const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on("data", data => { // response with prefix
    c.write(Buffer.concat([Buffer.from("response: "), data]))
  })
  c.write('hello\r\n');
});
server.on('error', (err) => {
  throw err;
});
server.listen(5000, () => {
  console.log('server bound');
});
```


---

## [http](https://nodejs.org/api/http.html) - server

> http server

```js
const http = require('http');

http.createServer(function (request, response) {

  response.writeHead(200, { 'Content-Type': 'text/plain' });

  response.end('Hello World\n');

}).listen(8888);

```

---

## [http](https://nodejs.org/dist/latest-v10.x/docs/api/http.html) - server

> http server

```js
var http = require('http');

http.createServer(function (request, response) {
  switch (request.url) { // dispatch
    case "/":
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ "server": "nodejs" }));
      break;
    default:
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404');
      break;
  }
}).listen(8888);
```


---

## [http](https://nodejs.org/dist/latest-v10.x/docs/api/http.html) - server

> http server parse content

```js
var http = require('http');

http.createServer(function (request, response) {
  switch (request.url) { // dispatch
    case "/post":
      let d = ""
      request.on("data", data => { // buffer
        d += data.toString()
      })
      request.on("end", () => {
        // parse request body & process here
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ "content": d }));
      })
      break
    default:
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404');
      break;
  }
}).listen(8888);
```