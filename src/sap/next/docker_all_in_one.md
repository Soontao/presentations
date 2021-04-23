---
marp: true
theme: dark
---

# Docker, All in One

> ALL in ONE session about docker

Theo Sun
2021

---

## Introduction

> `Docker` is a set of platform as a service (PaaS) products that use `OS-level virtualization` to deliver software in packages called containers. `Containers` are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. All containers are run by a `single operating system kernel` and therefore use fewer resources than virtual machines.

---

## Key Points

- `Linux` kernel support
- Golang based (simply C lang API integration)
- Uniform standards (Linux, AMD64)

---

## Control Group - Resource Limit

- Since 2007 (v1)
- Features
  - Resource Limiting - cpu/memory
  - Prioritization
  - Accounting - measures a group's resource usage
  - Process Control - checkpoint and restarting
- Commands: `cgcreate`, [`cgexec`](https://linux.die.net/man/1/cgexec)

---

## Linux Namespace - Isolation

> Namespaces are a feature of the Linux kernel that partitions kernel resources such that one set of processes sees one set of resources while another set of processes sees a different set of resources. 

- Kinds: mount(`fs`)/process(`pid`)/net(`private network`)/user id/control group(resource)
- Commands: [`unshare`](https://man7.org/linux/man-pages/man1/unshare.1.html)

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

## Hands On - Run a simple web server

- host:
- user:
- password:

```bash
# login to server
ssh user@host 
# pull image with version
docker pull thedockerimages/hello-web-server:0.0.2
# create a new instance with image 'thedockerimages/hello-web-server@0.0.2'
docker run -d --restart=always -P --name hello-web-server-$USER thedockerimages/hello-web-server:0.0.2
# show your container information
docker ps | grep hello-web-server-$USER
# try to access your container with browser
```

---

## Useable Docker Commands

- docker ps `list all running container`
- docker ps --all `list all container`
- docker run `create a new container instance`
- docker stop `stop a container`
- docker pull `pull images from registry`
- docker exec -it [container_name] /bin/bash `run shell in container`
- docker build `build a new image`

---

## Hands On - Inspect/Change a running container

```bash
docker exec -it hello-web-server-$USER sh # run a shell into container
cat static/index.html # read resource
echo 'hello web server changed' > static/index.html # write resource
# check content from your browser
exit # exit from container
docker stop hello-web-server-$USER # stop container, you can restart it again
docker rm hello-web-server-$USER # remove container, you can not restart it again
```

---

## Hands On - Build a new image based on existed one

- create a new `Dockerfile` in a directory
- copy and edit the content, remember to replace the `YOURNAME` to your name

```Dockerfile
FROM thedockerimages/hello-web-server:0.0.2
ENV SERVICE_NAME YOURNAME-web-service
```

- run `docker build -t "$USER-web-server" .` to build your image
- run `docker run -d -P "$USER-web-server"` to automatically expose service
- run `docker run -d -p "$(id -u $USER):3000" "$USER-web-server"` to expose the service to the specific port (your uid in linux system)
- run `docker ps | grep "$USER-web-server"` to list all running containers
- run `docker stop GUID` to stop the specific container


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

## Demo - Publish your image (to public registry)

- registry
- build image
- docker push

```bash
docker login
docker push
```

---

## Hands On - Create an app and run it in docker

- create an application
- create `Dockerfile`
- docker build
- docker run

---

## Volume

![](https://res.cloudinary.com/digf90pwi/image/upload/v1609748522/docker-volume_3_mt0mnn.png)

- Persisted storage cross container instances

---

## Hands On - Bind Volume

- create a volume
- create a container bind with volume 
- change the resource
- destroy the container
- create a new container bind with volume
- access the resource

---

## Network

![](https://res.cloudinary.com/digf90pwi/image/upload/v1609749292/Docker-Network_3_pskrqn.png)

- Isolation
- Security

---

## Hands On - Bind Network

- create a new network
- create two services
- call a service API with cascade API call

---

## Optimize Docker Image Size

- Ignore Unused Files (docs/images/tests)
- Staged Build

---

## Hands On - try to reduce your image size

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

# Hands On - accelerate your build

---

# Reference Documents

- [What even is a container: namespaces and cgroups](https://jvns.ca/blog/2016/10/10/what-even-is-a-container/)
- [Root FS](https://www.jianshu.com/p/4dab04e6d1e4)


---

# Thank You