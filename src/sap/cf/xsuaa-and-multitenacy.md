---
marp: true
---
<style>
section {
  background-color: black;
  color: white;
}
th {
  background-color: black;
  color: white;
}
td {
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

# XSUAA and Multitenancy

<br>

<br>

Theo Sun
2020

---

## [XSUAA](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/6373bb7a96114d619bfdfdc6f505d1b9.html)

<br>

> The User Account and Authentication service (UAA) is the central infrastructure component of the Cloud Foundry environment at SAP Cloud Platform for user authentication and authorization.

---


<br>

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1604047529/2020-10-30_16-45-22_xkxa9z.png)

---

## Authentication - Trust

<br>

Trust a SAML IDP, and all user/credential is from that.

<br>

![](https://res.cloudinary.com/digf90pwi/image/upload/v1604047377/2020-10-30_16-42-05_nlsqu6.png)

---

## Authentication Flow - Browser

<br> 

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1604048620/uaa_sequence_flow_lcveic.png)


---

## Authentication Flow - JWT

<br>

- json web token
- environment
- how to verify

<br>

> microservice could use jwt to authentication request (no status).

---

## Authentication Flow - User/Password

<br>

> microservice could impl the http basic authentication with the [OAuth Password Grant](https://docs.cloudfoundry.org/api/uaa/version/74.27.0/index.html#password-grant)

---

`XSUAA` act as OAuth2 Server, provide authentication & authorization features.

Each `Sub Account` will have its own `UAA` tenant.


--- 

## XSUAA - [Service Definition](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.04/en-US/6d3ed64092f748cbac691abc5fe52985.html)

<br>

- Tenant Mode
- Scopes (`Local` or Foreign)
- Attributes
- Role Templates
- OAuth2 Configurations

---

## XSUAA - Runtime

<br>

- Role (create or generated from `Role Templates`, if role defined `attributes`, user could input value or mapped from IDP)
- Role Collection (with multi `Roles`, Assign to user)

<br>

> Each `Sub Account` has its own UAA tenant, so that each `Sub Account` could configure its own authorization (in theory).

---

## XSUAA - Permission Check in Application

<br>

- scope (application defined, static)
- attributes (application defined, sub account UAA configured)
- role collection (sub account UAA defined)

--- 

## [SaaS Provision](https://pages.github.tools.sap/kernelservices/services/subscription-management-service)

<br>

> Service for application providers to register multitenant applications and services

---

## SaaS Provision - how it works ?

<br>

- `SaaS Provision`: create a `service` in `subscription` tab in same `Global Account`
- `User`: when other `sub account` under the `Global Account` click the `subscribe` button.
- `SaaS Provision`: send a http request to SaaS application, with metadata
- `SaaS`: receive subscription information, initialize the database/job/url, and response a `tenant url`.
- `SaaS Provision`: refresh status, `subscribed`
- `User`: access the SaaS with `tenant` url.

---

## SaaS Provision - how it works with UAA?

<br>

- Login with Browser - SaaS will extract a tenant id from `tenant url` to redirect to the correct UAA instance, and the correct UAA tenant will response correct user information.
- Login with JWT - SaaS could use the `jku` in JWT to retrieve public key (trust SAP host), then verify the `jwt`.
- Sub Account UAA - Each `sub account` will have its own `UAA` instance, and `sub account admin` could configure the UAA tenant.
- Access Token - generated/signed by UAA, and it will attach the `Authorization` & `Tenant` information.