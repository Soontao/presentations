---
marp: true
---

# UI5

<!-- _color: white -->

<br>

Theo Sun, 2019

![bg](https://res.cloudinary.com/digf90pwi/image/upload/v1567582148/nasa-Q1p7bh3SHj8-unsplash_z1ld7w.jpg)

---

## Agenda

<br>


* Review UI5 at the 10th anniversary
* Introduce the 'Next Generation UI5'

![bg](https://res.cloudinary.com/digf90pwi/image/upload/v1567582442/beatriz-perez-moya-XN4T2PVUUgk-unsplash_weqfrl.jpg)

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

![bg right 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1567480220/2019-09-03_11-09-10_abi5m5.png)

---

### MVC Pattern

<br>

* Model - Data Container
* View - Combined Controls
  * XMLView - configured by XML
  * JSView - build by javascript
  * JSONView - ignored
* Controller - Process UI Event and Data Event

![bg right 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1559624173/loio1eb216151b1b41f1979b7b6c969670df_LowRes_1_tl2of5.png)

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

![bg right 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1567480479/AE7D07AD-6171-415A-9697-4A1894877428_cxcu5i.png)


---

### Component & Manifest.json

<br>

> Components are independent and reusable parts used in OpenUI5 applications.

* UIComponent

* UI-Less Component (ignored)

<br>

Each components have its own manifest.json, to define the `models`, `routing (with views)`, and `resource (css, i18n or whatever)`.

---

## Painful

<br>

* `byId` - element created by js but also need query by id
* `this` in view/controller - what is `this`
* Uncontrolled `Views`
* Development - `XML`, Type suggestion, IDE
* Performance - Load and Runtime (Over design)

![bg right](https://res.cloudinary.com/digf90pwi/image/upload/v1567582040/raj-eiamworakul-_cbKur5I60A-unsplash_x9iojh.jpg)

--- 

## What, is the 'Next Generation UI5' ?

<br>

* Define development principles
* Simplified concepts
* Provide build/convert tools to build modern UI5 

---

### Principles - To create self-consistent UI

<br>

Re-define the UI5 development.

---

### Data drive UI

<br>

Instead of event drive UI directly. Avoid the `tracking-less` or `on-fly` code.

* Traditional HTML/CSS/JS
  * Extract data from HTML to JS
* How to write and use `Control`
  * Data binding
* How to build project
  * Single Model - avoid cross model binding, data consistence

![bg right](https://res.cloudinary.com/digf90pwi/image/upload/v1567582674/vincent-botta-bv_rJXpNU9I-unsplash_kbnkbn.jpg)

---

### Single way dependency

<br>

Avoid `undefined` value and make sure code is readable.

* Layer independent, no cross layer interaction
* Simplify debug and development logic
* Easy to understand

---

### Less Concepts

<br>

Remove unnecessary concepts

* Focus on the UI & data.
* Quick learning & start

![bg right 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1567581228/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A1%A8%E5%8D%95_1_nhzf1k.png)

---

### Concepts

<br>

* Single Global Model (Store/Global State, data container)
* UI Controls (UI Components)
* Behavior Reducers (Response for event)

![bg right 75%](https://res.cloudinary.com/digf90pwi/image/upload/v1563858407/UI5-Next_umtixh.png)

<br>

**Only the 'UI' and 'Data' are what developers should pay attention to.**


---

### Modern javascript syntax

<br>

![bg right 100%](https://res.cloudinary.com/digf90pwi/image/upload/v1559639075/2019-06-04_17-04-28_qsil1j.png)

* ES6/JSX/Flow types with document
* Auto import/completion and document by type definitions.

---

### Modern builder

<br>

* Create preload file on-demand.
* inline css link
* bundle npm modules

![bg right 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1567581569/2019-09-04_15-19-17_n1wynb.png)

---

### Change data 
### Rather than `byId` and interact with UI reference

<br>

![bg right 85%](https://res.cloudinary.com/digf90pwi/image/upload/v1565868096/2019-08-15_19-21-11_tnfbiw.png)


---

### Javascript only

<br>

No

* i18n language.properties
* manifest.json
* any.css

files

Just use `Open Source` solutions.

---

### Open Source Friendly

![bg right 120%](https://res.cloudinary.com/digf90pwi/image/upload/v1565868385/2019-08-15_19-26-01_fptgvp.png)

<br>

`import` (almost) whole JS community

* lodash
* [redux/persist/thunk](https://github.com/ui5-next/ui5-todo)
* [echarts (4)](https://github.com/ui5-next/ui5-echarts)
* [react](https://github.com/ui5-next/cyberpunk-ui5)
* ......

