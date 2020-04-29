
/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {

  // error http://localhost:4004/other/Counts(1)
  // computed value http://localhost:4004/other/Counts(2)
  srv.after("READ", "Counts", items => {
    if (items) {

      items.forEach(item => {
        const { id, count } = item
        if (id == 1) {
          throw new Error("business error")
        } else {
          item.count2 = count + 1
        }
      })

    }
  })

}