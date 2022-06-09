const cds = require('@sap/cds')

cds.once('bootstrap', app => { app.use(require('cds-swagger-ui-express')()) })

module.exports = cds.server