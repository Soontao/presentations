
/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = srv => {
  srv.on("metric", async (ctx) => {
    return {
      Status: 200,
      Service: "cap demo service 02",
      User: ctx.user.id
    }
  })
}