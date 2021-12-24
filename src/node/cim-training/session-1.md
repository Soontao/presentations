---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)

# Node JS Training: Session 1
# Javascript Basics

Theo Sun
2020

---

## Agenda

- Installation - Git, VSCode & NodeJS (nvm)
- Overview language introduction
- NodeJS project structure
- Javascript basics
  - datatype
  - variable
  - object
  - expression & operator
  - condition & loop statement
  - function (basic, arrow & async)
  - prototype
- Homework introduction

---

## Installation

* [setup git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
* [install vscode](https://code.visualstudio.com)
* (windows) [install nodejs](https://nodejs.org/en) 
* (macos/linux) [install nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) 

---

## Overview language introduction

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


- package.json & lock & `node_modules`
- scripts in `package.json`
- jsconfig.json
- eslint
- .gitignore


---

## Data Type



- Boolean `true`
- Null `null`
- Undefined `undefined`
- Number `123`
- BigInt
- String `'abc'`
- Symbol
- Object `other things`

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

---

## Object - useful scripts snippets

> foreach object

```js
const obj = { a: 1, b: 2 }
const keys = Object.keys(obj)
// keys == [ 'a', 'b' ]
const values = Object.values(obj)
// values == [ 1, 2 ]
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const value = obj[key];
    // key value
  }
}
```

---

## Operators - Numeric



- \+
- \-
- \*
- \/
- \*\*
- \%

---

## Operators - Numeric



```js
1 + 2 // 3
1 - 2 // -1
1 * 2 // 2
1 / 2 // 0.5
3 ** 2 // 9
3 % 2 // 1
```

---

## Operators - Comparison

- ==
- ===
- !=
- !==
- \>=
- <=

---

## Operators - Comparison

```js
"1" == 1 // true
"1" === 1 // false
```

---

## Operators - Bit

> In fact, you don't need these

```js
1 & 2 // 01 & 10 => 00
1 | 2 // 01 | 10 => 11
1 ^ 2 // 01 | 10 => 11
1 << 2 // 01 << 2 => 100
9 >> 2 // 1001 >> 0010 => 10
```

---

## Operators - Logical



```js
var a1 =  true && true;     // t && t returns true
var a2 =  true && false;    // t && f returns false
var a3 = false && true;     // f && t returns false
var a4 = false && (3 == 4); // f && f returns false
var a5 = 'Cat' && 'Dog';    // t && t returns Dog
var a6 = false && 'Cat';    // f && t returns false
var a7 = 'Cat' && false;    // t && f returns false
```

---

## Operators - Logical

```js
var o1 =  true || true;     // t || t returns true
var o2 = false || true;     // f || t returns true
var o3 =  true || false;    // t || f returns true
var o4 = false || (3 == 4); // f || f returns false
var o5 = 'Cat' || 'Dog';    // t || t returns Cat
var o6 = false || 'Cat';    // f || t returns Cat
var o7 = 'Cat' || false;    // t || f returns Cat
```

---

## Operators - Others


```js
var one = new Number(1)
one instanceof Number // check object type

typeof one // 'object', in fact, you don't need this

"toFixed" in one // true, check object properties

delete objectName;
delete objectName.property;
delete arrayName[index];
delete variable; 
```


---

## Condition Statement



```js
var a = { b: 1, c: 2, d: 0 }
if (a.b) {
  // will run
}
if (a.d) {
  // not run
} else {
  // will run
}
if (true) {
  // will run
}
```

---

## Condition Check



```js
Boolean(0) // false
Boolean(1) // true
Boolean(-1) // true
Boolean(undefined) // false
Boolean(null) // false
Boolean(NaN) // false
Boolean({a:1}) // true
Boolean(new Date())
Boolean([]) // true
Boolean([1]) // true
Boolean("") // false
Boolean("1") // true
```


---

## Loop



```js
var arr1 = [1, 2, 3]

for (let idx = 0; idx < arr1.length; idx++) {
  const ele = arr1[idx];
  
}

// or
arr1.forEach((ele, idx) => {

})
```

---

## Function



```js
function f1(p1, p2 = 3) { // traditional function
  const { a, b } = p1 // de-construct
}

// arrow function, no context
const f2 = ({ a, b }, p2) => { // de-construct parameter

}

async function f3() { // async function, execute it will return Promise object
  return await 1; // you can use other function
}
```

---

## Prototype

> generally, you don't need this

```js
var Person = function(name) {
  this.name = name;
  this.canTalk = true;
};

// `new` will create a object, execute Person func on it, and return the object.
var p = new Person("alice") // Person { name: 'alice', canTalk: true }
"greet" in p // false
Person.prototype.greet = function() {}; // attach a function to the prototype
"greet" in p // true
```

---

## Homework

- Public Github User
- Git
- VSCode
- NodeJS

---

## Homework

- For the project [nodejs-training](https://github.com/Soontao/nodejs-training)
- Edit the `training.config.json`
- `npm install`
- `npm run download` (daily)
- `npm run test`
- update unit test code in `src/cases`
- `npm run test`
- commit & push
- check github workflow status