---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 5 - Node Advanced & CAP Framework Basics

---

## Agenda - Node Advanced & CAP Framework

* Generator
* Async Function Advanced
* CAP
  * introduction
  * Environment Setup
  * Basic demo
  * Deployment


---

## [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

> Generate Values

```js
function* fibo() {
  let v1 = 1;
  let v2 = 2;
  while (true) {
    const tmp = v1 + v2
    v1 = v2
    v2 = tmp
    yield v2
  }
}

const g = fibo()

console.log(g.next()) // 3
console.log(g.next()) // 5
```