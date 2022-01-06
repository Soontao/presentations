
/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {
  srv.on("READ", "Classes", async (req, next) => {
    // do something
    return await next()
  })
  srv.on("getName", "Classes", async (req, next) => {
    const [item] = await srv.run(req.query)
    return item.name
  })
}
