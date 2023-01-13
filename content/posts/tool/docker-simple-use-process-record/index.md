---
title: Docker简单使用记录
date: 2021-05-19T22:52:52+08:00
categories: [Tool]
tags: [linux, docker]
slug: docker-simple-use-process-record
---

## 下载并运行ubuntu镜像

```
[root@VM-0-11-centos ~]# docker run ubuntu:15.10 /bin/echo "crazy thursday"
crazy thursday
```

## 运行ubuntu并开启bash交互

```bash
[root@VM-0-11-centos ~]# docker run -i -t ubuntu:15.10 /bin/bash
root@fda3220ed59f:/# echo hello
hello
root@fda3220ed59f:/# cat /proc/version
Linux version 3.10.0-1160.45.1.el7.x86_64 (mockbuild@kbuilder.bsys.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC) ) #1 SMP Wed Oct 13 17:20:51 UTC 2021
root@fda3220ed59f:/# ls
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
root@fda3220ed59f:/# exit
exit
```

## 运行进程并观察

```bash
[root@VM-0-11-centos ~]# docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello; sleep 1; done"
6668bf16629c8466ecbc32d77978e993c34a0c1c6f51bab420dcc6b89dc85063
[root@VM-0-11-centos ~]# docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS     NAMES
6668bf16629c   ubuntu:15.10   "/bin/sh -c 'while t…"   6 seconds ago   Up 5 seconds             charming_chaum
```

## 通过容器ID停止进程

```bash
[root@VM-0-11-centos ~]# docker stop 6668bf16629c

[root@VM-0-11-centos ~]# docker ps # 查看正在运行的容器
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

## 删除容器与镜像

**删除指定容器：**

```bash
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@localhost ~]# docker ps -l
CONTAINER ID   IMAGE                        COMMAND                  CREATED         STATUS                      PORTS     NAMES
24984c7ca679   redislabs/redismod:preview   "docker-entrypoint.s…"   9 minutes ago   Exited (0) 25 seconds ago             redismod
[root@localhost ~]# docker rm 24984c7ca679
24984c7ca679
[root@localhost ~]# docker ps -l
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

**删除指定镜像：**

```bash
[root@localhost ~]# docker images
REPOSITORY           TAG       IMAGE ID       CREATED        SIZE
redislabs/redismod   preview   551d3e6b4861   8 months ago   1.02GB
[root@localhost ~]# docker rmi 551d3e6b4861
Untagged: redislabs/redismod:preview
Untagged: redislabs/redismod@sha256:8e2ba4c6fa409f7f8dbde251f6528e5a3d4b6dc4308ac91549a2c3a3509a8ab1
Deleted: sha256:551d3e6b486153de5c5c76d9cc2aab61b7e14eefb4acd3ab52bb1a912f3c987f
Deleted: sha256:d1906bf79a5be313e2884cdff4d4610986a5b7e7604a9c83fbd4e169cafa2c1c
Deleted: sha256:1affefdd1a759c0b8662d8b8c00367c1beef0c029818f5af95048d75f6043bee
Deleted: sha256:d852dbcbdeb989ef0dc20d56cbfc452d5f7876f3b2784d0a08c9933d35993107
...
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

**批量删除：**

```
docker system prune 命令可以用于清理磁盘，删除关闭的容器、无用的数据卷和网络，以及dangling镜像(即无tag的镜像)

docker system prune -a 命令清理得更加彻底，可以将没有容器使用Docker镜像都删掉
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**