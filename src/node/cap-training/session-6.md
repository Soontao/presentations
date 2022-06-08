---
theme: dark
marp: true
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1588562767/cap_r2hzvb.svg)

# CAP Framework Basics

Theo Sun
2022

---

## [OData](https://www.odata.org/)

- [Introduction](https://www.odata.org/)
- Version
- CRUD
- expand/navigation
- ACTION/FUNCTION
- [IEEE754Compatible](http://docs.oasis-open.org/odata/odata-json-format/v4.0/os/odata-json-format-v4.0-os.html#_Controlling_the_Representation)

---

## HANA Introduction

- [HANA WIKI](https://de.wikipedia.org/wiki/SAP_HANA)
- [HANA SQL Reference](https://help.sap.com/viewer/7c78579ce9b14a669c1f3295b0d8ca16/Cloud/en-US/20ff532c751910148657c32fe3431a9f.html)
- [HANA Deployment Infra](https://help.sap.com/viewer/3823b0f33420468ba5f1cf7f59bd6bd9/2.0.04/en-US)
- [The secret of SAP HANA](https://blogs.sap.com/2017/12/01/secret-hana-pssst-dont-tell-anyone/)
- HANA instance & HDI container & schema
- HANA native artifacts
- [HANA Monitoring/TroubleShooting Tools](https://wiki.wdf.sap.corp/wiki/display/SAPEMS/HANA+Cloud+Monitoring)

---

## [CAP Framework](https://cap.cloud.sap/docs/about/)

> The SAP Cloud Application Programming Model is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

- CAP - Cloud Application Programming
- CDS - Core Data Service

---

## Links

- [CAP Framework Organization](https://github.tools.sap/cap/)
- [CAP Issues](https://github.tools.sap/cap/issues/issues)
- [Setup Environment](https://cap.cloud.sap/docs/get-started/)

---


## [Modeling](https://cap.cloud.sap/docs/guides/domain-models#about-domain-models)

> declare database model/service interface & other metadata in `cds` syntax file

- type & aspect
- (`abstract`) entity
  - csv data import
- service
  - service entity
  - service impl

---


## [Service Events](https://cap.cloud.sap/docs/guides/providing-services#handling-events)

> implement the service interface by `javascript` code, with `event` concepts

- Synchronous Requests sent from UIs, frontend, or other services:
  - Common CRUD methods: `CREATE`, `READ`, `UPDATE`, `DELETE`
  - Common REST methods: `POST`, `GET`, `PUT`, `PATCH`, `DELETE`
  - Custom-defined actions and functions 
- [Events & Messaging](https://cap.cloud.sap/docs/guides/messaging/) received thru message brokers

---

## Events

- use `before` hook do the input validation
- use `after` hook do the data transform
- register single event for single entity only **ONCE**
- careful to process `before/after` (it also will trigger `ROLLBACK`)
- async processing with `async` function
- using standalone transaction or join request context transaction
- careful check your code. [error dump logic](https://github.wdf.sap.corp/cdx/cds-services/blob/master/lib/adapter/odata-v4/handlers/error.js#L3), [config](https://github.wdf.sap.corp/CentralInvoices/workflow-service/blob/e2960467efc81687451f35b68e2b1229d52837e8/workflow-service/srv/WorkflowService.js#L113)

---

## Service Definition

```swift
using { sap.capire.bookshop as my } from '../db/schema';

service BookshopService {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  action submitOrder (book : Books:ID, quantity : Integer);
}
```

---

## [Service Definition - `projection` & `select`](https://cap.cloud.sap/docs/cds/cdl#views)

---

## Service Impl -- class

```js
module.exports = class IndexService extends ApplicationService {

  async init() {
    // register some events, prepare some thing
    await super.init()
  }

  async metric() {
    return { "service": "CDS" }
  }

}
```

---

## Service Impl -- programming


```js
module.exports = (srv) => {

  srv.on("metric", () => {
    return { "service": "CDS" }
  })

  const handler = (req) => {
    const { name } = req.data // get data from request
    return { "service": `hello ${name}` }
  }

  srv.on("metric2", handler)

}
```

--- 

## Service Impl -- impl location

> defined the service implementation location

```groovy
using {sap.training} from '../db/schema';

@impl : './lib/class-service.js' // manual define the service, implmentation
service ClassService {
  // ...
}
```

- [service impl](https://cap.cloud.sap/docs/node.js/services#srv-impl)

---

## Service Impl -- consume other service


```js
const ClassService = await cds.connect.to("ClassService")
const { Classes } = ClassService.entities;
const { total } = await ClassService.run(query)
```

---

## Perform Database Query

```js
const { Books, Authors } = srv.entities //> reflection Entity in 'this' Service
const q1 = SELECT.one.from(Authors) // build query
const q2 = (Books, 201, b => { b.ID, b.title }) //> expand
const [books, authors] = await srv.run ([q1, q2])
```

- [reflection](https://cap.cloud.sap/docs/node.js/services#srv-entities)
- [expand](https://cap.cloud.sap/docs/node.js/cds-ql#projection-functions)

---

## [Action & Function](https://cap.cloud.sap/docs/guides/providing-services#actions-and-functions) 

> In addition to common CRUD operations, you can declare domain-specific custom operations as shown below. These custom operations always need custom implementations in corresponding events handlers.


- Action - `WRITE` - `POST`
- Function - `READ` - `GET`
- Bound & Unbound

--- 

## [Database Transaction](https://cap.cloud.sap/docs/node.js/transactions)

- [Automatic Transactions](https://cap.cloud.sap/docs/node.js/transactions#automatic-transactions) - all db operations in single HTTP/OData request will automatically use the same transaction/db connection 


> and manually transaction

```js
let db = await cds.connect.to('db')
let tx = db.tx()
try {
  await tx.run (SELECT.from(Foo))
  await tx.create (Foo, {...})
  await tx.read (Foo)
  await tx.commit()
} catch(e) {
  await tx.rollback(e)
}
```

[please remember **commit/rollback** if manually control the transaction](https://cap.cloud.sap/docs/node.js/transactions#commit)





---

## [Context](https://cap.cloud.sap/docs/node.js/cds-facade#cds-context)

> Reference to the current root event or request, which acts as invocation context, providing access to the current tenant and user information, and also constitutes the transaction boundary for automatically managed transactions.

if you want to implement some util without request/event parameter, it will be useful

---

## [Fiori Element](https://cap.cloud.sap/docs/advanced/fiori)


---

## Authentication & XSUAA

- [CAP NodeJS Authentication](https://cap.cloud.sap/docs/node.js/authentication)
- [XSUAA and RBAC and authentication flow](https://blogs.sap.com/2020/08/20/demystifying-xsuaa-in-sap-cloud-foundry/)
- [Restricting Roles with `@requires`](https://cap.cloud.sap/docs/guides/authorization#requires)

---

## [Deployment](https://cap.cloud.sap/docs/guides/deployment/)

- [MTA](https://www.sap.com/documents/2016/06/e2f618e4-757c-0010-82c7-eda71af511fa.html)
- cloud foundry `manifest.yml`
- cloud foundry & cf cli & quota
- application source code
- SAP HANA Cloud instance
- `cds build` project

---

## Tips

- custom *action* is used for `WRITE`
- custom *function* is used for `QUERY`
- use `NODE_ENV` control the CAP running profile (local sqlite/remote hana).
- remember to add the mandatory columns to the initialize CSV file(e.g. PK)
  - please carefully use the CSV init data, ref the advance session
- `debug` server if you don't know the object detail.
- use env [`DEBUG`](https://cap.cloud.sap/docs/node.js/cds-log) to get internal logs of CAP

---

## Thank You