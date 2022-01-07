

const logger = cds.log("class-service")
/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {

  srv.on("READ", "Classes", async (req, next) => {
    logger.info("read classes handler 1")
    // do something
    return await next()
  })

  srv.on("READ", "Classes", async (req, next) => {
    logger.info("read classes handler 2")
    // do something
    return await next()
  })
  srv.on("getName", "Classes", async (req, next) => {
    const [item] = await srv.run(req.query)
    return item.name
  })
}
