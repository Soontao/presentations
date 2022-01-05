
/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = srv => {

  const handler = async (ctx) => ({
    Status: 200,
    Service: "cap demo service 02",
    User: ctx.user.id
  })

  srv.on("metric", handler)
  srv.on("limit", handler)

}