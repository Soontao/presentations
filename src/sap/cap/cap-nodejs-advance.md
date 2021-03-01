---
marp: true
theme: dark
---

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

> deploy the `db` module is slowly

- [enable hana cloud remote access](https://gist.github.com/Soontao/2d39877071ed0574377fcdb68a1c58df)
- `cds build`, build the `SAP HANA` artifacts
- create `default-env.json` to `gen/db`, includes the hana connection information
- `npm install & npm start` at `gen/db`

---

## Interact with CQN (Query)

- grant
- req.query (`CSN`)
- dynamic change query by other parameters

---

### Interact with CQN (grant)

> declarative grant & limit query

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
    // fallback
    grant : 'READ',
    where : 'fullEntity.column in (select value from authAssign where employee_email = $user)'
  }
]) as select from fullEntity;
```

---

### Interact with CQN (`req.query`) (for nodejs)

> programable limit query, [CAP Java Runtime link](https://cap.cloud.sap/docs/java/query-introspection)

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

## CDS Authorization Advance

> some topics about authorization

- `grant` with sub query
- **multi** `grant` with fallback
- `system-user`/`authenticated-user`
- application just check the **SCOPE** instead of **UAA ROLE**

> keep declarative authorization annotations **simple**.

---

## Debug

> aha, **DEBUG** is important

- local debug
- local debug with xsuaa
- remote debug (online)

---

### Debug with user information

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

### Remote Debug

> more steps ref [this documents](https://github.com/Soontao/cf-node-debug-example)

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
      "skipFiles": [
        "<node_internals>/**"
      ]
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

> `lock` and `sync`, though the `nodejs` is `single thread`, use [`Mutex`](https://newdash.netlify.fornever.org/classes/mutex.html) or [`Semaphore`](https://newdash.netlify.fornever.org/classes/semaphore.html) to keep your code only run once in async operations.

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

- cf-nodejs-logging-support

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

## Uncaught Exception

cds nodejs runtime defined the [default behavior](https://github.wdf.sap.corp/cdx/cds/blob/1176cba8e1469e56073b15398e3d9681f01aa29e/bin/cds.js#L55) when the uncaught exception happened.

```js
module.exports = srv => {
  srv.on("queryAny", async () => {
    // an example will cause server down
    new Promise((resolve, reject) => { reject(new Error()) })
  })
}
```

---

## Cluster

> enable cluster to automatic restart server on failure (fast than cloud foundry)

- [Cluster Example](https://gist.github.com/Soontao/8e63daa8cae5d03af1ebd182c143115b)
