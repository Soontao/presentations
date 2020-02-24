---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS: just do what you want.

---

## Introduction

<br>

`Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single    language, rather than different languages for server- and client-side scripts.`

---

## Concepts: Sync & Async

What is `syn·chro·nous` ?

<br>

* A - not
* Syn - co
* Chronus - time

---

## Concepts: Blocking & Non-blocking

<br>

```js

var pass = getRandomBlocking() // blocking, spend 500ms return value, and go to next statement
var handle = getRandom(); // non-blocking, spend ~1ms return handler, and go to next statement

for(;;) { // forever wait

  if(handle.code == "FINISHED"){
    // after 500ms
    var pass2 = handle.getValue()
    break // remember break forever loop
  }
  
}

```


---

## Advantage: Fast

<br>

**Easy** to

<br>

* learn (few, simple, clear API)
* write (less code, less effort)
* build (no build, just run)

---

## Disadvantage: So fast

* Hard to debug on events
* Callback hell
