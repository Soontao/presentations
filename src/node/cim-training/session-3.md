---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 3 - Core API

---

## Agenda - Core Classes

* Map
* Set
* Array, foreach/map/reduce
* Number
* Boolean
* String
* Regexp
* Date
* Object

---

## Map

> Generally Key-Value

```js
let myMap = new Map();
 
let keyObj = {};
let keyFunc = function() {};
let keyString = 'a string';
 
// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
 
myMap.size; // 3
 
// 读取值
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get(keyObj);       // "和键keyObj关联的值"
myMap.get(keyFunc);      // "和键keyFunc关联的值"
```

---

## Map

> Traverse

```js
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

map1.keys() // all keys
map1.values() // all values

for (const v of map1.entries()) {
  console.log(v)
}

map1.forEach((value, key) => {
  console.log(value, key)
})
```


---

## WeakMap

<br>

> Key Weak Reference Map
> Limit key type - only `object`
> Used when runtime un-expected memory leak

---

## Set

<br>

```js
const s = new Set([1, 2, 3, 3])
Array.from(s) // [ 1, 2, 3 ]

const s2 = new Set()
s2.add(1)
s2.add("1")
s2.add(2)
s2.add(2)
s2.has(2) // true

Array.from(s2) // [ 1, '1', 2 ]
```

---

## Array

> You always need to process array
> because you don't need to process normal objects, just access them

---

## Array - foreach item

<br>

```js
[1, 2, 3].forEach((value, index, array) => {
  // foreach item
})
```

---

## Array - map

> mapping value (transform, extract ... )

```js
const a1 = [1, 2, 3]
const a2 = a1.map(v => "" + v) // [ '1', '2', '3' ]
a1 != a2 // new array
```

---

## Array - reduce

> reduce dimension

```js
const a1 = [1, 2, 3]
const sum = a1.reduce((acc, cur) => acc + cur, 0) 
// 6
```

---

## Array - filter

> filter value

```js
const a3 = [
  { name: "a", enabled: true },
  { name: "b", enabled: true },
  { name: "c", enabled: false }
]

const enabledNames = a3.filter(item => item.enabled).map(item => item.name)
// [ 'a', 'b' ]
```

---

## Number

<br>

```js
Number.parseFloat("1.23") // 1.23
Number.parseInt("123", 10) // 123
Number.parseInt("101", 2) // 5
```

---

## Boolean

<br>

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

## String

<br>

```js
"1" + '.' // '1.'

"123".split("") // [ '1', '2', '3' ]

["1", 2, "3"].join(",") // '1,2,3'

["1", 2, "3"].join(",").split(",") // [ '1', '2', '3' ]

"abcd"[2] // c  

'   Hello world!   '.trim() // 'Hello world!'

```

---

## String

<br>

```js
"https://domain.com:3333".match(/([a-z]+)\:\/\/(.*)(\:\d+)/) 
// [
//   'https://domain.com:3333',
//   'https',
//   'domain.com',
//   ':3333',
//   index: 0,
//   input: 'https://domain.com:3333',
//   groups: undefined
// ]

// if not match, will return null
```

---

## [Regexp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

<br>

```js
const result = /([a-z]+)\:\/\/(.*)(\:\d+)/.exec("https://domain.com:3333")
```

<br>

[regexp test tool](https://regex101.com/)

---

## Date

<br>

```js
const d = new Date()
d.toISOString() // '2020-04-23T02:28:56.507Z'
d.getTime() // 1587608936507 unix time

new Date(1587608936507) // parse from unix timestamp
new Date("2020-04-23T02:28:56.507Z") // parse from ISO
```

<br>

[library -- momentjs](https://momentjs.com/docs/)

---

## Object

<br>

```js
var obj = { a: 1, b: 2, c: { d: 3 } }

Object.keys(obj) // [ 'a', 'b', 'c' ]
Object.values(obj) // [ 1, 2, { d: 3 } ]
Object.entries(obj) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', { d: 3 } ] ]
Object.assign(obj, { a: 11 }, { a: 13, b: 4 }) // { a: 13, b: 4, c: { d: 3 } }
```
