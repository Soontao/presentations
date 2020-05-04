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
  background-color: rgba(51, 154, 243, 1);
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

# Node JS Training: Session 6 - CAP Framework

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

<br>

> The SAP Cloud Application Programming Model is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

* CAP - Cloud Application Programming
* CDS - Core Data Service


---

## Links


<br>

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
* ~~Asynchronous Event Messsages received thru message brokers:~~
  * ~~Common entity-level events: `CREATED`, `CHANGED`~~
  * ~~Custom-defined events and message topics~~

> document about `async events` is lost 

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1588566758/CAP-Events-Lifecycle_6_lxcd62.png)

---

## Events

<br>

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

<br>

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




## [`Declarative` UI](https://cap.cloud.sap/docs/guides/fiori/)

<br>

* [SAP OData UI Annotation](https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md)
* [Annotation based Custom Actions](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=fioritech&title=Annotation+based+Custom+Actions)

--- 

## CAP Application Necessary

<br>

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

<br>

* **many-2-many** association is not released until 2020 Q4
* custom **action** is used to `WRITE`
* custom **function** is used to `QUERY`
* use `NODE_ENV` control the CAP running profile (local sqlite/remote hana).
* directory name/package name/service name should be same.
* remember to add the mandatory columns to the initialize CSV file(e.g. PK)
* maybe there are some issues in the `CDS deploy` now.
* use fixed `@sap/cds` version.
* `debug` server if you don't know the object detail.

