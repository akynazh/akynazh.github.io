---
title: Git配置记录
date: 2022-10-13T21:40:46+08:00
categories: [Tool]
tags: [git]
slug: git-configuration-record
---
## Git 初始化

```
git config --global user.name="akynazh"
git config --global user.email="akynazh@qq.com"
```

## 配置 Http 代理

```
git config --global http.https://github.com.proxy socks5://127.0.0.1:7890
```

## 配置 SSH 代理

```
# ~/.ssh/config

Host github.com
    User git
    Port 22
    Hostname github.com
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand connect -S 127.0.0.1:7890 -a none %h %p

Host ssh.github.com
    User git
    Port 443
    Hostname ssh.github.com
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand connect -S 127.0.0.1:7890 -a none %h %p
```

其中connect命令是位于git安装目录下的一个操作命令，位置大致在：`C:\Program Files\Git\mingw64\bin\connect.exe`，为了方便使用可以考虑将其加入环境变量。

## CRLF -> LF

```
git config --global core.autocrlf false
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**
