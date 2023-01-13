---
title: Wsl自定义安装位置
date: 2022-07-23T17:27:31+08:00
categories: [Tool]
tags: [wsl, windows]
slug: wsl-custom-installation-location
---

## 自定义wsl安装位置

### 下载wsl-ubuntu：

- 20.04版本：https://aka.ms/wslubuntu2004
- 18.04版本：https://aka.ms/wsl-ubuntu-1804

其他版本自行前往[官网](https://docs.microsoft.com/zh-cn/windows/wsl/install-manual)查找。

### 修改后缀名

下载后得到AppxBundle文件，将后缀名改为zip，然后解压。

解压后得到如下内容：

![](image/wsl1.jpg)

选择x64或ARM64的安装包均可均可，将后缀名改为zip，然后解压。

### 开始安装wsl-ubuntu

解压后得到如下内容：

![](image/wsl2.jpg)

双击ubuntu.exe，即可开始安装wsl-ubuntu。

安装完成后在该目录下得到虚拟盘：

![](image/wsl3.jpg)

注：虚拟盘也可能变成rootfs文件。

### 登录wsl

安装时会让你指定用户名和密码，这个用户是默认添加到sudoers里的。

如果想用root登录，通过`sudo passwd root`可以设置root密码（root刚开始没有密码），接着通过`su`即可登录root。

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**