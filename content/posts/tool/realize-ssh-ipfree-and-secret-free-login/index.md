---
title: 实现SSH免IP免密登录
date: 2021-01-13T21:53:43+08:00
categories: [Tool]
tags: [ssh]
slug: realize-ssh-ipfree-and-secret-free-login
---

## 编辑 `~/.ssh/config`

```
Host 输入代替名
    HostName 输入IP
    Port 输入端口号
    User 输入用户名
    # ProxyCommand "C:\Program Files\Git\mingw64\bin\connect.exe" -S 127.0.0.1:7890 -a none %h %p

# 定时发送心跳确保不断开连接
ServerAliveInterval 30 # 每隔30秒发送一次
ServerAliveCountMax 60 # 连续60次服务端无响应断开连接
```

## 生成并发送密钥

```
ssh-keygen -t rsa
```

然后将公钥 `~/.ssh/id_rsa.pub` 复制到目标主机 `~/.ssh/authorized_keys` 文件中。

## 可能出现的问题：密钥算法不匹配

如果出现以下错误：

no matching key exchange method found. Their offer: diffie-hellman-group1-sha1

则是本地密钥算法与远程主机密钥算法**不匹配**造成的！

可以在ssh_config或config文件中添加密钥算法配置：

```
Host 输入代替名
	HostName 输入IP
	Port 输入端口号
	User 输入用户
	KexAlgorithms +diffie-hellman-group1-sha1
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**