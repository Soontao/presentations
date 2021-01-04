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

h1 {
  color: white;
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


![blur bg 80% left](https://res.cloudinary.com/digf90pwi/image/upload/v1588562767/cap_r2hzvb.svg)

# Node JS Training: Session 6/7 - CAP Framework

---

## Agenda - CAP Framework Basics

* Q & A
  * problems
    * type definition
    * packaged node_modules
    * express path match
  * homework answers
* CAP
  * Introduction (document tree, entity, events)
  * Environment Setup for Development
  * Basic Demo
  * Deployment


---




## [CAP Framework](https://cap.cloud.sap/docs/about/)



> The SAP Cloud Application Programming Model is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

* CAP - Cloud Application Programming
* CDS - Core Data Service


---

## Links




* [CAP Framework Organization](https://github.wdf.sap.corp/cap)
* [Roadmap](https://github.wdf.sap.corp/cap/matters/projects/33#card-138161)
* [CAP Issues](https://github.wdf.sap.corp/cap/issues/issues)
* [Setup Environment](https://cap.cloud.sap/docs/get-started/)

---


## [Modeling](https://cap.cloud.sap/docs/guides/domain-models#about-domain-models)

> declare database model/service interface & other metadata in `cds` syntax file

* type & aspect
* (`abstract`) entity
  * csv data import
* service
  * service entity
  * service impl

---


## [Events](https://cap.cloud.sap/docs/guides/providing-services#handling-events)

> implement the service interface by `javascirpt` code, with `event` concepts

* Synchronous Requests sent from UIs, frontends, or other services:
  * Common CRUD methods: `CREATE`, `READ`, `UPDATE`, `UPSERT`, `DELETE`
  * Common REST methods: `POST`, `GET`, `PUT`, `PATCH`, `DELETE`
  * Custom-defined actions and functions 
* [Asynchronous Event Messsages](https://github.wdf.sap.corp/cap/issues/issues/4665?email_source=notifications&email_token=AAAFI7G4LUUNI6YQV4Z3QOLRPZVORA5CNFSM4ABNMMMKYY3PNVWWK3TUL52HS4DFVREXG43VMVBW63LNMVXHJKTDN5WW2ZLOORPWSZGOAAQKM6Y#issuecomment-2139771) received thru message brokers:
  * ~~Common entity-level events: `CREATED`, `CHANGED`~~
  * ~~Custom-defined events and message topics~~

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1588570700/CAP-Events-Lifecycle_7_vm6xrg.png)

---

## Events



* focus on the `on` event
* use `before` hook do the input validation
* use `after` hook do the data transform
* register single event for single entity only **ONCE**
* careful to process `before/after` (it also will trigger `ROLLBACK`)
* async processing with `async` function
* using standalone transaction or join request context transaction
* careful check your code. [error dump logic](https://github.wdf.sap.corp/cdx/cds-services/blob/master/lib/adapter/odata-v4/handlers/error.js#L3), [config](https://github.wdf.sap.corp/CentralInvoices/workflow-service/blob/e2960467efc81687451f35b68e2b1229d52837e8/workflow-service/srv/WorkflowService.js#L113)

---

## Service Impl -- class

> some limitation, not recommend

```js
module.exports = class IndexService {

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

## Events - custom event



* Action - `WRITE` - `POST`
* Function - `READ` - `GET`

---

## [`Declarative` UI](https://cap.cloud.sap/docs/guides/fiori/)



* [SAP OData UI Annotation](https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md)
* [Annotation based Custom Actions](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=fioritech&title=Annotation+based+Custom+Actions)

--- 

## CAP Application Necessary



* cds & sap-hana & sqlite dependency
* cds configuration (in the `package.json` or `.cdsrc` file)
* entity & service implementation

---

## Deployment

> if you are using the `cap-01` template project, please remember CHANGE the `directory name` & `package.json.name` 

* cloud foundry & cf cli & quota
* application source code
* hana instance
* `cds build` project

---

## Tips



* **many-2-many** association is not released until 2020 Q4
* custom **action** is used to `WRITE`
* custom **function** is used to `QUERY`
* use `NODE_ENV` control the CAP running profile (local sqlite/remote hana).
* directory name/package name/service name should be same.
* remember to add the mandatory columns to the initialize CSV file(e.g. PK)
* maybe there are some issues in the `CDS deploy` now.
* use fixed `@sap/cds` version.
* `debug` server if you don't know the object detail.


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