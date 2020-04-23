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
  * process
  * os
  * path
  * net/http
  * event
* Callback & Async

---

## Module System - [CommonJS](https://zh.wikipedia.org/wiki/CommonJS)

<br>

```js
const fs = require("fs") // load module

const moduleInternalStringUTF8 = "UTF-8"

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

## [File System](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)

> provide local file system access
