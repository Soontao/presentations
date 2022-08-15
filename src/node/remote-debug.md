---
marp: true
theme: dark
---

![blur bg 50% right](https://res.cloudinary.com/digf90pwi/image/upload/v1640327704/logo_pgbqzz.svg)

# Remote Debugging for NodeJS

> it will be useful for cloud development

---

## How we start the local debug ?

1. `node --inspect node_modules/.bin/cds run`
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

- [An Example Project](https://github.com/Soontao/presentations/tree/main/src/node/cap-training/session-5-example/express)

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

## Example - Cloud Foundry

```yaml
applications:
  - name: cf-node-debug-example
    memory: 100MB
    random-route: true
    disk_quota: 500MB
    buildpacks:
      - https://github.com/cloudfoundry/nodejs-buildpack
    command: node --inspect lib/index # debugger on 39999
```

```bash
cf ssh <appName> -N -L 9229:127.0.0.1:9229
```

---

## Example - Docker

```dockerfile
# only for dev purpose
FROM node:lts
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm ci
COPY . .
ENV PORT 3000
EXPOSE 3000
CMD [ "node", "node_modules/@sap/cds/bin/cds.js", "run" ]
```

```bash
docker build -t dev_app
docker run -p3000:3000 -p9229:9229 -eNODE_OPTIONS="--inspect=0.0.0.0:9229" --rm -it dev_app
```

---

## When we need the remote debug ?

- Cloud only
  - inspect inbound traffic
  - hard-coded feature
  - only specific situation/request
  - hard to prepare environment
  - network restriction

---

## Some tips

- your debugger will capture all data processing, it means
  - you are debug the whole application, even the request is not sent by you, it also will be captured
  - if you hold the breakpoint too long time, server will be fully blocked, then `cf`/`k8s` health check will be failed, then platform maybe force restart the server, as a result you will lost debugger connection
  - so its better to use `log breakpoint`
- your override of function will be lost after dis-connecting from application
- concern about multi-instance application, you can use `cf ssh` to connect to each instance

---

## Thanks
