---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 6 - CAP Framework Basics

---

## Agenda - CAP Framework Basics

<br>

* Q & A
  * problems
    * type definition
    * packaged node_modules
    * express path match
  * homework answers
* CAP
  * Introduction
  * Environment Setup
  * Basic demo
  * Deployment


---

## [CAP Framework](https://cap.cloud.sap/docs/about/)

<br>

The SAP Cloud Application Programming Model is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

--- 

## ABBR.

<br>

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

<br>

* type & aspect
* (`abstract`) entity
  * csv data import
* service
  * service entity
  * service impl

---

## [Events](https://cap.cloud.sap/docs/guides/providing-services#handling-events)

<br>

* Synchronous Requests sent from UIs, frontends, or other services:
  * Common CRUD methods: `CREATE`, `READ`, `UPDATE`, `UPSERT`, `DELETE`
  * Common REST methods: `POST`, `GET`, `PUT`, `PATCH`, `DELETE`
  * Custom-defined actions and functions 
* Asynchronous Event Messsages received thru message brokers:
  * Common entity-level events: `CREATED`, `CHANGED`
  * Custom-defined events and message topics

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1588229662/CAP-Events-Lifecycle_2_pxphpm.png)

---

## Events

<br>

* `throw Error` in `before`/`on` events
* async processing
* automatic transaction rollback
* careful check your code. [error dump logic](https://github.wdf.sap.corp/cdx/cds-services/blob/master/lib/adapter/odata-v4/handlers/error.js#L3), [config](https://github.wdf.sap.corp/CentralInvoices/workflow-service/blob/e2960467efc81687451f35b68e2b1229d52837e8/workflow-service/srv/WorkflowService.js#L113)

---

## Service Impl -- class

<br>

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

## Service Impl -- others

<br>

* events life-cycle
* [transaction](https://cap.cloud.sap/docs/node.js/api#cds-transaction)

---

## [`Declarative` UI](https://cap.cloud.sap/docs/guides/fiori/)

<br>

* [SAP OData UI Annotation](https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md)
* [Annotation based Custom Actions](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=fioritech&title=Annotation+based+Custom+Actions)

--- 

 

## CAP Application Necessary

<br>

* cds & sap-hana & sqlite dependency
* cds configuration (in `package.json` or `.cdsrc`)
* entity & service

---

## Deployment

> if you are using the `cap-01` template project, please remember CHANGE the `directory name` & `package.json.name` 

* cloud foundry & cf cli & quota
* application source code
* hana instance
* `cds build`

---

## Tips

<br>

* prefer to use `function` to implement `service`.
* use `NODE_ENV` control the CAP running profile (local sqlite/remote hana).
* batch in event processing ?
* directory name/package name/service name should be same.
* please remember to add the mandatory columns to the initialize CSV file(e.g. PK)
* maybe there are some issues in the `CDS deploy` now.
* use fixed `@sap/cds` version.
* `debug` if you don't know.

