---
marp: true
theme: dark
---

# Programming

Theo Sun
2023

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/o5oozohv0fiuwxujgitu)

---

## About this session

To discuss programming itself instead of others (engineering, coding, business)

---

## Etymology of [`Program`](https://en.wiktionary.org/wiki/program#English)

> From French `programme`, from Late Latin `programma` (“a proclamation, edict”), from Ancient Greek `πρόγραμμα` (prógramma, “x”), from `προγράφω` (prográphō, “I set forth as a public notice”), from πρό (pró, “before”) + γράφω (gráphō, “I write”).

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/x02owsdgl6oox42jzhl8)


---

## Proposition 1: The Original Sin of Programming

Since half a century ago, programming have two different fundamental paradigms.

---

### Paradigm 1:

> stateful

```js
var a = 1 // variable/state/database value
add()
add()
console.log(a)
```

---

### Paradigm 2:

> stateless

```js
var a = 1
var b = add(add(a)) // cost
console.log(b)
```

---

## Proposition 1: The Original Sin of Programming

![bg right 85%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/sg2znjatezvlgensnkvh)

The problem is: 

- if use the `stateful` approach, will get bugs
- if use the `stateless` approach, will get cost

The real world is:

- most of people do not think about this
- mixed use those two approaches everywhere