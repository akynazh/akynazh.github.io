---
title: Linux文件部分总结
date: 2022-10-19T22:43:03+08:00
categories: [Os]
tags: [linux]
slug: linux-files-section-summary
---

## 文件类型

- d: directory
- -: file
- l: link
- p: pipeline，管道文件
- b: block，块设备文件
- c: character，字符设备文件
- s: socket，套接字文件

## 配置文件

**对于bashrc：**

`/etc/bashrc`：针对所有用户，每开启一个shell都会执行一次

`/etc/skel/.bashrc`：针对所有用户，用于在新建一个用户时默认给用户配置的bashrc

`~/.bashrc`：只针对单个用户，每开启一个shell执行一次

**对于profile：**

`/etc/profile`: 针对所有用户，首次登录执行一次

`/etc/skel/bash_profile`: 针对所有用户，用于在新建一个用户时默认给用户配置的bashr_profile

`~/.bash_profile`: 只针对单个用户，首次登录执行一次

每次修改完配置文件后，都必须 source 一下已生效。

## cp命令

常用 `cp -au`：

-a，即-dpR，-d 复制时保留链接，-p 保持权限不变，-R 递归复制，-u 表示在源文件有更新或者目标文件不存在时进行目标文件的复制。

## Dos 与 Linux 换行符差异

首先知道：

- 回车 CR \r
- 换行 LF \n

win/dos的换行： \r\n

unix mac linux的换行： \n

unix to win 换行失败。

win to unix 多了\r -> \r\n -> ^M。

解决方法，全部统一为LF即可。

如果win下已经为CRLF，那么可以在linux下运行：

安装dos2unix：`yum install dos2unix`，然后运行如下类似的命令：

```
find . -name '*' |xargs dos2unix 
```

可以将某目录下的所有文件从dos格式转为unix格式。

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**