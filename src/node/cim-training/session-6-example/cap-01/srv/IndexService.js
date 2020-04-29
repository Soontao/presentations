



module.exports = class IndexService {

  metric() {
    return { "service": "CDS" }
  }

  metric2(req) {
    const { name } = req.data // get data from context
    return { "service": `hello ${name}` }
  }

}
