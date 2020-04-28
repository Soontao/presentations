

module.exports = class IndexService {
  metric() {
    return { "service": "CDS" }
  }
  /**
   * 
   * @param {import("express").Request} req 
   */
  metric2(req) {
    const { name } = req.data // get data from context
    return { "service": `hello ${name}` }
  }
}
