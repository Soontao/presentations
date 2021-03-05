---
marp: true
theme: dark
---

![blur bg 50%](https://cap.cloud.sap/docs/assets/logos/cap.svg)

# CAP NodeJS Runtime Advance 

Theo Sun
2021

---

## HANA CSV import issues

- CSV will deploy failed when includes empty lines
- CSV will deploy failed when `ID` field lost
- [CSV deploy will **ERASE** DB table if content changed ](https://cap.cloud.sap/docs/guides/databases#providing-initial-data)
- deploy at local (quick check hana issues)

---

### HANA Deploy - deploy at local

> save your time

- [enable hana cloud remote access](https://gist.github.com/Soontao/2d39877071ed0574377fcdb68a1c58df)
- `cds build`, build the `SAP HANA` artifacts
- create `default-env.json` to `gen/db`, includes the hana connection information
- `npm install & npm start` at `gen/db`

> or

- simply use `cds deploy -2 hana`

---

### HDB Table Data Issue

> How it works ?

ERASE DATA ON (by default):

- schema change -- `OVERWRITE` with CSV
- csv content change -- `OVERWRITE` with CSV
- hdi undeploy -- `CLEAN` ALL DATA

---

### HDB Table Data Issue Links

- [Data lost for table even after updating in undeploy.json](https://github.wdf.sap.corp/cap/issues/issues/6735)
- [CSV un-deployment is executed multiple times and deletes all custom data from the table](https://github.wdf.sap.corp/xs2/hdideploy.js/issues/764)
- [Table Data (.hdbtabledata)](https://help.sap.com/viewer/3823b0f33420468ba5f1cf7f59bd6bd9/2.0.04/en-US/35c4dd829d2046f29fc741505302f74d.html)

---

### HDB Table Data Issue

> How to solve ?

- [`include_filter`](https://gist.github.com/Soontao/b18044f11e77f057ff9b7f7d6af58469#file-custom_a_db_people-hdbtabledata-json-L22) - where **predefined** == true, it will deploy & undeploy with filter
- **BACKUP** is important
- DO NOT use `.hdbtabledata` anymore
- or build [a simply CSV migration script](https://github.com/Soontao/cds-mysql/blob/main/bin/cds-mysql-deploy.js#L91-L170) with primary keys verification for initial data provision

---

## CDS Authorization Advance

> some topics about authorization

- `grant` with sub query
- **multi** `grant` with fallback
- modify `req.query` ([CQN](https://cap.cloud.sap/docs/cds/cqn)) with programming API
- `system-user`/`authenticated-user`
- application just check the **SCOPE** instead of **UAA ROLE**

> keep declarative authorization annotations **simple**.

---

### Declarative `grant` advance

> fallback & sub query in `grant`

```js
entity limitedEntity @(restrict : [
  {
    grant : 'READ',
    to    : [
      'system-user', // client_credentials token
      'FullReportAccess' // business user with 'FullReportAccess' scope
    ]
  },
  {
    // fallback for normal user
    grant : 'READ',
    where : 'fullEntity.column in (select value from authAssign where employee_email = $user)'
  }
]) as select from fullEntity;
```

---

### Interact with CQN (`req.query`) (for nodejs)

> programable `query` modification, [CAP Java Runtime API link](https://cap.cloud.sap/docs/java/query-introspection)

```js
// really simple event handler
srv.before("READ", "Peoples", async (req) => {
  /** @type {import("@sap/cds/apis/ql").SELECT} */
  const query = req.query
  query.where({ Age: { ">": 99 } })
})
```

```sql
-- generated SQL
SELECT   id, createdat, createdby, modifiedat, 
         modifiedby, NAME, age, date 
FROM     custom_a_srv_anyservice_peoples ALIAS_1 
WHERE    age > 99 
ORDER BY id ASC limit 1000 []
```


---

## Configuration Files

> some configuration file in `CAP`

- `package.json` -> `cds`
- `default-env.json`
- `.env`
- `.vscode/settings.json`

---

## Debug

> aha, **DEBUG** is important

- local debug
- local debug with xsuaa/hana
- remote debug (online)

---

### Debug with mock user information

> debug with [mock user](https://cap.cloud.sap/docs/node.js/authentication#-configuring-specific-users)

```json
{ "cds":
  { "[development]": // development only
    { "auth":
      { "passport":
        { "strategy":"mock",
          "users": 
            { "admin@aiib.mock.com": // req.user.id
              { "roles":[
                  // uaa scope
                  "FullReportAccess"
              ]
}}}}}}}
```

---

### Debug with HANA & XSUAA

> set `NODE_ENV` to `production`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debug server (production)",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/@sap/cds/bin/cds.js",
      "args": [ "run" ],
      "env": { "NODE_ENV": "production" },
      "skipFiles": [ "<node_internals>/**" ]
    },
  ]
}
```

---

### Debug with HANA only

> set `NODE_ENV` to `local-hana`, `production` will disable mock users

```json
{
  "cds": {
    "[local-hana]": {
      "requires": {
        "db": { "kind": "hana" }
      },
      "auth": {
        "passport": { "strategy": "mock" }
      }
    }
  }
}

```

---

### Remote Debug

> check more details in [this documents](https://github.com/Soontao/cf-node-debug-example), also, there is a [document](https://community.pivotal.io/s/article/How-to-Remotely-Debug-Java-Applications-on-Cloud-Foundry?language=en_US) for java/spring

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "debug remote server",
      "address": "127.0.0.1",
      "port": 39999,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/home/vcap/app",
      "skipFiles": [ "<node_internals>/**" ]
    },
  ]
}
```

---

## Cache

> Simply cache not-frequent-changed items to improve the performance, use `@newdash/newdash/cacheProvider` or `node-cache` is enough

```js
const { TTLCacheProvider } = require("@newdash/newdash/cacheProvider");

const user_cache_by_user_id = new TTLCacheProvider(DEFAULT_CACHE_SECONDS);

async function queryCurrentUser (srv, req) {
    const userId = req.user.id;
    return user_cache_by_user_id.getOrCreate(userId, async () => {
        const { Users } = srv.entities(NAMESPACE.employee);
        const user = await srv.run(SELECT.one.from(Users).where({ email_add: userId }));
        return user;
    });
}
```

---


## Concurrency

> `lock` and `sync`, though the `nodejs` is `single thread`, use [`Mutex`](https://newdash.netlify.fornever.org/classes/mutex.html) or [`Semaphore`](https://newdash.netlify.fornever.org/classes/semaphore.html) to make the async operations are executed synchronized.

```js
const { Mutex } = require("@newdash/newdash/functional/Semaphore")
```

[An Example (only presenter can open it)](https://github.wdf.sap.corp/AIIB-Project/CAS/blob/408725bf78916ea06a5670e80a6421d16ea22d27/srv/util/oauth-client.js#L73)


---

## OData V2 Support

> IF YOU WANT.

- use [cds-odata-v2-adapter-proxy](https://www.npmjs.com/package/@sap/cds-odata-v2-adapter-proxy)
- remember defined the `key` for view/query, because the adapter is not support the collection without key

---

## Logging

> integrate with `application-logging`
> built-in integration is in-progress

- [cf-nodejs-logging-support](https://github.com/SAP/cf-nodejs-logging-support)

--- 

## Unit Test

> use SAP internal API to perform unit tests

- [Example](https://github.com/Soontao/cap-unit-test-example)
- [Complex Example](https://github.com/Soontao/cds-mysql/blob/main/test/integration.test.ts)


```js
const cds = require("@sap/cds")
const server = cds.test('.').in(__dirname, "..")

describe('Any Service Test Suite', () => {
  it('should support query', async () => {
    const response = await server.GET("/any/Peoples")
    expect(response.data.value.length).toBe(0)
  });
});
```

---

## Uncaught Exception in NodeJS

cds nodejs runtime defined the [default behavior](https://github.wdf.sap.corp/cdx/cds/blob/1176cba8e1469e56073b15398e3d9681f01aa29e/bin/cds.js#L55) when the uncaught exception happened.

```js
module.exports = srv => {
  srv.on("queryAny", async () => {
    // an example will cause server down
    new Promise((resolve, reject) => { reject(new Error()) })
  })
}
```

[Github Issue](https://github.wdf.sap.corp/cap/issues/issues/7396)

---

### Uncaught Exception - use `Cluster`

> enable cluster to automatic restart server on failure (fast than cloud foundry)

- [CAP Cluster Example](https://gist.github.com/Soontao/8e63daa8cae5d03af1ebd182c143115b)

---

## Security Topics

> To solve problems from pentest 

- `CSRF` protection is fulfilled by `approuter` 
- `Host`/`X-Forwarded-Host` injection

--- 

## Security Topics - `Host`/`X-Forwarded-Host` injection

> example snippet in `server.js`

```js
app.use(req => {
  const hostname = req.hostname
  if (ALLOWED_HOSTNAME.includes(hostname)) {
    req.next()
  } else {
    req.res.status(400)
    req.next(new Error(`not allowed hostname ${hostname}`))
  }
})
```

---

## MTA Topics

- `cf deploy` alert `memory quota exceed`, reduce `app-deployer` `db-deployer` memory to `256M`
- `xsuaa` `api-access` plan DO NOT support `update configuration` -> existing-service
- `IDP_ORIGIN` is different from `ADFS` tenants -> set it to mta properties (CF Environment Variables)

---

## Links

- [CAP Github Issue](https://github.wdf.sap.corp/cap/issues/issues)
- [CAP Internal Documentation](https://github.wdf.sap.corp/pages/cap/)
- [HDI Deploy](https://www.npmjs.com/package/@sap/hdi-deploy)
- [SAP JSON Schema](https://marketplace.visualstudio.com/items?itemName=TheoSun.sap-json-schemas)
- [cds-mysql](https://github.com/Soontao/cds-mysql) and [cds-pg](https://github.com/sapmentors/cds-pg)

---

# Thanks :)