---
marp: true
theme: dark
---

![blur bg 50% right](https://cap.cloud.sap/docs/assets/logos/cap.svg)

# CAP Extensibility

> OOB `cds-mtx` extensibility support

Theo Sun
2022

---

> `cds-mtx` is out of date after `@sap/cds@6`, please use `cds-mtxs` directly for new product

---

## BTP SaaS Extensibility

> As a SaaS application provider, you want customers who have subscribed to the application to be able to extend it. Customers can extend CDS `entities` and `services` defined by the base model of the SaaS application. Those extensions will then be reflected, for instance, in tenant-specific OData metadata and SAP HANA database schemas.

---

## What we configured

- xs-security.json
  - `$XSAPPNAME.ExtendCDS`
  - `$XSAPPNAME.ExtendCDSdelete`
- `cds.requires.mtx`
  - allowlist
  - blocklist
  - element prefix

---

## What user should do

- cds login
- cds extend
- cds activate

---

## About the `cds.model` for extensibility

- global `cds.model` not respect the extensibility
- need additional concern for implementation

---

## How it works

- create 2 HDI container for each tenant, one is `META`
- when `cds activate`, upload artifacts to `mtx` and store them in `META` HDI container, then build/deploy to database
- when `upgrade`, pull extensions in `META` HDI container and merge with new version cds definition of product, then do the deployment
- when creating odata service, check the tenant is extended or not, if extended, re-build model from `META` database

---

## Pros and Cons

### Pros

- OOB, easy to setup for SaaS application
- same syntax for development and extension
- add real database column into database table
- enhance existed service
- apply changes in data and UI level (FE annotation)

### Cons

- conflict with `hdbmigrationtable` - `Schema Evolution`
- not work well with CAP application is developed with too much freestyle UI5
- cds compiler so slowly, almost unavailable
- not provided undeploy option for extension

---

## Problems we found

- [could not activate extension when multi-instance enabled](https://github.tools.sap/cap/issues/issues/12181)
- [\_locaized (\_texts) definitions for extensibility](https://github.tools.sap/cap/issues/issues/11987)
- [allow list is not worked as expected](https://sap.stackenterprise.co/questions/15212/15226)

---

## Thanks
