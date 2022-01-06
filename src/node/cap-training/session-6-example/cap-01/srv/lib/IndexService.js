


// class mode
// module.exports = class IndexService {

//   metric() {
//     return { "service": "CDS" }
//   }

//   metric2(req) {
//     const { name } = req.data // get data from context
//     return { "service": `hello ${name}` }
//   }

// }


/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = async (srv) => {

  srv.on("metric", () => {
    return { "service": "CDS" }
  })


  /**
   * 
   * @param {import("@sap/cds/apis/services").Request} req 
   */
  const handler = (req) => {
    const { name } = req.data // get data from context
    return { "service": `hello ${name}` }
  }

  srv.on("metric2", handler)

  const ClassService = await cds.connect.to("ClassService")

  srv.on("classRecords", async () => {
    const { Classes } = ClassService.entities;
    const { total } = await ClassService.run(SELECT.one.from(Classes).columns("count(1) as total"))
    return total
  })

}