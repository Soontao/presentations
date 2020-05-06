# UAA Demo

This is an application integrated with UAA. 
Just a demo, its hard to run by yourself.

## Points

* Application
  * define which services should be protected.
  * define role
* Gateway
  * config gateway routes (gateway/xs-app.json)
  * config logout (for clear session)
  * after deploy, set the destination url by `UI` or `cli`
* UAA instance
  * generate `xs-security.json` from application, and use it to create UAA instance
  * bind it to `srv` and `gateway`
