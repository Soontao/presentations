const cds = require('@sap/cds')

const { features, providers: { CDSRequestProvider } } = require("cds-feature-toggle")


cds.once('bootstrap', app => {

  app.use(require('cds-swagger-ui-express')())

})


features.supportFeatureAnnotate(cds, new CDSRequestProvider())

module.exports = cds.server