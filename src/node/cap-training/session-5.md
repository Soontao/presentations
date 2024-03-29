---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)

# Node JS Training: Session 5

> Advanced NodeJS

Theo Sun
2022

---

## Event Loop - Core of NodeJS

- Event
- Callback

- [nodejs official event loop doc](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
- [libuv event loop reference](http://docs.libuv.org/en/v1.x/loop.html)

---

## Event Loop

> put async jobs to queue, and execute them on time

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


- No thread context switch
- No thread level lock

---

## [ExpressJS](https://expressjs.com/)

> Process requests with chain

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`started at http://localhost:${port}`))
```

---

## [ExpressJS](https://expressjs.com/) - Handler

- [Request](https://expressjs.com/en/4x/api.html#req)
    - get - HTTP request header
    - body - HTTP body
    - query - uri query
    - params - path
- [Response](https://expressjs.com/en/4x/api.html#res)
    - status, set - HTTP response header
    - redirect
    - json, render, send - HTTP response body
- NextFunction - go to next handler

---

## [ExpressJS](https://expressjs.com/) - Examples

- App
- Chain
- Router
- Fallback
- Error handler
- Typical issues

---

## Memory & Performance

- [nodejs gc options](https://gist.github.com/listochkin/10973974)
- [Node inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/) with Chrome, `chrome://inspect`, dump heap
- [Garbage Collection Methods](https://blog.risingstack.com/node-js-at-scale-node-js-garbage-collection/)

---

## [Stream](https://nodejs.org/docs/latest-v10.x/api/stream.html)

> The stream process interface

```javascript
api_v3.get("/stream-file", req => {
    fs.createReadStream(path.join(__dirname, "./server.js")).pipe(req.res)
})
```

---

## [Cluster](https://nodejs.org/docs/latest-v10.x/api/cluster.html)

> Multi-process mode

```javascript
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

- put more debug detail here
  - `node_modules` org
  - `.bin`
  - how to find debug target
  - configure the debug profile
- [native debug](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [remote debug example](https://github.com/Soontao/cf-node-debug-example)
- inspect by chrome inspect tool

---

## [JSDoc](https://jsdoc.app) & Type


> Add necessary JSDoc for type reference

```javascript
/**
 - @param {{a:string,b:{c:number}}[]} arr 
 */
const f2 = (arr = []) => {
    arr[0].b.c.toFixed(2) // auto-complete here
}
```

---

## NODE_ENV environment

> `NODE_ENV` is a common environment which used in nodejs

- frontend build
- cloud environment declaration
- [CAP Profile](https://cap.cloud.sap/docs/node.js/cds-env)
- `vscode` debug env file
---

## NPM & Open Source & Security

> Check security with tools

- npm
    - run (script name)
    - build
    - npx
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit/)
- [white source](https://saas.whitesourcesoftware.com/Wss/WSS.html)


---

## Quiz - 1

> Which items will cause nodejs runtime crash

- put too much item in object/map, Out of Memory
- throw `Error` in `timer`
- uncaught `Error` in `Promise`
