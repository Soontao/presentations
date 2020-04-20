---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 2

---

## Agenda

<br>

* ECMAScript standards introduction
* Block & Closure
* Class & `this`
* Promises
* Template strings
* Arrow Functions
* Async Functions

---

## ECMAScript

<br>

* ES5 (old)
* ES6 - ES2015 (many many APIs)
* ES7 - ES2016 (**)
* ES8 - ES2017 (async)
* ...

---

## Block

<br>

```js
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


## Closure

> access variable outside current scope

<br>

```js
var a = 1;

var f = () => {
  console.log(a)
}

f() // output: ?
```

---

## class

> what is class ? what is `this` ?

```js
// class (constructor) is function, function is object

function People(name) {
  this.name = name // access context
}

// custom New
function New(clazz, ...params) {
  const obj = {}
  obj.constructor = clazz
  clazz.call(obj, ...params) // run constructor with obj as context
  return obj
}

New(People, "admin").name == (new People("admin")).name

```

---

## call/apply/bind & `this`

> `this` is `context`

```js
function People(name) {
  this.name = name // access context
}

var obj = {}  // new context
var obj1 = {} // new context
var obj2 = {} // new context

People.apply(obj, ["hello"])

People.call(obj1, "hello")

var People2 = People.bind(obj2)
People2("hello")

obj.name == obj1.name == obj2.name
```

---


## class (ES6)

<br>

```js
class People {
  constructor(name) {
    this.name = name
  }
}

// create anonymous class and assign it to `People2`
const People2 = class extends People {
  constructor(name) {
    super(name + "1") // parent class constructor
  }

  getName() {
    return this.name // what is `this` ?
  }
}

new People2("admin") // People2 { name: 'admin1' }
```