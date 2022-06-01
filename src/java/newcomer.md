---
marp: true
theme: dark
---

# Java Programming Language for New Comer

Theo Sun
2022

---

## History of Programming Language

- Input/Output
- Assembly Languages 汇编语言
- High-Level Programming Languages
  - FORTRAN
  - COBOL
  - C
  - C++
  - Java
  - JavaScript
  - SQL

--- 

## Programming Language Diagram

- 面向过程的编程语言
- 面向对象的编程语言
- 声明式的编程语言
- 函数式编程
- 其它的编程范式

--- 

## Basic Programming Elements

---

## Variable

变量

```js
var a = 1 // int a = 1; int b = 2; in c
a = 2 // '=' is assign value '2' to variable 'a'
const b = 2 // some languages have that
b = 3 // error here
```


---

## Statements

> calculation `a` plus `b`

```js
// declare a new constant named 'a'
const a = 3 // statement, assign value
const b = 2
const result = a + b // assign value
console.log(result)
```

---

## Function/Method

- function `js`
- method `java`

```js
function addAndPrint(a, b) {
  const result = a + b
  console.log(result)
}
```

---

## Control Flow

- loop
- condition


```js
for (var i = 1 ; i <= 10 ; i++) {
  // block, with statements
  console.log(i) // print, System.out
  if (i == 5) { // conditional
    break;
  }
  // 
}
```

--- 

## Error/Exception

```javascript
function addAndPrint(a, b) {
  const var1 = a // declare a new constant with name 'var1', assign value of 'a' to 'var1'
  const var2 = b
  if (var2 < 100) {
    throw new Error('var2 could not less than 100')
  }
  const result = a + b // if error happened, not executed
  console.log(result)
}

try {
  addAndPrint(1, 2) // function invocation
  doSomeThing() // not executed
} 
catch (e) {
  console.log(e)
}
doSomething2() // executed
```


---

## Class 类

```js
// abstract instance
// class
class Animal {
  age; // instance property/variable
  constructor(age) {
    this.age = age
  }
  getAge() { return this.age  } // method
}

const bird1 = new Animal(1) // instance
const bird2 = new Animal(2) // instance

class Horse extends Animal {
  speed;
  constructor(speed, age) { // construct the instance
    super(age) // call super constructor
    this.speed = speed
  }
}

class People extends Animal { // inherit
  name;
  constructor(name, age) {
    super(age)
    this.name = name
  }
  getName() {
    return this.name
  }
}

const theo = new People('theo', 27);
const yandan = new People('yadan', 26);

```

