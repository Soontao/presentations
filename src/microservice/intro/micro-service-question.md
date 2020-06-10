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


# Questions for `microservice`

Some questions for microservice presentation

---

## Why integration over the network is a challenge ?

- network (ip, network, traffic)
- performance (in-memory (μs) <-> cross host (ms))

---


## Why releases become less risky in `microservice` ?

- little single feature(s) change on each release
- blue/green deployment, multi version

---

## Why we use the `message queue` (MQ, async message) in cloud application ?

- de-couple
- for peak demands
- isolation
- resilience for consumers (when they are down)

---

## Why the observability of `microservice` is so important ?

* monitor issues
* restart services
* upgrade/deployment

--- 

## Why the ATO office recommends using a separate database per service ?

* isolation when database down/overflow
* performance
* isolation for business