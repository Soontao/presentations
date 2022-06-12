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

---

## History of Programming Language

- High-Level VM based Programming Language
  - Java (编译)
  - C#
  - JavaScript (解释型)
  - Python
- Declarative/Markup Programming Language
  - SQL
  - HTML

--- 

## Programming Language Diagram

- 面向过程的编程语言
- 面向对象的编程语言
- 声明式的编程语言
- 函数式编程
- 其它的编程范式

--- 


## Programming Language

- compiler - for early c/fortran languages (compile source code to machine executable binary)
- programming vm - for modern `java`/`c#` languages (source code/byte code is running in a programming VM)
- byte (8 bit) - kilobyte (KB) - megabyte (MB) - gigabyte (GB)
  - `00000011` plus `1` is `00000100`
- the first ['hello world'](https://en.m.wikipedia.org/wiki/%22Hello,_World!%22_program) example of c programming language

---

## Compiler with C example

```c
#include<stdio.h>
int main() {
  printf("hello world");
}
```

```bash
cat hello.c # hello.c is the source code
cc hello.c -o hello_world # 'cc' is the compiler 'hello_world' is the output executable binary object
```

---

## VM (Virtual Machine) with Javascript example

> `java` and `javascript` are different languages

```bash
node # 'node' is a VM, also is a compiled executable binary object
console.log('hello world')
```

---

## Functional Programming


```js
// not a functional example
let a = 1;
function add(b) {
  a = a + b
  return a
}
add(2)
```

---

```js
// pure function
function add(a, b) {
  return a + b
}
// high order function
function twoNumCal(f, a, b) {
  return f(a, b)
}
twoNumCal(add, 1, 2)
```
---

## Programming Elements

- Keyword
- Statement
- Block

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

```


---

```js

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
const yadan = new People('yadan', 26);

```

---

## Java

- VM based language programming
- Compiling is required (java source code -> bytecode (which could be executed by JVM) *instead of binary*)
- Object-Oriented Programming Language
- `Oracle` own copyright
  - **JVM** - Java Virtual Machine (java/javac/C++/pre-compiled)
    - Oracle JVM/Oracle JDK ([Java Development Kit](https://docs.oracle.com/en/java/javase/11/docs/api/))
    - Open JVM/JDK

---

## Java Version

LTS (Long Term Support) versions

- **8**
- 11
- 17

---

## Install JVM

[Download](https://adoptium.net/temurin/releases?version=8)

---

## Setup Java Environment

- [First Java Program](https://www.runoob.com/java/java-tutorial.html)

`HelloWorld.java`

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

---

- [打开命令提示符](https://zh.wikihow.com/%E5%9C%A8Windows%E4%B8%AD%E6%89%93%E5%BC%80%E2%80%9C%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6%E2%80%9D%E7%BB%88%E7%AB%AF)

```bash
javac HelloWorld.java 
java HelloWorld # call class 
```

---

## Download IDE

- [Idea](https://www.jetbrains.com/idea/)
- [Eclipse](https://www.eclipse.org/)

