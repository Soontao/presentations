---
marp: true
---

<style>

section {
  background-color: black;
  color: white;
}

a {
  color: #3e9ce0;
}

h1, h2 {
  color: white;
  padding-bottom: 50px;
}

code {
  background-color: #3e9ce0;
  color: white;
}

code span {
  color: black;
}

blockquote {
  color: rgba(192, 192, 192, 1);
}

</style>


# Questions for Resilience

Some questions for Resilience presentation

---

## Different between green-blue deployment & canary deployment ?

---

## Why we need to limit the capacity of a queue ?

---

## List the hardware failures you know.

---

## When hardware fail happened, what type redundancy will work ?

- client offline data model
- secondary database
- multi-instance deployment - L4/L7 load balance
- multi-zone deployment - DNS load balance
- multi-region deployment - DNS load balance

<br>

- database offline/restart/out-of-memory
- host/vm failure (cpu/memory/disk/network/power failure)
- air conditioner broken
- earthquake/flood

---

## List all patterns that restrict user resource consumption

---

## Why do the rate-limit? We should try our best to serve all requests !

---

![bg 100%](https://res.cloudinary.com/digf90pwi/image/upload/v1592190227/ESPM-CN_rgq7lf.png)