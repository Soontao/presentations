---
marp: true
theme: dark
---

# Docker, First Step

Theo Sun
2020

---

## Quickly Introduction

<br>

> Docker is a set of platform as a service (PaaS) products that use `OS-level virtualization` to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. All containers are run by a single operating system kernel and therefore use fewer resources than virtual machines.

---

## Key Points

<br>

- Linux core support
- Golang based
- Uniform standards (Linux, AMD64)

---

## Docker Components

<br>

- Docker Daemon
- Docker Cli
- Docker Swarm
- Docker Registry

---

## Core Concepts

<br>

- Image (Template)
- Container (Running instance)
- Volume (Storage of container)
- Network (Private network of many containers)

---

## Hands On 01 - Run a simple web server

<br>

- host:
- user:
- password:

<br>

```bash
ssh user@host # login to server
docker pull theosun/hello-docker@0.0.1 # pull image
docker run # create a instance
```
