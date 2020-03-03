---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# <!-- fit --> Node JS Basics: just do what you want.

---

## Introduction

<br>

Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single language, rather than different languages for server- and client-side scripts.

---

## Concepts: Sync & Async (**In Parallel Programming**)

<br>

What is `a·syn·chronous` ? `A - not, Syn - co, Chronus - time`

* synchronous - run sequential

```java
class Runner {
    public synchronized void runThisMethodOneByOnePlease() { } 
}
```

* asynchronous - run parallel

```js
const req1 = (async () => {})() // new async function and execute it immediately
const req2 = (async () => {})()
const getAllInformationHandle = Promise.all([req1, req2])
await getAllInformationHandle // sync, run next statement when all requests finished
```

---

## Concepts: Blocking & Non-blocking (**In Single Thread**)

<br>

What is `blocking` ?

<br>

```js
var pass = getRandomBlocking() // blocking, spend 500ms, and go to next statement
var handle = getRandom(); // non-blocking, spend ~1ms, and go to next statement

for(;;) { // forever loop
  print("hello my friend, I'm still working")
  if(handle.state == "FINISHED") { // after 500ms, the handle said it's 'finished'
    var pass2 = handle.getValue()
    break // remember break forever loop
  }
  sleep(100) // tell system, 'I don't need use CPU for 100ms'
}
// handle synced
```

---

## Discussing: Why we need the parallel programming ?

---

## For totally fully use the whole CPU(s) resource.

---

## Okay, everything is here, just enjoy the nodejs.

<br>

```js
const http = require('http'); // module system

const hostname = '127.0.0.1'; // type less
const port = 3000;

const server = http.createServer((req, res) => { // async callback
  // when any http requests received from port 3000
  // program will go to here to process
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  // Closure
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

---

## Advantage: Fast

<br>

**Easy** to

<br>

* learn (few, simple, clear API)
* write (less code, less effort)
* build (no build, no build system, just run)

---

## Disadvantage: Too fast

<br>

* Type Less, Design Lost
* Type Less, Bug More
* Callback hell/Async function chain
* Performance

---

## NodeJS 
## Is the **BEST** language for independent developers & start-up companies

---

## Scenario 1: Create a prototype server

<br>

For the customer project, we built simple dynamic API server for demo/feasibility check.

If there are no performance requirement, even we can implement the production server based the prototype server.

---

## Scenario 2: Build tools for your daily work

<br>

Computer is good at doing repetitive fixed boring work.

<br>

Examples:

* [System Tool](https://github.com/Soontao/clean-icon-and-thumb-cache)
* [Javascript Static Analyse Tool](https://github.com/Soontao/cycle-import-check)
* [Documentation Tool](https://github.com/ui5-next/automation-documentation)
* [Project Generator](https://github.com/ui5-next/ui5g)

--- 

## Scenario 3: Build the presentation layer

<br>

With Server-Side Rendering technology, server could send the end-user direct html page instead of a SPA launcher.

<br>

* Native JS frameworks (React/Vue) integration
* Stateless, easy to scale
* Easy to learn/use by frontend developers