---
marp: true
---

# Connect SFTP with CPI

Theo Sun, 2019

---

## Agenda

<br>

This document will provide you how to connect SFTP server with CPI.    

---

## Concepts

<br>

> In computing, the SSH File Transfer Protocol (also Secure File Transfer Protocol, or SFTP) is a network protocol that provides file access, file transfer, and file management over any reliable data stream. It was designed by the Internet Engineering Task Force (IETF) as an extension of the Secure Shell protocol (SSH) version 2.0 to provide secure file transfer capabilities. 


--- 

## Connect to SFTP (with public key authentication)

<br>

Following information is required for CPI: 

* SFTP hostname/username

<br>

You should provide following information:

* Provide CPI generated `public key` to SFTP Provider


---

## [Connect] Create ’SSH-KEY’ firstly

If the tenant **already** have an ‘id_rsa’ entry, just **skip** this step. Because each tenant only need one ssh key.

(Maybe the valid form/to validation have some issue now. Don’t change them)

Create ssh key by `Manage KeyStore > Current > Create > SSH Key` button.

---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1559703038/32E7AC35-05B9-4E75-839A-13FFC3250C9D_ky2vmf.png)

---

## [Connect] Go to ‘id_rsa’ entry and download public key

SSH server will accept clients by this key.

After downloaded, you will get a ‘id_rsa.pub’ key file, you should provide this file to the **sftp provider**, so that the server will accept the request from CPI.

---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1559703045/903F23F1-A89C-4C14-85FA-F415234B76C3_iizyli.png)


---

## [Connect] Setup SFTP server (Optional)

If the sftp server is provided by another partners/systems, you should to provide the CPI 'public key' to them, and they will configure this in sftp server.

1. Login to your linux (or whatever ssh server)
1. Append the `CPI` **SSH public key** to the sftp server  ~/.ssh/authorized_keys


---

## [Connect] The `known_hosts` file

<br>

* CPI **requires** a `known_hosts` file for SSH connection.
* **But** CPI could not generate the file.
* So that you should generate it by your **local** ssh client.


---

## [Connect] The `known_hosts` file

<br>

**Note**

If your CPI Tenant already have a `known_hosts` file, please not upload directly, download the lasted one and append newly `SSH Server Hostname line` to the file, then re-upload it.

---

## [Connect] Generate the `known_hosts` file

Assume that you already installed `ssh` client for you OS. 
In windows, recommand to use the `Git Bash` UI.

```bash
# replace 'suntao' by your sftp username
# replace 'fr01.forneve.org' by your sftp hostname 
> sftp suntao@fr01.fornever.org

The authenticity of host fr01.fornever.org (104.238.188.59) cant be established.
ECDSA key fingerprint is SHA256:l4+WoLNUdL5dfmkW0vlur1x9jEq8fi017oebVTbho2M.

# input 'yes' here
Are you sure you want to continue connecting (yes/no)? yes

# already done, it doesn't matter if you can or can not connect to the server
# if you input the password, enter 'exit' to exit from remote sftp server.

# capture the last line of ssh client 'known_hosts' to a new file
> tail -n 1 ~/.ssh/known_hosts > cpi_required_known_hosts

# just upload the 'cpi_required_known_hosts' file to the CPI
```

---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1559703054/2D6A0A65-80B7-40CC-8971-3B962A11F6F3_nlb6ol.png)

---

## Test Connectivity

<br>

Now, you could test the connectivity in the `Test Connectivity` UI.

Remember **unchecked** the `Check Host Key` checkbox.

After connection test passed, you could use the `SFTP Adapter` in your integration flows.


---

![](https://res.cloudinary.com/digf90pwi/image/upload/v1559703060/089329AD-1C2A-4BA7-BFE5-4A6020E7591F_ssaegs.png)


---


# Thanks