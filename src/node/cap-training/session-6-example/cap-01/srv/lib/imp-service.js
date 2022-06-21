
const cds = require("@sap/cds")


module.exports = class ImportantService extends cds.ApplicationService {

  async init() {

    this.on("DELETE", "Table3s", async (req, next) => {
      await this.run(UPDATE.entity("Table3s").byKey(req.params[0]).with({ deleted: true }))
      return
    })

    await super.init()
  }
}