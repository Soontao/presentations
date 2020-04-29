
/**
 * @param {import("@sap/cds/apis/services").Service} srv
 */
module.exports = (srv) => {
  srv.on("READ", "Classes", cla => {
    // do something
  })
}
