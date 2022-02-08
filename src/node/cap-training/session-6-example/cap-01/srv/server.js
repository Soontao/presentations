const cds = require('@sap/cds')

cds.once('bootstrap', app => {

  app.use(require('cds-swagger-ui-express')())
  app.use((req) => {
    req.features = req.headers?.['x-cds-features']?.split(',') ?? []
    req.next()
  })

})

const isEnabled = (evtName, srv) => {

  const op = srv.operations[evtName]

  if (op === undefined) {
    // error
    return false
  }

  // contains features
  if (
    op['@cds.features.enabled.on'] !== undefined &&
    cds.context?._.req?.features?.includes?.(op['@cds.features.enabled.on'])
  ) {
    return true
  }


  // default enabled
  if (op['@cds.features.enabled'] === true) {
    return true
  }

  return false

}

const getRedirect = (evtName, srv) => {

  const op = srv.operations[evtName]

  if (op['@cds.features.redirect.target'] !== undefined) {
    for (const target of op['@cds.features.redirect.target']) {
      const targetEventName = target['=']
      const targetEvent = srv.operations[targetEventName]
      if (isEnabled(targetEventName, srv)) {
        return targetEvent
      }
      const redirect = getRedirect(targetEventName, srv)
      if (redirect !== undefined) {
        return redirect
      }
    }
  }
}

// an exmaple for global event hook
cds.on('serving', service => {

  if (service instanceof cds.ApplicationService) {

    const logger = cds.log(service?.name)

    service.prepend('*', srv => {

      srv.before('*', async (evt) => {
        const redirect = getRedirect(evt.event, srv)

        if (redirect !== undefined) {
          evt._feature_redirect = redirect
        }

        if (isEnabled(evt.event, srv)) {
          return
        }

        throw new Error(`${evt?.event} is not enabled`)

      })

      srv.on('*', async (evt, next) => {

        if (evt._feature_redirect !== undefined) {
          const event = evt._feature_redirect.name.match(/\w*$/)[0]
          logger.info(`redirect event from ${evt.event} to ${event}`)
          return srv[event]({ ...evt, event })
        }
        // please carefully process error happens here
        logger.info(`before ${evt?.event} ${evt?.target?.name || ''}`)
        const rt = await next()
        logger.info(`after ${evt?.event} ${evt?.target?.name || ''}`)
        return rt;
      })

    })
  }
})

module.exports = cds.server