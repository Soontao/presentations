---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)

# NodeJS Basics


Theo Sun
2022

---

## What is JavaScript ?

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1641363781/Unofficial_JavaScript_logo_2_sq9qnl.svg)


---

## What is JavaScript ?

- high-level
- just-in-time compiled 
- dynamic typing
- prototype-based object-orientation
- first-class functions 
- multi-paradigm


---

## What is NodeJS ?

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)


---

## What is NodeJS ?

![bg right 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1654568611/1_KSUVEyemgCd7e52w7l28jA_u7wfkk.png)

---

## NodeJS in a short

> for `java` developer `ONLY`

- NodeJS runtime - JVM
- NodeJS built-in API - JDK
- modules - package
- prototype - class
- function - Functional Interface
- object - `None`
- array - List and stream
- io/net/async - multi thread
- cluster - multi process
- gc - gc


---


## [LTS - long term support](https://nodejs.org/en/about/releases/)

> use the latest LTS version


![](https://raw.githubusercontent.com/nodejs/Release/master/schedule.svg?sanitize=true)

---

## Module System - [CommonJS](https://zh.wikipedia.org/wiki/CommonJS)

> nodejs implemented its own module system

```javascript
const fs = require("fs") // load module

const moduleInternalStringUTF8 = "UTF-8" // internal variable, not exported

const readFileString = (path, cb) => fs.readFile(path, { encoding: moduleInternalStringUTF8 }, cb)

module.exports = { readFileString }

// module.exports.readFileString = readFileString // almost same
```

[nodejs module document](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html)

---

## Module System

> Load (sync) only once, later `require` will use cache

You can use it as a global shared variable


```js
const GLOBAL_ENTITY_NAME_PREFIX = 'com.sap.xxxx';
module.export = { GLOBAL_ENTITY_NAME_PREFIX }
```

---

## Module System

> [Circular Dependency](https://github.com/Soontao/cycle-import-check#circular-dependency-sample-project)

---

## Module System 

> Load JSON file


```javascript
const c = require("./config.json")

console.log(c.name) // alice
```

---

## Module System

> index.js & directory

```javascript
// same
require("./module")
require("./module/index.js")
```

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

## [ECMAScript modules (ESM)](https://nodejs.org/docs/latest/api/esm.html)

> still in progress

```js
import { v } from "./m1"

const v2 = v + 1

export { v2 }
```

---


## NodeJS project structure

- package.json & package-lock.json & `node_modules`
- scripts in `package.json`

---

## npm

> node package manager

```bash
npm init
npm install express
```

---

## npm - package json & package lock

- [semver](https://semver.npmjs.com/)
- [package-lock.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json) & [npm ci](https://docs.npmjs.com/cli/v8/commands/npm-ci)

---

## npm registry

> central package management

- Global [npmjs.com](https://www.npmjs.com/)
- [SAP Artifactory](https://pages.github.tools.sap/Common-Repository/Artifactory-Corp/)

```ini
@sap:registry=https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm
@sap-internal:registry=https://int.repositories.cloud.sap/artifactory/api/npm/internal-tool
```
---


## Common Modules in NodeJS
---

## [Global Objects](https://nodejs.org/docs/latest/api/globals.html)

```javascript
console.log(__dirname)
console.log(__filename)
require("module")
console.log(Buffer.from("text", "utf8").toString("base64"))
```

---


## [Event Emitter](https://nodejs.org/dist/latest-v16.x/docs/api/events.html)

```javascript
const { EventEmitter } = require("events")
const Service = class extends EventEmitter {
  constructor(...args) {
    super(...args)
    this.value = 0;
    this.on("add", this.onAdd.bind(this))
    this.on("add", this.onAfterAdd.bind(this))
  }
  onAdd(v) {
    this.value += v
  }
  onAfterAdd(v) {
    console.log(`after add: ${this.value}`);
  }
}
const bus = new Service();
bus.emit("add", 10)
bus.emit("add", 10)
```

---

## [Event Emitter](https://nodejs.org/dist/latest-v10.x/docs/api/events.html)

- EventEmitter.prototype.once
- EventEmitter.prototype.removeListener
- EventEmitter.prototype.removeAllListeners


---

## [File System](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)

> provide local file system access

- buffer, binary
- string, encoded
- Promise API

> DON'T use **sync functions** on server side programming.

---

## [process](https://nodejs.org/dist/latest-v10.x/docs/api/process.html)

---

## process - environment

> access system environment variables, sometimes you will need this, for example, run CAP in k8s

```javascript
console.log(process.env.PATH)
```


---

## process -- custom exit logic



```javascript
process.on("SIGINT", async () => { // interrupt
   await server.destroy(); // destroy runtime
   if (conn.isConnected) { await conn.close(); } // close connection
   process.exit();
});
```

---

## process -- parse cli argv



```javascript
console.log(process.argv);
// [ 'node',
//   '/argv.js',
//   'one',
//   'two',
//   'three',
//   'four',
//   'five' ]
```
---

## [path](https://nodejs.org/dist/latest-v10.x/docs/api/path.html)

> platform path library

```javascript
path.join(__dirname, "./name-list.txt") // convert to absolute path
```

---

## [path](https://nodejs.org/dist/latest-v10.x/docs/api/path.html)

> ALWAYS use '/' instead of '\\'

```javascript
path.join(__dirname, "./../cim-training/session-1.js") // even you are in windows
```

> because if you use '\\' symbol in source code, the server can not correctly process it on linux.

---

## [os](https://nodejs.org/dist/latest-v10.x/docs/api/os.html)



```javascript
os.homedir() // user home
os.tmpdir() // tmp dir
```


---

## [net](https://nodejs.org/dist/latest-v10.x/docs/api/net.html) - access low-level TCP/UDP API

```javascript
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

```javascript
const http = require('http');

http.createServer(function (request, response) {

  response.writeHead(200, { 'Content-Type': 'text/plain' });

  response.end('Hello World\n');

}).listen(8888);

```

---

## [http](https://nodejs.org/dist/latest-v10.x/docs/api/http.html) - server

> http server

```javascript
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

```javascript
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

---

## [http](https://nodejs.org/dist/latest-v10.x/docs/api/http.html) - client

```javascript
const http = require("http")
const opt = { method: "POST", headers: { "Content-Type": "application/json" } }

const req = http.request("http://postman-echo.com/post", opt, (res) => {
  let body = ""
  res.on("data", data => body += data.toString())
  res.on("end", () => console.log(body))
})

req.write(Buffer.from(JSON.stringify({ "client": "native nodejs client request" })))

req.end()
```

---

## Quiz - 1

> What is `LTS` for nodejs ?, which `releases` are LTS versions?

- 8
- 11
- 12
- 13
- 14

---

## Quiz - 2

> What is the `package manger` of the nodejs, whats the usage of package manager ?

- do you known any other package manager of nodejs ?

---

## Quiz - 3

> What is the `registry` of the nodejs ?

---

## Quiz - 4

```js
// m1.js
var a = 1
a++
module.exports.a = a
```

```js
// m2.js
require("./m1")
const { a } = require("./m1")
console.log(a) // value ?
```


```js
// m3.js
require("./m2")
const { a } = require("./m1")
console.log(a) // value ?
```

---

## Thank You