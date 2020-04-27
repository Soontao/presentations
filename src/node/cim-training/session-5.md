---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 5 - Advanced NodeJS

---

## Agenda - Advanced NodeJS

* Event Loop
* ExpressJS
* Memory
* Stream
* Cluster
* Debug & Unit Test Debug
* JSDoc
* NPM & Open Source & Security

---

## Event Loop - Core of NodeJS

<br>

* Event
* Callback

<br>

* [nodejs official event loop doc](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
* [libuv event loop reference](http://docs.libuv.org/en/v1.x/loop.html)

---

## Event Loop

```text
       ┌───────────────────────────┐
    ┌─>│           timers          │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │     pending callbacks     │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │       idle, prepare       │
    │  └─────────────┬─────────────┘            ┌───────────────┐
    │  ┌─────────────┴─────────────┐            │   incoming:   │
    │  │           poll            │<───────────┤  connections, │
    │  └─────────────┬─────────────┘            │   data, etc.  │
    │  ┌─────────────┴─────────────┐            └───────────────┘
    │  │           check           │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    └──┤      close callbacks      │
       └───────────────────────────┘
```

---

## Event Loop

<br>

* No thread context switch
* No thread level lock

---

## [ExpressJS](https://expressjs.com/)

> Process requests with chain

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`started at http://localhost:${port}`))
```

---

## [ExpressJS](https://expressjs.com/) - Handler

* [Request](https://expressjs.com/en/4x/api.html#req)
    * get - HTTP request header
    * body - HTTP body
    * query - uri query
    * params - path
* [Response](https://expressjs.com/en/4x/api.html#res)
    * status, set - HTTP response header
    * redirect
    * json, render, send - HTTP response body
* NextFunction - go to next handler

---

## [ExpressJS](https://expressjs.com/) - Examples

<br>

* App
* Chain
* Router
* Fallback
* Error handler
* Typical issues

---

## Memory

<br>

* V8 js engine gc
* [nodejs gc options](https://gist.github.com/listochkin/10973974)
* Node inspect with Chrome, `chrome://inspect`, dump heap

---

## [Stream](https://nodejs.org/docs/latest-v10.x/api/stream.html)

> The stream process interface

```js
api_v3.get("/stream-file", req => {
    fs.createReadStream(path.join(__dirname, "./server.js")).pipe(req.res)
})
```

---

## [Cluster](https://nodejs.org/docs/latest-v10.x/api/cluster.html)

> Multi-process mode

```js
var app = require("./server");
var cluster = require('cluster')
var coreCount = require('os').cpus().length;

if (cluster.isMaster) {
    console.log("starting...");
    for (var i = 0; i < coreCount; i++) { cluster.fork(); }
    cluster.on('listening', worker => {
        console.log(`core ${i}-${worker.process.pid}: started`);
    });
    cluster.on('exit', worker => {
        console.log(`core ${i}-${worker.process.pid}: restarting`);
        setTimeout(function () { cluster.fork(); }, 0);
    });
} else {
    app.listen(3000, () => { });
}
```

---

## Debug

> Use VSCode to debug nodejs based application

---

## [JSDoc](https://jsdoc.app)

<br>

> Add necessary JSDoc for type reference

<br>

```js
/**
 * @param {{a:string,b:{c:number}}[]} arr 
 */
const f2 = (arr = []) => {
    arr[0].b.c.toFixed(2)
}
```

---

## NPM & Open Source & Security

<br>

> Check security with tools

<br>

* npm
    * registry
    * install (dev/default)
    * run (script name)
* npm audit
* whitesource