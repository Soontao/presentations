---
marp: true
theme: dark
---

# CAP NodeJS Runtime Advance

Theo Sun
2021

---

## HANA CSV import issues

- empty lines
- ID ignore
- local deploy flow (quick check with hana issue)

---

## Interact with CQN (Query)

- grant
- req.query
- dynamic change query by other parameters

---

## Debug

- local debug
- local debug with xsuaa
- remote debug

---

## OData V2 Support

- use [cds-odata-v2-adapter-proxy](https://www.npmjs.com/package/@sap/cds-odata-v2-adapter-proxy)
- remember defined the `key` for view/query, because the adapter is not support the collection without key

---

## Transaction

- remember what is `transaction`

---

## Logging

> integrate with `application-logging`

- cf-nodejs-logging-support

---

## Cluster

- [example](https://gist.github.com/Soontao/8e63daa8cae5d03af1ebd182c143115b)

--- 

## Unit Test

- [cap-unit-test-example](https://github.com/Soontao/cap-unit-test-example)