---
marp: true
theme: dark
---

# Open Source Outlook 2022

Theo Sun
2022

![bg right 50% blur](https://res.cloudinary.com/digf90pwi/image/upload/v1646725446/osi_keyhole_300X300_90ppi_0_sdzuf9.png)

---

> Open Source become more and more important in modern application development

Could you list out some most frequent used open source projects in your daily work ?

---

## All of them are Open-Source projects

- NodeJS - OpenJS Foundation
- Tomcat - Apache Foundation
- Lodash - Private OSS
- VSCode - Microsoft
- React - Facebook
- OpenUI5 - SAP
- Spring Framework - VMWare
- OpenJDK - Oracle/SAP/Red Hat/Google
- Golang - Google
- Docker - Docker, Inc
- Kubernates - Google
- Rust - Mozilla

--- 

## Agenda

- OSS 2021
- Whats New
- Security
- OSS Projects Recommendation

---

## How about 2021 ?

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,h_958/v1649901622/Screen_Shot_2022-04-14_at_10.00.15_jcmisi.png)

---

![bg 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1649902137/Screen_Shot_2022-04-14_at_10.08.50_t1j6us.png)

---

## Whats New ?


![bg 50% right blur](https://res.cloudinary.com/drxgh9gqs/image/upload/c_scale,h_600/v1649645795/1200px-WebAssembly_Logo.svg_s4nprs.png)


- low code application platform
- low code GUI framework
- eBPF projects grow up
- [WASM on Cloud](https://www.youtube.com/watch?v=YnQeoGrkJKM) maybe better
- [Spring Boot 3.0](https://spring.io/blog/2022/01/20/spring-boot-3-0-0-m1-is-now-available)
- Golang Generics

---

### Low Code

> The `Low-Code` trend

- [amplication](https://github.com/amplication/amplication)
- [ToolJet](https://github.com/ToolJet/ToolJet)
- [alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine)
- [Yao](https://github.com/YaoApp/yao)
- [lowdefy](https://github.com/lowdefy/lowdefy)
- [nocodb](https://github.com/nocodb/nocodb)


[![bg right 100%](https://user-images.githubusercontent.com/5435402/133762127-e94da292-a1c3-4458-b09a-02cd5b57be53.png)](https://github.com/nocodb/nocodb)

--- 

### [eBPF](https://ebpf.io/)

![bg right 100%](https://camo.githubusercontent.com/714c5d777b0025dda66b46f14e28badc01e3e3360ef264be204f54846a7c9573/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f63696c69756d2f63696c69756d406d61737465722f446f63756d656e746174696f6e2f696d616765732f63696c69756d5f6f766572766965772e706e67)

- [Cilium](https://github.com/cilium/cilium)
- [falco](https://github.com/falcosecurity/falco)
- [katran](https://github.com/facebookincubator/katran)
- [eCapture](https://github.com/ehids/ecapture)

---

### WASM

- Trend
  - [WasmEdge](https://github.com/WasmEdge/WasmEdge)
  - [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
  - [rustwasm](https://rustwasm.github.io/wasm-bindgen/examples/dom.html)
  - [spin](https://spin.fermyon.dev/go-components/)
- Interesting
  - [copy/v86](https://copy.sh/v86/)
  - [tfjs-backend-wasm](https://www.npmjs.com/package/@tensorflow/tfjs-backend-wasm)
  - [pyodide](https://github.com/pyodide/pyodide)

![bg right 95%](https://camo.githubusercontent.com/1d24e64022fd725f1896890b3ce14c560f075dc1f80f0b0baae3ece8981c882a/68747470733a2f2f70617065722d6174746163686d656e74732e64726f70626f782e636f6d2f735f353445314239364546464546443239343536323930324443354239393731443335434436423635304243383744313230303341333041343635313737363230315f313538363531343237353631385f696d6167652e706e67)
 

---

### Spring Boot 3.0

![bg right 50%](https://spring.io/images/spring-logo-9146a4d3298760c2e7e49595184e1975.svg)

- baseline from `Java 8` to `Java 17`.
- [Spring 6.x](https://spring.io/blog/2021/09/02/a-java-17-and-jakarta-ee-9-baseline-for-spring-framework-6)
- [Spring Boot 3.x](https://spring.io/blog/2022/04/05/spring-cloud-2022-0-0-m2-codename-kilburn-has-been-released)
- [Spring Cloud 2022](https://spring.io/blog/2022/04/05/spring-cloud-2022-0-0-m2-codename-kilburn-has-been-released)

---

### Golang 1.18 and Generics

> much libraries should be re-written by generics

- [lo](https://github.com/samber/lo)

--- 

### Something for Frontend

- [rome - rust](https://rome.tools/)
- [esbuild - golang](https://esbuild.github.io/)
- [pnpm - npm package manager](https://pnpm.io/zh/)

---

## OSS security become more and more important

- [log4j2](https://nvd.nist.gov/vuln/detail/CVE-2021-44832)
- npm supply chain attack
  - [core-js](https://stackoverflow.com/questions/60722968/how-do-i-block-advertising-in-npm)
  - [faker.js](https://web.archive.org/web/20210704022108/https://github.com/Marak/faker.js/issues/1046)
  - [node-ipc](https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/)
  - [nodejs_net_server](https://thehackernews.com/2021/07/malicious-npm-package-caught-stealing.html)
  - [event-source-polyfill](https://github.com/Yaffle/EventSource/commit/de137927e13d8afac153d2485152ccec48948a7a)
  - [npm unpublish policy](https://blog.npmjs.org/post/141905368000/changes-to-npms-unpublish-policy.html)
- [Spring Cloud Gateway](https://tanzu.vmware.com/security/cve-2022-22947)
- [Spring Core RCE](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement) 

--- 

## Risks of OSS

- Security Vulnerabilities
  - Security Report
- Single Supplier - Github
  - Export Control
- Business Model of OSS
  - [Product Hunt](https://www.producthunt.com/)
- License
- Leadership


---


## [OSS at SAP](https://gist.github.tools.sap/I337313/762aeb10c33d959ef9cb7ffbbd9dad01)

--- 

## OSS Projects Recommendation

- [miniflux - RSS Reader](https://github.com/miniflux/v2)
- [RSSHub - RSS Transformer](https://github.com/DIYgod/RSSHub)
- [Uptime Kuma - Uptime Robot](https://github.com/louislam/uptime-kuma)
- [frp - Tunnel](https://github.com/fatedier/frp)
- [marp](https://marp.app/#get-started) / [slidev](https://cn.sli.dev/guide/why.html) - markdown as presentation

---

## OSS Projects Interesting

- [immudb - Immutable Database](https://github.com/codenotary/immudb)
- [nocodb - database as a web-service](https://github.com/nocodb/nocodb)
- [RisingWave - Material View](https://github.com/singularity-data/risingwave)
- [coolify - PaaS](https://github.com/coollabsio/coolify)


---

## OSS I contributed in 2021

- [ts-hdb](https://github.com/Soontao/ts-hdb) - [typescript template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)/[async generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
- [similar](https://github.com/Soontao/similar) - similar sentence check for golang
- [cds mysql](https://github.com/Soontao/cds-mysql) - MySQL database adapter for CAP nodejs runtime
- [ws proxy](https://github.com/Soontao/ws-proxy) - minimal proxy under websocket

---

## Thank You