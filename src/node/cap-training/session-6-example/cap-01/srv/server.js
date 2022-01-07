const cds = require('@sap/cds')

cds.on('bootstrap', app => {
  app.use(require('cds-swagger-ui-express')())

})

// an exmaple for global event hook
cds.on('serving', service => {
  if (service instanceof cds.ApplicationService) {
    const logger = cds.log(service.name)
    service.prepend('*', srv => srv.on('*', async (evt, next) => {
      logger.info(`before ${evt.event}`)
      const rt = await next()
      logger.info(`after ${evt.event}`)
      return rt;
    }))
  }
})

module.exports = cds.server