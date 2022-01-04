---
theme: dark
marp: true
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)

# Node JS Training: Session 2 

# Advanced Javascript - ES6 & More

Theo Sun
2020

---

## Agenda

- ECMAScript standards introduction
- Class & `this`
- Promise
- Template strings
- Async Functions
- Arrow Functions

---

## ECMAScript



- ES5 (old)
- ES6 - ES2015 (many many APIs)
- ES7 - ES2016 (**)
- ES8 - ES2017 (async)
- ...


---

## Object - Destructuring assignment

> The object and array literal expressions provide an easy way to create ad hoc packages of data.

```js
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30,40,50]
```


---

## Function

```js
function hello(arg1 = "alice") { // default value
  console.log(`hello ${arg1}`)
}

// arguments
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



```js
function hello() {
  console.log(`hello ${this.name}`) // use `this`
}

hello.call({ name: "alice" })  // hello alice
hello() // hello undefined
```
---

## class (old)

> what is class ? what is `this` ?

```js
// class (constructor) is function, function is object

function People(name) {
  this.name = name // access context
}

// function New
function New(clazz, ...params) {
  // create `new` object with `__proto__`
  const obj = Object.create(clazz.prototype)
  clazz.call(obj, ...params)
  // obj almost = { name, __proto__ }
  return obj
}

New(People, "admin").name == (new People("admin")).name

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



```js
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


## class (ES6)



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

--- 

## class (old) `this` issue



```js
function People(name) {
  this.name = name
}

People.prototype.getName = function () {
  return this.name
}

function People3(name, p) {
  this.name = name
  this.getName = p.getName
}

console.log(new People3("people3", new People("people1")).getName())
// output: ?
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

## class (old) bind `this`

> PLEASE remember `this` is not secure

```js
function People(name) {
  this.name = name
}

People.prototype.getName = function () {
  return this.name
}

function People3(name, p) {
  this.name = name
  this.getName = p.getName.bind(p)
}

console.log(new People3("people3", new People("people1")).getName())
// output: ?
```

---

## Promise (ES6)

> async handle

**as far as possible, use `await` to wait promise** 

```js
const promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
```

---

## Promise (ES6) - error

```js
// some times, this function will be network API or network based API
const createAsyncValue = function (value) {
  return new Promise(function (resolve, reject) {
    if (value instanceof Error) {
      reject(value)
    } else {
      resolve(value)
    }
  })
}

createAsyncValue("hello promise").then(console.log)
createAsyncValue(new Error("hello promise")).catch(console.error)
createAsyncValue("hello")
  .then(result => createAsyncValue(result + " promise chain"))
  .then(console.log)

createAsyncValue("hello")
  .then(result =>
    createAsyncValue(new Error(result + " promise error chain"))
      .catch(e => console.error(`internal process ${e.message}`))
  )
  .then(console.log)
  .catch(e => console.error(`external process ${e.message}`))
```

---

## Promise (ES6) - sync

> send multi async requests, and wait they ALL finished 

```js
Promise
  .all([createAsyncValue("run1"), createAsyncValue("run2")])
  .then(console.log) // [ 'run1', 'run2' ]

Promise
  .all([createAsyncValue("run1"), createAsyncValue(new Error("error1"))])
  .then(console.log) // no here
  .catch(console.error) // only here
```

---

## template string

> Developers love this feature, please carefully process `undefined` error

```js
var person = "alice"
var hello_person_1 = "hello " + alice + ".";
var hello_person_2 = "hello ".concat(person).concat(".")
var hello_person_3 = `hello ${person}.`

var long_text = `Dear ${person}

I'm ....


...
`
// Dear alice\n\nI'm ....\n\n\n...\n

`${whatever}` // Uncaught ReferenceError
```

---

## Async Function (ES2018)

> you can use `await` keyword to wait any `promise` even `plain object`

```js
async function run() {
  const hello = await createAsyncValue("hello")
  try {
    await createAsyncValue(new Error("error"))
  } catch (error) {
    // error
  }
}
```

---

## Arrow Function (ES6)

- no `arguments`
- no `this`

```js
const f1 = () => { return "f1" }
const f2 = () => "f2"
const f3 = value => `hello ${value}`
const f4 = ({ name }, ...rest) => `hello ${name}`
const f5 = () => `hello ${arguments[0]}`
const f6 = () => `hello ${this.name}`

f1() // => 'f1'
f2() // => 'f2'
f3("alice") // => 'hello alice'
f4({ name: "alice", age: 1000 }) // => 'hello alice'
f5("alice") // Uncaught ReferenceError: arguments is not defined
f6.call({ name: "alice" }) // => 'hello undefined'
```

---

## [Spread syntax (...) & Rest syntax (parameters)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.

```js
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

console.log(sum.apply(null, numbers));
// expected output: 6
```

