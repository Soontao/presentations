---
marp: true
theme: dark
---

# Docker, First Step

Theo Sun
2020

---

## Quickly Introduction

> `Docker` is a set of platform as a service (PaaS) products that use `OS-level virtualization` to deliver software in packages called containers. `Containers` are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. All containers are run by a `single operating system kernel` and therefore use fewer resources than virtual machines.

---

## Key Points

- `Linux` kernel support
- Golang based
- Uniform standards (Linux, AMD64)

---

## Docker Components

- Docker Daemon
- Docker Cli
- Docker Swarm
- Docker Registry

---

## Core Concepts

![](https://res.cloudinary.com/digf90pwi/image/upload/v1609739230/docker-lifecycle_c0b9ia.png)

- Image (Template, like `ubuntu`/`alpine`/`openjdk8`)
- Container (Running instance, like `custom-java-app-01`)
- Volume (Storage of container)
- Network (Private network of many containers)

---

## Hands On - 01 - Run a simple web server

- host:
- user:
- password:

```bash
# login to server
ssh user@host 
# pull image
docker pull theosun/hello-web-server@0.0.1 
# create a instance
docker run -d --restart=always --name hello-web-server-$USER theosun/hello-web-server@0.0.1
```

---

## Hands On - 02 - Build a new image based on existed one

```Dockerfile
FROM thedockerimages/hello-web-server:0.0.1
ENV SERVICE_NAME yourname-web-server
```

---

## Demo - 03 - Publish your image (to public registry)

```bash
docker login
docker push
```

---

## Optimize Docker Image Size

* Docker Ignore
* Base Image