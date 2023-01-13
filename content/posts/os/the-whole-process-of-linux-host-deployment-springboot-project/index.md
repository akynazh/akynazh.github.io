---
title: Linux主机部署springboot项目全过程
date: 2021-11-03T00:30:25+08:00
categories: [OS]
tags: [linux, springboot, java]
slug: the-whole-process-of-linux-host-deployment-springboot-project
---

**注：部署环境为centos7.9版本**

## 配置环境

配好mysql，redis，java开发环境。

## 上传JAR包项目

```java
mvn clean
mvn package
```

即可把项目打包为JAR包，再通过WINSP上传到服务器。

先新建一个app文件夹，放置项目所有内容：

```bash
mkdir /app
chmod 777 /app
```

## 新建并编辑application配置文件

由于主机上的mysql密码与本地mysql密码不同，所以在JAR包同一个文件目录下新建application配置文件并指定新的密码，允许JAR项目时该application配置文件优先级是更高的。这里我还指定了用于linux下文件读取上传的目录路径。

```yaml
spring:
    datasource:
        password: ......
    resources:
        static-locations:
            - classpath:static/
            - file:/app/static/
```

```bash
[root@VM-0-11-centos app]# chmod -R 777 *
[root@VM-0-11-centos app]# ls
application.yaml  LonersHub-0.0.1-SNAPSHOT.jar static
```

## 运行项目

首先确保防火墙配置正确，放通需要的端口。

```java
[root@VM-0-11-centos app]# nohup java -jar LonersHub-0.0.1-SNAPSHOT.jar &
[1] 27108
```

## 更新项目

首先终止原本进程，删除原来的jar包并上传新的jar包，然后运行新的jar包：

```bash
[root@VM-0-11-centos app]# ps -ef | grep java
root     13415     1  1 00:02 ?        00:00:18 java -jar LonersHub-0.0.1-SNAPSHOT.jar
root     16053 15504  0 00:21 pts/1    00:00:00 grep --color=auto java

[root@VM-0-11-centos app]# kill -9 12415

[root@VM-0-11-centos app]# nohup java -jar LonersHub-0.0.1-SNAPSHOT.jar &
```

## 总结

通过记录项目的完整部署运行过程，方便以后参考。

OVER.
