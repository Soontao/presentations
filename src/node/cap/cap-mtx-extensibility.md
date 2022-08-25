---
marp: true
theme: dark
---

![blur bg 50% right](https://cap.cloud.sap/docs/assets/logos/cap.svg)

# CAP Extensibility

Theo Sun
2022

---

> `cds-mtx` is out of date after `@sap/cds@6`, please use `cds-mtxs` directly

---

## BTP SaaS Extensibility

> As a SaaS application provider, you want customers who have subscribed to the application to be able to extend it. Customers can extend CDS `entities` and `services` defined by the base model of the SaaS application. Those extensions will then be reflected, for instance, in tenant-specific OData metadata and SAP HANA database schemas.

---

## What we configured

- xs-security.json
- `cds.requires.mtx`

---

## What user should do

- cds login
- cds extend
- cds activate

---

## Capability

- add real database column into database table
- apply changes in data and UI level (FE annotation)

---

## About the `cds.model` for extensibility

- global `cds.model` not respect the extensibility
- need additional concern for implementation

---

## Problems we found

- [could not activate extension when multi-instance enabled](https://github.tools.sap/cap/issues/issues/12181)
- [\_locaized (\_texts) definitions for extensibility](<![](https://github.tools.sap/cap/issues/issues/11987)>)
- [allow list is not worked as expected](https://sap.stackenterprise.co/questions/15212/15226)

---

## Thanks
