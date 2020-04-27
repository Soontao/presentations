const assert = require('assert');
const fetch = require("node-fetch")
const app = require("../app/server")
const process = require("process")

describe('server', function () {

  const port = process.env.PORT || "3000"

  before(function (done) {
    app.listen(parseInt(port, 10), done)
  });

  describe('/add', function () {
    it('should return the sum', async function () {
      const response = await fetch(`http://127.0.0.1:${port}/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ v1: 123, v2: 321 })
        }
      )
      const body = await response.json()
      assert.equal(body.result, 444)
    });
  });
});