---
marp: true
theme: dark
---

# Docker, First Step

> basically introduce `docker` technology

Theo Sun
2021

---

## Introduction

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

- Image (Template, like `alpine`/`openjdk8`/`custom-java-app`)
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
# pull image with version
docker pull theosun/hello-web-server@0.0.1 
# create a instance
docker run -d --restart=always --name hello-web-server-$USER theosun/hello-web-server@0.0.1
```

---

## Useable Docker Commands

- docker ps `list all running container`
- docker ps --all `list all container`
- docker run `create a new container instance`
- docker stop `stop a container`
- docker pull `pull images from registry`
- docker exec -it [container_name] /bin/bash `run shell in container`

---

## Hands On - 02 - Build a new image based on existed one

```Dockerfile
FROM thedockerimages/hello-web-server:0.0.1
ENV SERVICE_NAME yourname-web-server
```

---

## Dockerfile quick guide

[Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)


```dockerfile
FROM base-image:version
RUN command
EXPOSE port
ENV env_key=env_value
CMD ["node", "lib"]
```

---

## Demo - 03 - Publish your image (to public registry)

- registry
- build image
- docker push

```bash
docker login
docker push
```

---

## Hands On - 04 - Create an app and run it in docker

- create an application
- create `Dockerfile`
- docker build
- docker run

---

## Optimize Docker Image Size

* Docker Ignore
* Staged Build

---

## Hands On - 05 - try to reduce your image size

- `.dockerignore`
- remove build dependencies
- multi stage build

---

## Accelerate Docker Build

* Install dependency firstly
* Cache built artifacts
* Install binary dependency
* Use proper base image

---

# Hands On - 06 - accelerate your build

---

# Thank You