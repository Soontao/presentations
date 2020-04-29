---
marp: true
---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582530996/Nodejs-banner-1_dx6z63.jpg)

<br>

# Node JS Training: Session 5 - CAP Framework Basics

---

## Agenda - CAP Framework Basics

* Q & A
* CAP
  * introduction
  * Environment Setup
  * Basic demo
  * Deployment


---

## [CAP Framework](https://cap.cloud.sap/docs/about/)

<br>

The SAP Cloud Application Programming Model is an open and opinionated, framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers through proven best practices and a great wealth of out-of-the-box solutions for recurring tasks.

---

## Links

<br>

* [CAP Framework Organization](https://github.wdf.sap.corp/cap)
* [Roadmap](https://github.wdf.sap.corp/cap/matters/projects/33#card-138161)
* [CAP Issues](https://github.wdf.sap.corp/cap/issues/issues)
* [Setup Environment](https://cap.cloud.sap/docs/get-started/)


---

## Events

<br>

* Synchronous Requests sent from UIs, frontends, or other services:
  * Common CRUD methods: `CREATE`, `READ`, `UPDATE`, `UPSERT`, `DELETE`
  * Common REST methods: `POST`, `GET`, `PUT`, `PATCH`, `DELETE`
  * Custom-defined actions and functions 
* Asynchronous Event Messsages received thru message brokers:
  * Common entity-level events: `CREATED`, `CHANGED`
  * Custom-defined events and message topics


---

## Declarative UI

<br>

* [SAP OData UI Annotation](https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md)

---

## Tips

<br>

* prefer to use `function` to implement `service`.
* use `NODE_ENV` control the CAP running profile (local sqlite/remote hana).
* Directory name/package name/service name should be same.
* Please remember to add the mandatory columns to the initialize CSV file(e.g. PK)
* Maybe there are some issues in the `CDS deploy` now.