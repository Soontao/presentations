---
marp: true
theme: dark
---

# XSUAA and Multitenancy

Theo Sun
2020

---

## [XSUAA](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/6373bb7a96114d619bfdfdc6f505d1b9.html)

> The User Account and Authentication service (UAA) is the central infrastructure component of the Cloud Foundry environment at SAP Cloud Platform for user authentication and authorization.

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1604047529/2020-10-30_16-45-22_xkxa9z.png)

---

## Authentication - Trust


Trust a SAML IDP, and all user/credential is from that.

![](https://res.cloudinary.com/digf90pwi/image/upload/v1604047377/2020-10-30_16-42-05_nlsqu6.png)

---

# Authentication Flow - Browser

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1604048620/uaa_sequence_flow_lcveic.png)

---

## Authentication Flow - JWT

- json web token
- environment
- verify

> microservices could use jwt to authentication request (no status/no remote call).

---

## Authentication Flow - User/Password

> microservice could impl the http basic authentication with the [OAuth Password Grant](https://docs.cloudfoundry.org/api/uaa/version/74.27.0/index.html#password-grant)


--- 

## XSUAA - Authorization - [Service Definition](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.04/en-US/6d3ed64092f748cbac691abc5fe52985.html)

- Tenant Mode
- Scopes (`Local` or Foreign)
- Attributes
- Role Templates
- OAuth2 Configurations

---

## XSUAA - Authorization - Runtime



- Role (create or generated from `Role Templates`, if role defined `attributes`, user could input value or mapped from IDP)
- Role Collection (with multi `Roles`, Assign to user)

> Each `Sub Account` has its own UAA tenant, so that each `Sub Account` could configure its own authorization.

---

## XSUAA - Runtime - Permission Check

> prefer use scope to check permission

- scope (application defined, static)
- attributes (application defined, sub account UAA configured)
- role collection (sub account UAA defined)


---

## XSUAA - Key Points

- provide ui to configuration RBAC & IDP integration.
- act as `SAML` service provider.
- act as `OAuth2` server, provide authentication & authorization features.
- each `Sub Account` will have its own `UAA` tenant.
- for the `End Users`, they don't know the `scope` concepts.

--- 

## XSUAA - Others


- Multi IDP configuration ?
- `UAA` use a private key sign the `JWT`, client could not generate a valid `JWT` - how to pass parameters (like feature flags) with `JWT` ? 
- expiration about `JWT` - how to process it in application ?
- `Create Shadow Users During Logon` ?
- API Authentication ?


---

## [SaaS Provision](https://pages.github.tools.sap/kernelservices/services/subscription-management-service)

> Service for application providers to register multitenant applications and services

---

## SaaS Provision - how it works ?

- `SaaS Provision`: create a `service` in `subscription` tab.
- `User` (another `sub account admin`): click the `subscribe` button.
- `SaaS Provision`: send a http request to SaaS application, with metadata
- `SaaS`: receive subscription information, initialize the database/job/url, and response a `tenant url`.
- `SaaS Provision`: refresh status, `subscribed`
- `User`: access the SaaS with `tenant` url.


---

## SaaS Provision - how it works with UAA?

- Login with `Browser` - SaaS will extract a tenant id from `tenant url` to redirect to the correct UAA instance, and the correct UAA tenant will response correct user information.
- Login with `JWT` - SaaS could use the `jku` in JWT to retrieve the signature public key of UAA (trust SAP host), then verify the `jwt`.
- Sub Account UAA - Each `sub account` will have its own `UAA` instance, and `sub account admin` could configure the UAA tenant.
- Access Token - generated/signed by UAA, and it will attach the `Authorization` & `Tenant` information.

---

## SaaS Provision - Key Points

- provide UI to other user to subscribe custom service/product
- define the standard subscription APIs

---

## SaaS Provision - Others



- SAP & Business Partners' commercial products could be available cross `Global Account`, and customers services will be limited in the same `Global Account`.
- SaaS Application should build the metering/dashboard and other features about subscription/multitenancy.


---

## Related SAP Programming Components

- [sap-cloud-security-xsuaa-integration (java)](https://github.com/SAP/cloud-security-xsuaa-integration)
- [@sap/xssec (nodejs)](https://github.wdf.sap.corp/CPSecurity/node-xs2sec)
- [approuter (gateway)](https://github.wdf.sap.corp/xs2/approuter.js)