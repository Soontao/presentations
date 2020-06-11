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


# Questions for microservice

Some questions for microservice presentation

--- 

## More benefits of `microservice` ?

* `Micro` - easy to maintain for single service

---

## Why integration over the network is a challenge ?

* network (ip, dns, network, traffic)
* performance (in-memory (`μs`) <-> cross host (`ms`), framework)

---


## Why releases become less risky in `microservice` ?

* little single feature(s) change on each release
* blue/green deployment, multi version
* just partial service unavailable

---

## Why we use the `message queue` (MQ, async message) in cloud application ?

* de-couple
* for peak demands
* isolation
* resilience for consumers (when they are down)

---

## Why the observability of `microservice` is so important ?

* monitor issues, analysis problems, upgrade/degrade
* manually scale when system load changed

---

## Why `redundancy` is not enough ?

* anything maybe broken in anytime

--- 

## Why the ATO office recommends using separate databases `per` service ?

* isolation when database down, memory overflow, query timeout
* performance (resource isolation, simple business)
* isolation for business (domain bounded context)