---
theme: dark
marp: true
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1641363781/Unofficial_JavaScript_logo_2_sq9qnl.svg)

# Node JS Training: Session 2 

# Advanced Javascript

Theo Sun
2022

---

## ECMAScript

- ES5 (old)
- ES6 - ES2015 (many many APIs)
- ES7 - ES2016 (**)
- ES8 - ES2017 (async)
- ...

---

## Arrow Function (ES6)

- no `arguments`
- no `this`

```javascript
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

## Object - Destructuring assignment

> The object and array literal expressions provide an easy way to create ad hoc packages of data.

```javascript
let a, b, rest;
[a, b] = [10, 20]; // image this is a function return value

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30, 40, 50]
```


---

## [Spread syntax (...) & Rest syntax (parameters)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

console.log(sum.apply(null, numbers));
// expected output: 6
```



---

## Promise (ES6)

> async handle

**as far as possible, use `await` to wait promise** 

```javascript
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

```javascript
// just a mock, this function will be async network/IO API
const createAsyncValue = function (value) {
  return new Promise(function (resolve, reject) {
    if (value instanceof Error) {
      reject(value)
    } else {
      resolve(value)
    }
  })
}

createAsyncValue("hello")
  .then(result =>
    createAsyncValue(new Error(result + " promise error chain"))
      .catch(e => console.error(`internal process ${e.message}`))
  )
  .then(console.log)
  .catch(e => console.error(`external process ${e.message}`))
```
---

## Promise (ES6) - utils

> send multi async requests, and wait they ALL finished 

```javascript
Promise
  .all([createAsyncValue("run1"), createAsyncValue("run2")])
  .then(console.log) // [ 'run1', 'run2' ]

Promise
  .all([createAsyncValue("run1"), createAsyncValue(new Error("error1"))])
  .then(console.log) // no here
  .catch(console.error) // only here
```
---

## Async Function (ES2018)

> you can use `await` keyword to wait any `promise` even `plain object`

```javascript
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

## Async Function 

> convert callback to promise and wait it in async function

```javascript
function sleep(timeout = 1000) {
  return new Promise((resolve, reject)=>{
    setTimeout(resolve, timeout)
  })
}

const f = async () => {
  await sleep(1000)
  // do something after 1 seconds the function called 
}

f() // it will return a Promise

```

---


## class (ES2015)

> modern javascript class

```javascript
class People {
  constructor(name) {
    // no explicit instance field declaration
    this._name = name
  }
}

// create anonymous class and assign it to `People2`
// class People2 extends People {
const People2 = class extends People {
  constructor(name) {
    super(name + "1") // parent class constructor
  }

  getName() {
    return this._name // what is `this` ?
  }
}

const p = new People2("admin") // People2 { name: 'admin1' }
console.log(p.getName())
```

---


## template string

> Developers love this feature, please carefully process `undefined` error

```javascript
var person = "alice"
var hello_person_1 = "hello " + person + ".";
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
## Operators - [Nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

- used for undefined check, replace the `||` operator in some cases
- NodeJS >= `14.0` ONLY)


```javascript
console.log(0 && 1)
console.log(0 || 1)
console.log(0 ?? 1)
```

---

## Object - optional chain

> nodejs >= `14.0` ONLY

```javascript
const obj = {a:{b:{c:1}}}
obj.a.b.c.d // => undefined
obj.a.b.c.d.e // => throw TypeError: Cannot read properties of undefined 
obj.a.b.c.d?.e // => undefined
obj.a.b.c.d(1) // => TypeError: obj.a.b.c.d is not a function
obj.a.b.c.d?.(param) // => undefined
```

---

## Big Number

> for big decimal number, please careful to process the numeric range, sometime HANA support the number but nodejs do not support that

```javascript
console.log(0.1 + 0.2)
// 0.30000000000000004
console.log(0.01 + 0.05)
// 0.060000000000000005
```

- [What Every JavaScript Developer Should Know About Floating Points](https://modernweb.com/what-every-javascript-developer-should-know-about-floating-points/)
- [big.js](https://www.npmjs.com/package/big.js)
- [a discussion](https://github.wdf.sap.corp/cap/issues/issues/10208)


---

## Thank You