
const logger = cds.log("class-service")

/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {

  const { Classes } = srv.entities

  srv.on("READ", Classes, async (req, next) => {
    logger.info("read classes handler 1")
    // do something
    return await next()
  })

  srv.on("READ", "Classes", async (req, next) => {
    logger.info("read classes handler 2")
    // do something
    return await next()
  })

  srv.after("READ", "Students", (each) => {
    each.weight += 0.1
  })

  srv.on("getName", "Classes", async (req, next) => {
    const [item] = await srv.run(req.query)
    return item.name
  })
}
