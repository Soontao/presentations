---
marp: true
theme: dark
---

# Docker, All in One

> ALL in ONE session about `docker`

Theo Sun
2021

---

## Introduction

> `Docker` is a set of platform as a service (PaaS) products that use [`OS-level virtualization`](https://en.wikipedia.org/wiki/OS-level_virtualization) to deliver software in packages called containers. `Containers` are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. All containers are run by a `single operating system kernel` and therefore use fewer resources than virtual machines.

---

## Fundamental - Control Group - Resource Limit

- Since 2007 (v1)
- Features
  - Resource Limiting - cpu/memory
  - Prioritization
  - Accounting - measures a group's resource usage
  - Process Control - checkpoint and restarting
- Commands: `cgcreate`, [`cgexec`](https://linux.die.net/man/1/cgexec)

---

## Fundamental - Linux Namespace - Isolation

> Namespaces are a feature of the Linux kernel that partitions kernel resources such that one set of processes sees one set of resources while another set of processes sees a different set of resources. 

- Kinds: mount(`fs`)/process(`pid`)/net(`private network`)/user id/control group(resource)
- Commands: [`unshare`](https://man7.org/linux/man-pages/man1/unshare.1.html)

---

## Docker Core Concepts

![](https://res.cloudinary.com/digf90pwi/image/upload/v1609739230/docker-lifecycle_c0b9ia.png)

- Image (Template, like `alpine`/`openjdk8`/`custom-java-app`)
- Container (Running instance, like `custom-java-app-01`)
- Volume (Storage of container)
- Network (Private network of many containers)
---

## Docker Storage Concept

![](https://res.cloudinary.com/digf90pwi/image/upload/v1624080670/container-layers_fc3uwp.jpg)

---
 
## Demo - Run a simple web server

```bash
# pull image with version
docker pull thedockerimages/hello-web-server:0.0.2
# create a new running container with image 'thedockerimages/hello-web-server@0.0.2'
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

## Demo - Inspect/Change a running container

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

## Demo - Build a new image based on existed one

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

## Demo - Create an app and run it in docker

- create an application
- create `Dockerfile` for application
- docker build to create image
- docker run to create container

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

## Demo - Publish your image (to DockerHub registry)

- registry
- build image
- docker push

```bash
docker login
docker push
```

--- 

## Registry

- Public Registry - [Docker Hub](https://hub.docker.com/)
- [Quay.io](http://quay.io/)
- Amazon [ECR](https://aws.amazon.com/ecr)
- Artifactory

---

## Optimize Docker Image Size

- Ignore Unused Files (docs/images/tests)
- Staged Build

---

## Demo - try to reduce your image size

- [`.dockerignore`](https://docs.docker.com/engine/reference/builder/#dockerignore-file)
- remove build dependencies
- multi stage build

---

## Accelerate Docker Build

- Install dependency firstly
- Cache built artifacts
- Install binary dependency
- Use proper base image

---

## Demo

> using `RSSHub` project as example

```bash
docker build -t basic.rsshub -f ./basic-rsshub.Dockerfile .
docker build -t optimized.rsshub -f  ./rsshub-optmized.Dockerfile .

docker images | grep rsshub
optimized.rsshub                   latest       1127ed603946   About a minute ago   291MB
basic.rsshub                       latest       e4780855d313   8 minutes ago        467MB
```

---

## Cross Build

> Using docker [buildx](https://docs.docker.com/buildx/working-with-buildx/) to build images cross different CPU/OS arch

```bash
docker buildx build --platform linux/arm64 .
```

---

## Volume

![](https://res.cloudinary.com/digf90pwi/image/upload/v1609748522/docker-volume_3_mt0mnn.png)

- persisted storage cross container instances (upgrade/multi instances)
- support different drivers (include NFS or iSCSI network drivers)

---

## Demo - Volume Mount

```bash
docker volume create v1
docker run -d --name r1 -v v1:/persist-data theosun-web-server:latest
docker exec -it r1 ash
# create data file
echo 'hello volume' > /persist-data/hello-volume
echo 'hello container local data' > /app/data
# inspect data
docker volume inspect v1
cat /var/lib/docker/volumes/v1/_data/test
# destroy r1 container
docker rm -f r1

# create another container
docker run -d --name r2 -v v1:/persist-data theosun-web-server:latest
docker exec -it r2 ash
cat /persist-data/hello-volume
cat /app/data
```
---

## Network

![](https://res.cloudinary.com/digf90pwi/image/upload/v1609749292/Docker-Network_3_pskrqn.png)

- Isolation
- Security
- Convenience

---

## Network Tasks

- [bridge](https://docs.docker.com/network/bridge/) (default) & host network
- create network
- connect network
- communication with different containers in same network

---

## Demo - Bridge Network

```bash
docker run -d --name r1 theosun-web-server:latest
docker run -d --name r2 theosun-web-server:latest
docker exec -it r1 ash
ping r2
docker network create n1
docker network connect n1 r1
docker network connect n1 r2
docker exec -it r1 ash
ping r2
```

---

## Why we use docker (container) ?

* Build and archive software artifacts with dependencies
  * executable software
  * native c API lib, binaries & other environments
  * offline delivery (without maven/npm and other package manager)
* Resource control & Isolation for multi container in single server

---

## Open Container Initiative - OCI

* Docker is a private company
* Docker hub is controlled by Docker company
* established in June 2015 by Docker
* define the standard of container/image

---

## Kyma, Kubernates and Docker

- Kyma runs on Kubernates
- Kubernates runs on Docker (or other supported [runtimes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/))
- Docker runs on Linux

---

## Bonus Demo - Run a container on Cloud Foundry

```bash
cf push theo-hello-web-server --docker-image thedockerimages/hello-web-server:latest
```


---

# Reference Documents

- [What even is a container: namespaces and cgroups](https://jvns.ca/blog/2016/10/10/what-even-is-a-container/)
- [Root FS](https://www.jianshu.com/p/4dab04e6d1e4)
- [Dive](https://github.com/wagoodman/dive)
- [Deploying an App with Docker](https://docs.cloudfoundry.org/devguide/deploy-apps/push-docker.html)

---

# Thank You