---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1641363781/Unofficial_JavaScript_logo_2_sq9qnl.svg)

# Node JS Training: Session 1
# Javascript Basics

Theo Sun
2022


---

## Introduction

> JavaScript (JS) is a `lightweight`, `interpreted`, or `just-in-time` compiled programming language with `first-class functions`. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, `single-threaded`, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

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

## Data Type



- Boolean `true`
- Null `null`
- Undefined `undefined`
- Number `123`
- BigInt
- String `'abc'` `"def"` \`${param} value\`
- Symbol `Symbol(1)`
- Object `other any things`

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

```javascript
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

```javascript
const a = {a:1,b:2,c:3}
const b = {d:4,e:5}
const c = Object.assign(a,b)
// a == c == { a: 1, b: 2, c: 3, d: 4, e: 5 }
const d = { ...a, ...b }
// d == { a: 1, b: 2, c: 3, d: 4, e: 5 }
```

---

## Object - useful scripts snippets

> dynamic access object properties

```javascript
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

```javascript
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



```javascript
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

```javascript
"1" == 1 // true
"1" === 1 // false
```

---

## Operators - Bit

> In fact, you don't need these

```javascript
1 & 2 // 01 & 10 => 00
1 | 2 // 01 | 10 => 11
1 ^ 2 // 01 | 10 => 11
1 << 2 // 01 << 2 => 100
9 >> 2 // 1001 >> 0010 => 10
```

---

## Operators - Logical



```javascript
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

```javascript
var o1 =  true || true;     // t || t returns true
var o2 = false || true;     // f || t returns true
var o3 =  true || false;    // t || f returns true
var o4 = false || (3 == 4); // f || f returns false
var o5 = 'Cat' || 'Dog';    // t || t returns Cat
var o6 = false || 'Cat';    // f || t returns Cat
var o7 = 'Cat' || false;    // t || f returns Cat
```

---

## Other Keywords


```javascript
var one = new Number(1)
one instanceof Number // check object type

typeof one // 'object', in fact, you don't need this

"toFixed" in one // true, check object properties

delete objectName;
delete objectName.property;
delete arrayName[index];
delete variable; 
delete constVar; // => false
```


---

## Condition Statement



```javascript
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



```javascript
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


```javascript
const arr1 = [1, 2, 3]

for (let idx = 0; idx < arr1.length; idx++) {
  const ele = arr1[idx];
}

// or
for (const item of arr1) {

}

// or, please careful here, 
// this is NOT a programming syntax but a function
arr1.forEach((ele, idx) => {

})
```

---

## Function

```javascript
function hello(arg1 = "alice") { // default value
  console.log(`hello ${arg1}`)
}

// NOTICE arguments
function hello() {
  console.log(`hello ${arguments[0]}`)
}
// no arguments check in fact
hello("alice") // hello alice
hello() // hello undefined

// function parameter de-construct
function hello2(...params) {
  console.log(params[0])
}

hello2("alice") // alice

```

---

## Function

```javascript
function hello() {
  console.log(`hello ${this.name}`) // use `this`
}

hello.call({ name: "alice" })  // hello alice
hello() // hello undefined
```

--- 

## `this` issue


```javascript
function getName() {
  return this.name
}

function People(name) {
  this.name = name
}
People.prototype.getName = getName;

function People3(name) {
  this.name = name
}
People3.prototype.getName = getName;

console.log(new People("people").getName())
console.log(new People3("people3").getName())
console.log(getName.call(new People("people")))
console.log(getName.call(new People3("people3")))
// output: ?
```
---

## [prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)



> object has `__proto__` property
> function has `prototype` property
> function with `new` keyword is `constructor`
> the returned instance object.`__proto__` is the function.`prototype`
> javascript runtime check attr by object `__proto__`

---

## prototype

```javascript
function People(name) { this.name = name }
var p = new People();
p.__proto__ == People.prototype; // true

// instance method
People.prototype.getName = function () { return this.name; }

"getName" in p; // true
"getName" in People; // false

People.type = "china"; // class property/method, if you want

"type" in p; // false
"type" in People; // true
```

---

## call/apply/bind & `this`

> `this` is `context`

```javascript
function People(name) {
  this.name = name // access context
}

const obj = {}  // new context
const obj1 = {} // new context
const obj2 = {} // new context

People.apply(obj, ["hello"])

People.call(obj1, "hello")

const People2 = People.bind(obj2)
People2("hello")

obj.name == obj1.name == obj2.name
```

---

## block

```javascript
var x = 1;
let y = 1;

if (true) {
  var x = 2;
  let y = 2;
}

console.log(x);
// expected output: 2

console.log(y);
// expected output: 1
```

---


## closure

> access variable outside current scope

```javascript
var a = 1;

var f = () => {
  console.log(a)
}

f() // output: ?
```
---

## closure

> access variable outside current scope

```javascript
var a = 1;

var f2 = () => {
  a = 3;
  console.log(a);
}

f2() // output: ?
a // ?
```

---

## closure

> access variable outside current scope


```javascript
var a = 1;

var f3 = () => {
  var a = 3;
  console.log(a);
}

f3() // output: ?
a // ?
```

---

## closure

> access variable outside current scope

```javascript
let a = 1;

let f4 = () => {
  let a = 3;
  console.log(a);
}

f4() // output: ?
a // ?
```

---

## error


```javascript
function f1() {
  throw new Error("w1")
  // never executed
}
f1()
```

```javascript
function f1() {
  throw "w1" // you can throw anything
  // never executed
}
f1()
```

---

## error - catch


```javascript
class CustomError extends Error {}

function f1() {
  throw new CustomError("w1")
  // never executed
}

try {
  f1()
} catch(e){
  console.log(`${typeof e}: ${e?.constructor?.name} : ${e.message}`)
} finally {
  console.log("always run")
}
```



---

## Thank You 