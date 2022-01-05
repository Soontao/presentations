# UAA Demo

This is a very simple application integrated with UAA. 

Just a demo, so, it will be hard to deploy by yourself.

## Key Points

* Application
  * define which services should be protected.
  * define role
* Gateway
  * config gateway routes (gateway/xs-app.json)
  * config logout (for clear session)
  * after deploy, set the destination url by `UI` or `cli`
  * act as a proxy between `application` & `uaa`
* UAA instance
  * generate `xs-security.json` from application, and use it to create UAA instance
  * bind it to `srv` and `gateway`

## Authentication Flow

### Normal OAuth Authentication

![](https://res.cloudinary.com/digf90pwi/image/upload/v1588747405/2020-05-06_14-43-20_m6qfjs.png)

### Multi-Tenant Authentication


![](https://res.cloudinary.com/digf90pwi/image/upload/v1588747431/2020-05-06_14-43-48_utgxrv.png)
