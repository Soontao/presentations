---
marp: true
theme: dark
---

![blur bg 50% right](https://cap.cloud.sap/docs/assets/logos/cap.svg)

# Test for CAP NodeJS Runtime

## Expert Level Session

Theo Sun
2022

---

## Questions

- How do you test your handler ?
- How do you think about the `cds.test` utils ?
- Whats the relationship between 
  - `cds.ApplicationService` 
  - `cds.DatabaseService`
- Is that possible to test a single `cds.ApplicationService` fast and correct ?

---

## The Official Way - `cds.test`

```js
describe('People Service Int Test', () => {
  /**
   * @type {{axios:import("axios").AxiosInstance}}
   */
  const { axios } = cds.test(".").in(__dirname, "..")
  axios.defaults.validateStatus = () => true
  // if you enabled the basic auth for local development
  // axios.defaults.auth = { username: "user", password: 'pass' }

  it('should support validate the length of Name', async () => {
    const response = await axios.post("/people/EarthPeoples", { "Name": "theo" })
    expect(response.status).toBe(500)
    expect(response.data.error.message).toBe("invalid name")
  });
});
```

- [Test Case Example](https://github.wdf.sap.corp/I337313/brc-hand-on-session-repo/blob/main/test/people-service-int.spec.js)
- [Axios Example](https://github.com/axios/axios#example)

---

## The Official Way - `cds.test` - key points

- test your code by `HTTP Client` firstly
- add correct `JSDoc` make test case written easily
- configure the `axios.defaults` value to adapt you test cases
- use [`await expect(async function).rejects.toThrow()`](https://github.wdf.sap.corp/I337313/brc-hand-on-session-repo/blob/main/test/people-service-int.spec.js#L81) to require an exception
- [debug](https://github.wdf.sap.corp/I337313/brc-hand-on-session-repo/blob/main/.vscode/launch.json#L15) with your test case
- `spy` the `cds.db.run` to assert database execution

---

> Benefits

- Easy to use (test like API invocation)
- Full framework is executed

> Disadvantages

- Each test case will start a server (slowly when model is large)
- Need to deploy db model firstly
- Some exceptional case is hard to be caught (could not be trigger by OData but could be trigger by other `cds.ApplicationService`)

---

## The Single Service Way

```js
describe('People Service Unit Test', () => {

  const db = cds.db = new cds.Service()
  const run = db.run = jest.fn()

  const getPeopleService = async () => cds.connect.to(
    "sap.brh.handson.srv.PeopleService",
    {
      impl: cds.ApplicationService,
      model: await cds.load("*"), // you can specify a .cds file here directly
    }
  )

  it('should support validate insert event', async () => {
    const peopleService = await getPeopleService()
    await expect(() => peopleService.run(INSERT.into("EarthPeoples").entries({ Name: "Theo" })))
      .rejects
      .toThrow("invalid name")
  });

});
```

- [Test Case Example](https://github.wdf.sap.corp/I337313/brc-hand-on-session-repo/blob/main/test/people-service-unit.spec.js)

---

## The Single Service Way - Key Points

- Mock database execute results (in some cases)
- Assert runtime behavior by [database execution](https://github.wdf.sap.corp/I337313/brc-hand-on-session-repo/blob/main/test/people-service-unit.spec.js#L58)
- Manually Manage the service dependency

---

> Benefits

- only single service CSN (and its dependency) is processed, so fast
- request is handled by `cds.Service` framework, handlers are performed as expected
- could trigger `cds.Service` layer exceptions
- no database dependency, feel free to mock the results you want without data preparation

> Disadvantages

- no express middlewares could be tested 
- Draft related events are hard to trigger (need to use the converted CQN request)
- some mocked result maybe not match the database result

---

## The Mock Serve Way

> the mock `serve` function, perform `cds.serve` but mount it to a `'mocked' express` app

```js
function serve(options = {}) {
  const cds = require("@sap/cds");
  const db = cds.db = cds.services["db"] = new cds.Service("db")
  const run = db.run = jest.fn()

  beforeAll(async () => {
    const model = await cds.load("*", options);
    db.model = cds.model = cds.compile.for.nodejs(model)
    await cds.serve("all", options).in({ use() { } });
  })

  return run
}

```

---

## The Mock Serve Way

```js
describe('People Service Test with Mock Serve', () => {
  const run = serve()
  const getPeopleService = async () => cds.connect.to(
    "sap.brh.handson.srv.PeopleService"
  )

  it('should support insert database correctly', async () => {
    const peopleService = await getPeopleService()
    const results = await peopleService.run(
      INSERT.into("EarthPeoples").entries({
        ID: "7c3c2482-7f0b-479e-8f6b-f2eda3bb2f51",
        Name: "Theo valid snap"
      })
    )
    expect(results).toMatchSnapshot()
    expect(run.mock.lastCall).toMatchSnapshot()
  });

});
```

- [Test Case Example](https://github.wdf.sap.corp/I337313/brc-hand-on-session-repo/blob/main/test/people-service-mock-serve.spec.js)

---

## The Mock Serve Way - Key Points

- behavior like `cds.test`, but without
  - database connection 
  - express server
- will load all `cds.Application` at startup


--- 

> Benefits

- all `cds.ApplicationService` are ready in `cds.services` 
- request is handled by `cds.Service` framework, handlers are performed as expected
- could trigger `cds.Service` layer exceptions
- no database dependency, feel free to mock the results you want without data preparation

> Disadvantages

- all model are loaded, large project will be slowly
- no express middlewares could be tested 
- Draft related events are hard to trigger (need to use the converted `CQN` request)
- some mocked result maybe not match the database result

---

## The Legacy Unit Test Way

> The hard way to test `cds.ApplicationService`


```js
describe('PeopleService Legacy Unit Test', () => {
  const cds = require("@sap/cds")
  const PeopleService = require("../srv/PeopleService")

  cds.db = cds.services['db'] = new cds.Service("db")
  const run = cds.db.run = jest.fn()

  it('should support soft deletion', async () => {
    const p = new PeopleService()
    await p._softDeletePeople(
      new cds.Request({
        query: DELETE.from("entity").where({
          ID: "0dbb7b93-145d-478c-98d0-2203d1bcde12"
        })
      })
    )
    expect(run.mock.lastCall).toMatchSnapshot()
  });
});
```

--- 

> Benefits

- fastest/most flexible way/less resource consumption
- no cds.model is loaded, large project will be quickly
- no database dependency, free to mock the results you want without data preparation

> Disadvantages

- no `cds.Service` layer, cannot test the framework features (handlers, middlewares, etc.)
- all APIs based on `srv.model` will not work, need additional care (`srv.crud` api)


---

## How to mock `cds.connect.to`/`cds.services` ?

- assign the mocked instance to `cds.services`

```js
const s = cds.services['OrderService'] = new cds.Service('OrderService')
const run = s.run = jest.fn() // or other mock function
```

> why I use `new cds.Service`?

---

## How to mock `cds.run` ?

> it also could be used by standard handler of `cds.Service`

- mock the `cds.db`

```js
const db = cds.db = cds.services['db'] = new cds.Service('db')
const run = db.run = jest.fn()
```

---

## How to spy the `cds.db.run` ?

> When use the `cds.test` util to test and connect to the real database

```js
const cds = require("@sap/cds")

describe('People Service Int Test', () => {
  /**
   * @type {{axios:import("axios").AxiosInstance}}
   */
  const { axios } = cds.test(".").in(__dirname, "..")
  axios.defaults.validateStatus = () => true

  const testPeopleID = "318da8b4-95be-498d-bae7-f0c6ed6516ac"
  
  beforeAll(async () => { jest.spyOn(cds.db, 'run') })
  
  it('should support soft delete for EarthPeople', async () => {
    const response = await axios.delete(`/people/EarthPeoples(${testPeopleID})`)
    expect(response.status).toBe(204)
    // because setup the spy on the cds.db.run
    // so that, you can check the last call of the cds.db.run
    expect(cds.db.run.mock.lastCall).toMatchSnapshot()
  });
});
```

---

## Thank You

Theo Sun
2022