---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1641363781/Unofficial_JavaScript_logo_2_sq9qnl.svg)

# Node JS Training: Session 3
 
# Javascript Core API

Theo Sun
2022

---

## Map

> Generally Key-Value, `carefully process the key`

```javascript
const myMap = new Map();
 
const keyObj = {};
const keyFunc = function() {};
const keyString = 'a string';
 
// add key
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
 
myMap.size; // 3
 
// read value
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get(keyObj);       // "和键keyObj关联的值"
myMap.get(keyFunc);      // "和键keyFunc关联的值"
JSON.stringify(myMap)    // => '{}'
```

---

## Map

> Traverse

```javascript
const map1 = new Map();
map1.set('0', 'foo');
map1.set(1, 'bar');
map1.keys() // all keys
map1.values() // all values

for (const kv of map1.entries()) {
  console.log(kv)
}

for (const [k, v] of map1.entries()) {
  console.log(k, v)
}

map1.forEach((value, key) => { console.log(value, key)} )
```

---

## Set

```javascript
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



```javascript
[1, 2, 3].forEach((value, index, array) => {
  // foreach item
})
```

---

## Array - map

> mapping value (transform, extract ... )

```javascript
const a1 = [1, 2, 3]
const a2 = a1.map(v => "" + v) // [ '1', '2', '3' ]
a1 != a2 // new array
```

---

## Array - reduce

> reduce dimension

```javascript
const a1 = [1, 2, 3]
const sum = a1.reduce((acc, cur) => acc + cur, 0) 
// 6
```

---

## Array - filter

> filter value

```javascript
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


```javascript
Number.parseFloat("1.23") // 1.23
Number.parseInt("123", 10) // 123
Number.parseInt("101", 2) // 5
```

---

## Boolean


```javascript
Boolean(0) // false
Boolean(1) // true
Boolean(-1) // true
Boolean(undefined) // false
Boolean(null) // false
Boolean(NaN) // false
Boolean({a:1}) // true
Boolean(new Date()) // true
Boolean([]) // true
Boolean([1]) // true
Boolean("") // false
Boolean("1") // true
```

---

## String



```javascript
"1" + '.' // '1.'

"123".split("") // [ '1', '2', '3' ]

["1", 2, "3"].join(",") // '1,2,3'

["1", 2, "3"].join(",").split(",") // [ '1', '2', '3' ]

"abcd"[2] // c  

'   Hello world!   '.trim() // 'Hello world!'

```

---

## String


```javascript
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



```javascript
const result = /([a-z]+)\:\/\/(.*)(\:\d+)/.exec("https://domain.com:3333")
```



[regexp test tool](https://regex101.com/)

---

## Date

```javascript
const d = new Date()
d.toISOString() // '2020-04-23T02:28:56.507Z'
d.getTime() // 1587608936507 unix time

new Date(1587608936507) // parse from unix timestamp
new Date("2020-04-23T02:28:56.507Z") // parse from ISO
```

[date library -- luxon](https://moment.github.io/luxon/#/)

---

## Object



```javascript
var obj = { a: 1, b: 2, c: { d: 3 } }

Object.keys(obj) // [ 'a', 'b', 'c' ]
Object.values(obj) // [ 1, 2, { d: 3 } ]
Object.entries(obj) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', { d: 3 } ] ]
Object.assign(obj, { a: 11 }, { a: 13, b: 4 }) // { a: 13, b: 4, c: { d: 3 } }
```

---

## Quiz - 1


```javascript
const data = [
  { name: 'Bob', age: 10},
  { name: 'Alice', age: 11},
  { name: 'John', age: 108},
]

const total = data
  .map(p => p.age * 3)
  .filter(age => age > 30)
  .reduce((pre,cur) => pre + cur, 0)

console.log(total)
```

---

## Quiz - 2


```javascript
const defaultValue = { name: 'unknown', age: 0 }
const v = Object.assign({ country: "CN" }, defaultValue)

console.log(v) // value?
console.log(defaultValue) // value?
```

---

## Quiz - 3


```javascript
const defaultValue = { name: 'unknown', age: 0 }
const v = Object.assign(defaultValue, { country: "CN" })

console.log(v) // value?
console.log(defaultValue) // value?
```

---

## Quiz - 4


```javascript
const m1 = new Map()
const m2 = new Map()

const k = 'k'
const v = 'v'
m1.set(k, v)
m2.set(k, v)

console.log(k == v) // ?
console.log(k === v) // ?
console.log(JSON.stringify(m1) === JSON.stringify(m2)) // ?
m1.set(k, 'v2') // change value
console.log(JSON.stringify(m1) === JSON.stringify(m2)) // ?
```


---


## Thank You