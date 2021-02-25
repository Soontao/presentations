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

* [enable hana cloud remote access](https://gist.github.com/Soontao/2d39877071ed0574377fcdb68a1c58df)
* `cds build`, build the hana artifacts
* create `default-env.json` to `gen/db`, includes the hana connection information.
* `npm install & npm start` at `gen/db`.

---

## Interact with CQN (Query)

- grant
- req.query (`CSN`)
- dynamic change query by other parameters

---

## CDS Authorization Advance

- `grant` with sub query
- **multi** `grant` with fallback
- `system-user`

---

## Debug

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

## OData V2 Support

- use [cds-odata-v2-adapter-proxy](https://www.npmjs.com/package/@sap/cds-odata-v2-adapter-proxy)
- remember defined the `key` for view/query, because the adapter is not support the collection without key

---

## Logging

> integrate with `application-logging`
> built-in integration is in-progress

- cf-nodejs-logging-support

---

## Cluster

> enable cluster to automatic restart server on failure (fast than cloud foundry)

- [example](https://gist.github.com/Soontao/8e63daa8cae5d03af1ebd182c143115b)

--- 

## Unit Test

> use SAP internal API to perform tests

- [Example](https://github.com/Soontao/cap-unit-test-example)


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





