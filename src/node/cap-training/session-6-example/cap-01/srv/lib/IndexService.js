

/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = async (srv) => {

  // inline handler
  srv.on("metric", () => {
    return { "service": "CDS" }
  })

  srv.on("metricV2", () => {
    return { "service": "CDS V2" }
  })

  srv.on("metricV3", () => {
    return { "service": "CDS V3" }
  })

  // defined handler firstly and use it later
  /**
   * 
   * @param {import("@sap/cds/apis/services").Request} req 
   */
  const handler = (req) => {
    const { name } = req.data // get data from context
    return { "service": `hello ${name}` }
  }

  srv.on("metric2", handler)


  // another example, consume another 'service'
  srv.on("classRecords", async () => {
    const ClassService = await cds.connect.to("ClassService")
    const { Classes } = ClassService.entities;
    const { total } = await ClassService.run(SELECT.from(Classes).columns("count(1) as total"))
    return total
  })

  srv.on("userInfo", async (req) => {
    return { id: req.user.id, attr: req.user.attr, roles: Object.keys(req.user._roles) }
  })

}