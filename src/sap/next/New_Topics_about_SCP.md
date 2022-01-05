---
marp: true
theme: dark
---

# New Topics about SAP Cloud Platform

Theo Sun, 2022

**SAP Internal Only**

---

## BTP - [Business Technology Platform](https://jam4.sapjam.com/groups/ZM9tpODrP8MI5tPjwMOljn/overview_page/zSwBpo0FwmMp2jqWLqfccR)

## OPP - ONE Platform Program (Culture level)

---

## SCP [North Star](https://jam4.sapjam.com/groups/eopqUq5S182gY7JFrbdwis/documents/JAUOawjNR9Gtc1KH8HHxqe/slide_viewer)



> To describe the SAP Cloud Platform Architecture of the main constituting components and services as it is implemented today and how it will look like in the next `six` to `twelve` months. 

---

## CPF - [CP Foundation](https://wiki.wdf.sap.corp/wiki/display/CPC15N/%5B8%5D+Architecture) & [Kernel Services](https://pages.github.tools.sap/kernelservices/)



* [ONE INBOX](https://pages.github.tools.sap/kernelservices/services/one-inbox) - centralized inbox for all sap products, [video](https://sap.sharepoint.com/teams/Nucleus491/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FNucleus491%2FShared%20Documents%2FGeneral%2FEnablement%2FServices%2FOne%20Inbox%2FOne%5FInbox%5F20190529%2Emp4&parent=%2Fteams%2FNucleus491%2FShared%20Documents%2FGeneral%2FEnablement%2FServices%2FOne%20Inbox&p=true&originalPath=aHR0cHM6Ly9zYXAuc2hhcmVwb2ludC5jb20vOnY6L3QvTnVjbGV1czQ5MS9FVjBDNXdrS1prWkZpUktIZENqblY4Y0JyWDI1SG9MQktOaDhGLVVGS0lodTJnP3J0aW1lPUZUQ0NXNlp4MkVn)
* [DATA PRIVACY INTEGRATION](https://pages.github.tools.sap/kernelservices/services/data-privacy-integration) [video](https://web.microsoftstream.com/video/5d9b856f-1120-4e38-bf7f-87c9a7456414)
* [AUDIT LOG SERVICE](https://pages.github.tools.sap/kernelservices/services/audit-log-service)
* [SERVICE DISCOVERY AND MANAGEMENT]() - cross platform service management
* Enterprise Messaging (Public MQ Service)
* Identity Service

--- 

## [SCP Essential Services](https://jam4.sapjam.com/groups/eopqUq5S182gY7JFrbdwis/documents/RBxbQ8sVXypSikB4GCRue2/slide_viewer)



* Internal MUST have - Redis/MongoDB
* Internal MUST have - Kafka/RabbitMQ

---

## [Kyma](https://jam4.sapjam.com/groups/QrsMLb8Me6YjlNkgcm5Ku4/overview_page/tLlAcv2d7pnec96CnnHPjV)



> SAP Cloud Platform Extension Factory, Kyma runtime has been renamed to `SAP Cloud Platform, Kyma runtime`. This new naming is now in line with the naming guidelines for other services and runtimes of Cloud Platform, like `SAP Cloud Platform Cloud Foundry runtime`, `SAP Cloud Platform ABAP runtime`, etc.

> For event based extension.

---

## [SAP Gardener](https://wiki.wdf.sap.corp/wiki/display/Kubernetes/Roadmap)



> Kubernetes-as-a-Service, manage k8s cluster.



Operation Team Tool, [Internal Demo System](https://dashboard.canary.gardener.cloud.sap/)

---

## New [Embedded Steampunk](https://wiki.wdf.sap.corp/wiki/display/A4C/Embedded+Steampunk) for S/4 Extension



> SAP Cloud Platform, ABAP environment (aka `Steampunk`).

> In short, `Steampunk` features modern technology with a retro look.



Provide the `STABLE` `LIMITED` API to `embedded steampunk` to extension.



[Use Cases](https://wiki.wdf.sap.corp/wiki/display/A4C/Embedded+Steampunk+-+Use+cases)

---

## RAP - ABAP [RESTful Application Programming](https://help.sap.com/viewer/923180ddb98240829d935862025004d6/Cloud/en-US/289477a81eec4d4e84c0302fb6835035.html) Model
## CAP - Java/NodeJS [Cloud Application Programming](https://cap.cloud.sap/docs/)


---

## Resilience/Elasticity/Multi-Tenant Isolation



Improve **`Availability`**, we are delivering cloud service.

---

## UI5 Evolve



* [UI5 Tooling](https://sap.github.io/ui5-tooling/)
* [Fundamental](https://sap.github.io/fundamental-react/)
* [Fiori Elements](https://blogs.sap.com/2020/09/22/controlling-cap-actions-on-fiori-ui/)




--- 

## SAP Graph



Next Generation API Hub, standardize API development experience (Public), [Beta System](https://beta.graph.sap/).

---

## Edge LM - [Edge Lifecycle Management](https://sap.sharepoint.com/:w:/s/123236/edge/EcVMxlPveblMq525BqsbIf0BdEb8PuNZTxY__VGeq9YkJA?e=9zSTKW)



* Edge software components must be `containerized` and need to run on K8s.
* K8S based infra (Edge side).

---

## [Replacement Terms](https://help.sap.com/doc/b0322267728e48a28b0c8ee7dd1ab4c7/1.0/en-US/Inclusive%20Language%20Guidelines.pdf)



* master/feature -> main/feature
* master/slave -> leader/follower, leading/replica
* whitelist/blacklist -> allowlist/blocklist

---


## [Technology Guidelines](https://github.tools.sap/CentralEngineering/TechnologyGuidelines)



> Technology Guidelines ensure out-of-the-box integration, modularity, ease of extension, and consistent experience across the Intelligent Enterprise business processes.