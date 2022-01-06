const cds = require('@sap/cds')

cds.on('bootstrap', app => app.use(require('cds-swagger-ui-express')()))

module.exports = cds.server