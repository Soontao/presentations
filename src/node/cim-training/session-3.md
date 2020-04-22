---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 3

---

## Agenda - Core Classes

<br>

* Map
* Set
* Array, foreach/map/reduce
* Number
* Boolean
* String
* Regexp
* Promise, async
* Buffer, binary

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
Number.parseFloat("1.23")      
Number.parseInt("123")
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
"123".split("") // [ '1', '2', '3' ]

```