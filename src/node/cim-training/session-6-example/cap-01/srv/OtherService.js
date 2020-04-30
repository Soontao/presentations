const cds = require("@sap/cds")

/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {

  const { Count: CountTable } = cds.entities // use cds.entities get the real table reference

  const { Counts: CountsTable } = srv.entities // Counts view are defined in Service, so access it by service

  // error http://localhost:4004/other/Counts(1)
  // computed value http://localhost:4004/other/Counts(2)
  srv.after("READ", CountsTable, items => {
    if (items && items.length == 1) {

      items.forEach(item => {
        const { id, count } = item
        if (id == 1) {
          throw new Error("business error") // don't do this in READ
        } else {
          item.count2 = count + 1
        }
      })

    }
  })

  /**
   * a mock async operation
   * @param {number} count 
   */
  const mockAsyncOperation = (count = 0) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (count == 105) {
        reject(new Error("105 is invalid count"))
      } else {
        resolve()
      }
    })
  })

  /**
   * reuseable functions
   */
  const readTotalRowCount = () => cds.run( // convert query to promise
    SELECT.from(CountTable, ["count(1) as total_count"]) // query definition
  );

  // error 
  // POST http://localhost:4004/other/Counts(1)
  // {
  //   "id": 5,
  //   "count": 105
  // }
  srv.before("CREATE", CountsTable, async ctx => {
    const { count } = ctx.data
    if (count < 100) {
      throw Error("count must >= 100")
    }
    const [{ total_count }] = await readTotalRowCount() // remember try catch here
    if (total_count > 10) {
      throw new Error("record limit")
    }
  })

  srv.on("CREATE", CountsTable, ctx => {
    const { count } = ctx.data
    ctx.data.sCount = count.toString()
  })

  // read only in fact
  srv.after("CREATE", CountsTable, item => { // here is item/ or items? i'm not sure in batch mode
    // ctx.a = 1 // reference error
    // do nothing
    const { id, count } = item
    if (id == 15) {
      throw new Error(`record with id: 15 is not accepted`) // error throw, transaction will rollback
    } else {
      item.count2 = count + 1
    }
  })

  srv.on("ROLLBACK", CountsTable, ctx => {
    console.log("rollback")
  })

  srv.on("COMMIT", CountsTable, ctx => {
    console.log("commit")
  })

}