---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)

# Remote Debugging for NodeJS

> it will be useful for cloud development

---

## How we start the local debug ?

1. `node --inspect node --inspect node_modules/.bin/cds run`
1. open `chrome://inspect` in browser

---

## Debug features

1. Profiler
   1. monitor CPU consumption
1. Console
   1. interpreter with modules
1. Sources
   1. open file
   1. add breakpoint
   1. log breakpoint
   1. hot fix
1. Memory
   1. detect memory leak

---

## Question

is that possible we use `node --inspect` remotely and connect it with my local PC ?

---

## Okay, lets demo it firstly

---

## How we can debug nodejs application remotely ?

> firstly, we need configuration the runtime

- [NODE_OPTIONS](https://nodejs.org/dist/latest-v16.x/docs/api/cli.html#node_optionsoptions)
- [manifest.yml](https://github.com/Soontao/cf-node-debug-example)
- mta.yml
- [Dockerfile](https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/)

---

## How could us setup connection between local PC and cloud env ?

- [ssh](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html)
- [cf ssh](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html)
- [kubectl proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/)

---

## When we need the remote debug ?

---

## Some tips

- your debugger will capture all data processing, it means
  - you are debug the whole application, even the request is not sent by you, it also will be captured
  - if you hold the breakpoint too long time, server will be fully blocked, then `cf`/`k8s` health check will be failed, then platform maybe force restart the server, as a result you will lost debugger connection
  - so its better to use `log breakpoint`
- your override of function will be lost after dis-connecting from application

---

## Thanks
