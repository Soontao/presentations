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

