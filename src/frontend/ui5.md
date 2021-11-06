---
marp: true
theme: dark
---

# Retrospect and Prospect UI5


Theo Sun, 2019

![bg](https://res.cloudinary.com/digf90pwi/image/upload/v1567582148/nasa-Q1p7bh3SHj8-unsplash_z1ld7w.jpg)

---

## Agenda

* Retrospect UI5 at the 10th anniversary
* Prospect the 'Next Generation UI5'

---

## What is UI5 ?



> OpenUI5 is a JavaScript application framework designed to build cross-platform, responsive, enterprise-ready applications. It is an open-source project maintained by SAP SE available under the Apache 2.0 license and open to contributions. OpenUI5's core is based on JavaScript, **jQuery**, and LESS. The library's feature set includes model–view–controller patterns, data binding, its own UI-element library, and internationalization support

---

### Controls



The UI classes of UI5. 

* Render dom string
* Attach dom events by `jQuery`
* Process getter/setter/event from `model`
* Style 

![bg right 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1567480220/2019-09-03_11-09-10_abi5m5.png)

---

### MVC Pattern



> Layered Arch

* Model - Data Container
* View - Combined Controls
  * XMLView - configured by XML
  * JSView - build by javascript
  * JSONView - ignored
* Controller - Process UI Event and Data Event


![bg right 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1559624173/loio1eb216151b1b41f1979b7b6c969670df_LowRes_1_tl2of5.png)

---

### Module System



> The OpenUI5 framework has built-in support for modularizing comprehensive JavaScript applications. That means, instead of defining and loading one large bundle of JavaScript code, an application can be split into smaller parts which then can be loaded at runtime at the time when they are needed. These smaller individual files are called modules.

Generally, it works like an `AMD` module system (with `define` and `require` function).

For simplify the framework design, the core of UI5 will use synchronized `XHR` api to load modules.

---

### Preload



The traditional module system will cause the application loading is so slowly. So UI5 provided `library-preload` and `Component-preload` file to `pre` cache modules which will be used for application. (Developer should use the `manifest.json` or `index.html` tag to define required libs)

![bg right 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1567480479/AE7D07AD-6171-415A-9697-4A1894877428_cxcu5i.png)


---

### Component & Manifest.json



> Components are independent and reusable parts used in OpenUI5 applications.

* UIComponent

* UI-Less Component (ignored)



Each components have its own manifest.json, to define the `models`, `routing (with views)`, and `resource (css, i18n or whatever)`.

---

## Painful



* `byId` - element created by js but also need query by id
* `this` in view/controller - what is `this`/`that`
* Split MVC and UI Controls
* Development - `XML`, Type suggestion, IDE
* Performance - Load and Runtime (Over Design)

![bg right](https://res.cloudinary.com/digf90pwi/image/upload/v1567582040/raj-eiamworakul-_cbKur5I60A-unsplash_x9iojh.jpg)

---

# Retro Summary

---

## Prospect the 'Next Generation UI5'



> Imagination
> Attract developers



* Re-define development principles
* Simplified concepts
* Provide tools to build modern UI5

![bg right 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1567581228/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A1%A8%E5%8D%95_1_nhzf1k.png)

---

### Principle - Data drive UI



Avoid the `tracking-less` or `on-fly` code.

* Forget `byId` and `setter`
* Write and use `Control` Data binding
* Single large global model - avoid cross model binding, data consistence

![bg right](https://res.cloudinary.com/digf90pwi/image/upload/v1567582674/vincent-botta-bv_rJXpNU9I-unsplash_kbnkbn.jpg)

> Example - [UI5 To Do](https://github.com/ui5-next/ui5-todo)

---

### Principle - Data drive UI



> Change data in model 
> Rather than use `byId` find and interact with UI reference



> So that, the data will represent the UI.

![bg right 85%](https://res.cloudinary.com/digf90pwi/image/upload/v1565868096/2019-08-15_19-21-11_tnfbiw.png)

---

### Principle - Build self consistent application

<!-- _color: white -->



Build a **system** instead of a collection of code



* Avoid exception - Complex Model
* Abstract - More Layers

![bg](https://res.cloudinary.com/digf90pwi/image/upload/v1567744711/nina-z-snixPaBvfBo-unsplash_vn0k8d.jpg)

---

### Principle - Single way dependency and data flow



Avoid `undefined` value and make sure code is readable.

* Layer independent, no cross layer interaction
* Simplify debug and development logic
* Easy to understand


---

### Less Concepts



> Remove unnecessary concepts

> View/controller/fragment/components/i18n/manifest/byId ....

* Single Global Model (Store/Global State, data container)
* UI Controls (UI Components)
* Behavior Reducers (Response for event, represent to model) - or other anything

![bg right 75%](https://res.cloudinary.com/digf90pwi/image/upload/v1563858407/UI5-Next_umtixh.png)


---

### Modern javascript syntax




* ES6/JSX/Flow types with document
* Auto import/completion and document by type definitions.



> [Babel transform plugin](https://github.com/ui5-next/babel-plugin-ui5-next) provided
> [ES6 Type Definition](https://github.com/ui5-next/types) Provided


---

![bg 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1559639075/2019-06-04_17-04-28_qsil1j.png)

---

### Modern builder



* Create preload file **on-demand**
* inline css link
* bundle npm modules

![bg right 80%](https://res.cloudinary.com/digf90pwi/image/upload/v1567581569/2019-09-04_15-19-17_n1wynb.png)



> [Gulp build plugin](https://github.com/ui5-next/gulp-ui5-eager-preload) provided
> [Official UI5 Tooling](https://github.com/SAP/ui5-tooling) provided

---

### Open Source Friendly



`import` (almost) whole JS community

* lodash
* [redux/persist/thunk](https://github.com/ui5-next/ui5-todo)
* [echarts (4)](https://github.com/ui5-next/ui5-echarts)
* [react](https://github.com/ui5-next/cyberpunk-ui5)
* ......

---

![bg 95%](https://res.cloudinary.com/digf90pwi/image/upload/v1565868385/2019-08-15_19-26-01_fptgvp.png)

---

# Q & A & Your Comments

---

# Thanks

* Netlify - Demo deployment
* Unsplash - Free images 
* Marp - Presentation
* Cloudinary - CDN
