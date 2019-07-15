---
marp: true
---

# Introduction for python

<br>

Theo Sun
2019

---

## Keywords

<br>

* Since 1991
* Programming paradigm: OOP, FOP
* Weak type script language
* Easy to learn & use

---

## Concepts

<br>

* CPython & IronPython & Jython
* Cython
* Python 2 & Python 3
* BDFL - Benevolent Dictator For Life
* PEP - Python Enhancement Proposal

---

## Global Interpreter Lock

<br>

> In CPython, the global interpreter lock, or GIL, is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. This lock is necessary mainly because CPython's memory management is not thread-safe. (However, since the GIL exists, other features have grown to depend on the guarantees that it enforces.)

<br>

![](https://res.cloudinary.com/digf90pwi/image/upload/v1563180809/GIL_2cpu_x2quuq.png)

<br>

So that `multiprocessing` is used in python web framework.

---

## IDEs

<br>

* VSCode with extension
* Sublime
* PyCharm (Community)

---

## Libraries

<br>

* [Numpy](https://www.numpy.org) Statistics & Machine Learning
* [Micro Python](https://micropython.org) Internet of Things
* [Scrapy](https://scrapy.org/) Internet spider
* [Flask](https://github.com/pallets/flask) Web
* [Tushare](http://tushare.org) Financial

---

## Quick view with a flask application

<br>

```python
# modules
from flask import Flask, escape, request

# runtime define
app = Flask(__name__)

@app.route('/')
def hello(): # no param type & return type
    # indented block
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'
```

---

## Quick view with a simple KNN algorithm

<br>

---

## Quick view with a simple internet spider

<br>

---

## Quick view with a micropython IoT device

<br>

---


## Summary: why or why not ?

---

## Choose python

<br>

If you want:

<br>

* Do something about machine learning
* Write a quick web based prototype
* Financial and numeric science
* Grab data from internet
* DevOps
* Hack & Security
* Daily scripts (processing files, upload, analytic)

---

## DONT choose python

<br>

If you want:

<br>

* Impl high performance core business service
* Create meaningful UI
