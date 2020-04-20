---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 1

---

## Agenda

* Installation - Git, VSCode & NodeJS (nvm)
* Overview language introduction
* NodeJS project structure
* Javascript basics
  * datatype
  * variable
  * object
  * condition
  * loop
  * function (basic, arrow & async)
  * prototype
* Homework introduction

---

## Installation

* [setup git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
* [install vscode](https://code.visualstudio.com)
* (windows) [install nodejs](https://nodejs.org/en) 
* (macos/linux) [install nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) 

---

## Overview language introduction

<br>

```javascript

const api1 = require("./api1") // module system

server.route("/api/v1/what", (req) => { // arrow function
  api1(req.user) // execute programming api1
    .then(function(result, error){ // callback when api1 finished
      if(error){
        req.res.error(error)
      } else {
        req.res.end(result)
      }
    })
})

```
---

## NodeJS project structure

<br>

* package.json & lock & `node_modules`
* scripts in `package.json`
* jsconfig.json
* eslint
* .gitignore


---

## Data Type

<br>

* Boolean `true`
* Null `null`
* Undefined `undefined`
* Number `123`
* BigInt
* String `'abc'`
* Symbol
* Object `other things`

---

## Data Type

> dynamic reference

```javascript
var foo = 42;    // foo is a Number now
foo = "bar"; // foo is a String now
foo = true;  // foo is a Boolean now
```

---

## Variables

<br>

```javascript
var a = 1; // traditional 
const b = 2; // ES6 constant
let c = "3"; // ES6 variable

a = 2; // ok
b = 3; // error
c = 5; // ok, no runtime type check
d = 4; // ok, but static code check will report this var not defined before
```

---

## Object

> `class` is `function`
> `function` is `object`

> Almost everything is 'object' in javascript


```js
const o1 = { a: 1, b: "2" } // create an object with 2 properties
o1.a = 2 // change the properties
// o1 = {} // ERROR

const { a, b } = o1 // de-construct
a === 2

o1.a = 5
o1.a != a
```

---

## Object - useful scripts snippets

> combine object

```js
const a = {a:1,b:2,c:3}
const b = {d:4,e:5}
const c = Object.assign(a,b)
// a == c == { a: 1, b: 2, c: 3, d: 4, e: 5 }
```

---

## Object - useful scripts snippets

> dynamic access object properties

```js
let pName = "c"
const ob1 = {a:1,b:2,c:3}
ob1[pName] == 3
pName = "d"
ob1[pName] = 4
// ob1 == { a: 1, b: 2, c: 3, d: 4 }
```