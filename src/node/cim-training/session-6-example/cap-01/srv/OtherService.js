const cds = require("@sap/cds")

/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {

  const { Count: CountTable } = cds.entities // use cds.entities get the real table reference

  const { Counts: CountsTable } = srv.entities // Counts view are defined in Service, so access it by service

  srv.before("CREATE", ctx => {
    // console.log("before create") for all entities
  })

  // error http://localhost:4004/other/Counts(1)
  // computed value http://localhost:4004/other/Counts(2)
  // in fact, you don't need this feature, computed field could be implemented in frontend/client
  srv.after("READ", CountsTable, items => {
    if (items && items.length == 1) {

      items.forEach(item => {
        const { id, count } = item
        if (id == 1) {
          // don't do this in READ, clients can not get any information from server
          throw new Error("business error")
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
    SELECT.from(CountsTable, ["count(1) as total_count"]) // query definition
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
      throw new Error("count must >= 100")
    }
    const [{ total_count }] = await readTotalRowCount() // try catch if necessary
    if (total_count > 10) {
      throw new Error("record limit")
    }
  })

  srv.on("CREATE", CountsTable, ctx => {
    const { count } = ctx.data
    ctx.data.sCount = count.toString()
  })

  srv.before("SAVE", CountsTable, ctx => { // after on-create, save it
    const { event, method } = ctx // access event/HTTP method
    // console.log("before save") // but not commit
  })


  srv.on("SAVE", CountsTable, ctx => { // after on-create, save it
    const { event, method } = ctx // access event/HTTP method
    // console.log("before save") // but not commit
  })

  // run sql

  srv.after("SAVE", CountsTable, ctx => { // after on-create, save it
    const { event, method } = ctx // access event/HTTP method
    // console.log("after save") // but not commit
  })

  // read only in fact
  srv.after("CREATE", CountsTable, item => { // here is item/ or items? i'm not sure in batch mode
    // ctx.a = 1 // reference error
    // do nothing
    const { id, count } = item
    if (id == 15) {
      throw new Error(`record with id: 15 is not accepted`) // throw error, transaction will rollback
    } else {
      item.count2 = count + 1
    }
  })

  srv.on("COMMIT", CountsTable, ctx => {
    // console.log("commit")
  })

  // run sql

  srv.on("ROLLBACK", CountsTable, ctx => {
    // console.log("rollback")
  })

  // actions

  const selectCountByID = (id = 0) => cds.run(SELECT.from(CountsTable).where({ "ID": id }))
  const updateCountFor = (id = 0, count = 0) => cds.run(UPDATE(CountsTable).where('ID = ', id).set('count += ', count))

  srv.on("plus", async ctx => {
    const { ID, Count } = ctx.data.body
    const affectedRows = await updateCountFor(ID, Count)
    return await selectCountByID(ID)
  })

}