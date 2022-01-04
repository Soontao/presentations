---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1588562767/cap_r2hzvb.svg)

# Node JS Training: Session 6 

# CAP Framework Basics

Theo Sun
2020

---

## [OData](https://www.odata.org/)

- introduction
- version
- CRUD
- expand
- ACTION/FUNCTION

---

## HANA Introduction

- [HANA WIKI](https://de.wikipedia.org/wiki/SAP_HANA)
- [HDI](https://help.sap.com/viewer/3823b0f33420468ba5f1cf7f59bd6bd9/2.0.04/en-US)
- HANA instance & HDI container & schema

---

## [CAP Framework](https://cap.cloud.sap/docs/about/)

> The SAP Cloud Application Programming Model is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

- CAP - Cloud Application Programming
- CDS - Core Data Service


---

## Links


- [CAP Framework Organization](https://github.wdf.sap.corp/cap)
- [Road Map](https://github.wdf.sap.corp/cap/matters/projects/36)
- [CAP Issues](https://github.wdf.sap.corp/cap/issues/issues)
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


## [Events](https://cap.cloud.sap/docs/guides/providing-services#handling-events)

> implement the service interface by `javascirpt` code, with `event` concepts

- Synchronous Requests sent from UIs, frontends, or other services:
  - Common CRUD methods: `CREATE`, `READ`, `UPDATE`, `UPSERT`, `DELETE`
  - Common REST methods: `POST`, `GET`, `PUT`, `PATCH`, `DELETE`
  - Custom-defined actions and functions 
- [Events & Messaging](https://cap.cloud.sap/docs/guides/messaging/) received thru message brokers

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1588570700/CAP-Events-Lifecycle_7_vm6xrg.png)

---

## Events



- focus on the `on` event
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
    await super.init()
    // do some init as you want
  }

  metric() {
    return { "service": "CDS" }
  }

  metric2(req) {
    const { name } = req.data // get data from context
    return { "service": `hello ${name}` }
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
    const { name } = req.data // get data from context
    return { "service": `hello ${name}` }
  }

  srv.on("metric2", handler)

}
```
---

## [Action & Function](https://cap.cloud.sap/docs/guides/providing-services#actions-and-functions) 

> In addition to common CRUD operations, you can declare domain-specific custom operations as shown below. These custom operations always need custom implementations in corresponding events handlers.


- Action - `WRITE` - `POST`
- Function - `READ` - `GET`
- Bound & Unbound

---

## [`Declarative` UI](https://cap.cloud.sap/docs/guides/fiori/)



- [SAP OData UI Annotation](https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md)
- [Annotation based Custom Actions](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=fioritech&title=Annotation+based+Custom+Actions)

--- 

## CAP Application Necessary

- cds & sap-hana & sqlite dependency
- cds configuration (in the `package.json` or `.cdsrc` file)
- entity & service implementation

---

## Deployment

> if you are using the `cap-01` template project, please remember CHANGE the `directory name` & `package.json.name` 

- cloud foundry & cf cli & quota
- application source code
- hana instance
- `cds build` project

---

## Tips


- custom **action*- is used to `WRITE`
- custom **function*- is used to `QUERY`
- use `NODE_ENV` control the CAP running profile (local sqlite/remote hana).
- directory name/package name/service name should be same.
- remember to add the mandatory columns to the initialize CSV file(e.g. PK)
  - please carefully use the CSV init data, ref the advance session
- use fixed `@sap/cds` version.
- `debug` server if you don't know the object detail.
- use env [`DEBUG`](https://cap.cloud.sap/docs/node.js/cds-log) to get internal logs of CAP


--- 

## Hands On



1. install `nodejs`, `git`, `@sap/cds-dk`
1. init project by `cds init`
1. install drivers (`sqlite3`, `@sap/hana-client`)
1. define database schema in `db` directory
1. expose db schema as odata in `svc` directory
1. enhance your odata CRUD logic with javascript
1. build `db` & `srv` package for deployment
1. install `cf cli` (for deployment) & `cf login`
1. prepare cloud foundry database and other dependencies (by ui or by cli)
1. deploy database `cf push -f gen/db`
1. deploy service `cf push -f gen/srv`