---
marp: true
---

# The Next Generation UI5

<br>

Theo Sun, 2019

---

## Agenda

<br>

* Introduce the traditional UI5 concepts
* Introduce the next generation UI5
* Summary


---

## What is UI5 ?

<br>

> OpenUI5 is a JavaScript application framework designed to build cross-platform, responsive, enterprise-ready applications. It is an open-source project maintained by SAP SE available under the Apache 2.0 license and open to contributions. OpenUI5's core is based on JavaScript, **jQuery**, and LESS. The library's feature set includes model–view–controller patterns, data binding, its own UI-element library, and internationalization support

---

### Controls

<br>

The UI classes of UI5. 

* Render dom string
* Attach dom events by `jQuery`
* Process getter/setter/event from `model`
* Style 

---

### MVC Pattern

<br>

* Model - Data Container
* View - Combined Controls
  * XMLView - configured by XML
  * JSView - build by javascript
  * JSONView - ignored
* Controller - Process UI Event and Data Event

![](https://res.cloudinary.com/digf90pwi/image/upload/v1559624173/loio1eb216151b1b41f1979b7b6c969670df_LowRes_1_tl2of5.png)

---

### Module System

<br>

> The OpenUI5 framework has built-in support for modularizing comprehensive JavaScript applications. That means, instead of defining and loading one large bundle of JavaScript code, an application can be split into smaller parts which then can be loaded at runtime at the time when they are needed. These smaller individual files are called modules.

Generally, it works like an `AMD` module system (with `define` and `require` function). 

For simplify the framework design, the core of UI5 will use synchronized `XHR` api to load modules. 

---

### Preload

<br>

The traditional module system will cause the application loading is so slowly. So UI5 provided `library-preload` and `Component-preload` file to `pre` cache modules which will be used for application. (Developer should use the `manifest.json` or `index.html` tag to define required libs)

To avoid sync loading take too much time, UI5 also provides an `async` way to load `preload` modules file. (But the `sap-ui-core` also will be loaded by sync api)


---

### Component

<br>

> Components are independent and reusable parts used in OpenUI5 applications.

* UIComponent

* UI-Less Component (ignored)


---

### Manifest.json

<br>

Each components have its own manifest.json, to define the `models`, `routing (with views)`, and `resource (css, i18n or whatever)`.



--- 

## What is the 'Next Generation UI5' ?

<br>

* Define development principles
* Simplified concepts
* Provide modern javascript syntax
* Javascript only
* Support open source community

---

### Principles

<br>

**Data drive UI**

Instead of event drive UI directly.

**Single way dependency**

Avoid `undefined` value and deep-in bug.

**Single data model**

Simplify development and reduce event between different instances.


---

### Concepts

<br>

* Model (Store/Global State, data container)
* Controls (UI Components)
* Reducers (Response for event)

<br>

**Only 'UI' and 'data' are what you need to pay attention to.**


---

### Modern javascript

<br>

![](https://res.cloudinary.com/digf90pwi/image/upload/v1559639075/2019-06-04_17-04-28_qsil1j.png)

* ES6/JSX/Flow type
* Auto import/completion and document by type definitions.

---

### Javascript only

<br>

No

* language.properties
* manifest.json
* any.css

files

---

### Open source friendly

<br>

Import almost all type javascript libraries

* lodash
* redux
* echarts (4)
* ......

---

### Available now !

<br>

Access [The Ultimate UI5 Generator](https://github.com/ui5-next/ui5g), for more information.

<br>

```bash
# install
npm i -g yo generator-ui5g
# run generator
yo ui5g
```

