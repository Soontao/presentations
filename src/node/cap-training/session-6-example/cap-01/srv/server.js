const cds = require('@sap/cds')

cds.on('bootstrap', app => {
  app.use(require('cds-swagger-ui-express')())
})

// an exmaple for global event hook
cds.on('serving', service => {
  if (service instanceof cds.ApplicationService) {
    const logger = cds.log(service?.name)
    service.prepend('*', srv => srv.on('*', async (evt, next) => {
      // please carefully process error happens here
      logger.info(`before ${evt?.event} ${evt?.target?.name}`)
      const rt = await next()
      logger.info(`after ${evt?.event} ${evt?.target?.name}`)
      return rt;
    }))
  }
})

module.exports = cds.server