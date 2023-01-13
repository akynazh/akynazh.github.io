---
title: Wsl主要操作记录
date: 2022-07-23T17:34:52+08:00
categories: [OS]
tags: [wsl, linux, windows]
slug: wsl-main-operation-records
---

## wsl在window开机后自启ssh服务

1. wsl下创建脚本，执行：`vim /etc/init.wsl`，并根据需要写入服务：
   ```sh
   /etc/init.d/${需要的服务} # 或者使用service/systemctl命令
   ```
   再赋予init.wsl执行权限，执行：`chmod +x /etc/init.wsl`

2. window下在启动目录下创建脚本：`wsl.bat`，写入开机命令如下：
   ```
   wsl -d <DistributionName> -u root /etc/init.wsl
   ```
   其中，版本通过`wsl -l`查看。

## wsl一些常用命令

1. `wsl ~ -u jzh`: 以jzh用户登录并进入用户文件夹
2. `wsl --shutdown`: 关闭wsl
3. `wsl -l -v`: 查看已安装的wsl版本
4. `wsl --status`: 检查wsl状态
5. `wsl -l --online`: 查看可通过在线商店获得的 Linux 发行版列表

## wsl修改默认登录用户

`<DistributionName> config --default-user root`: 将登录默认用户设为root

手动安装wsl的话可能无法生效，可通过修改`/etc/wsl.conf`完成：

```
# Set the user when launching a distribution with WSL.
[user]
default = root
```

然后重启wsl即可完成。

## 切换wsl1和wsl2

```
wsl --set-version <distribution name> <versionNumber>
```

`<versionNumber>`值为1或2，对应wsl1和wsl2。

## 升级ubuntu发行版本

```
apt update
apt upgrade
do-release-upgrade -d
```

## 升级wsl的linux内核版本

```
wsl --update
```
可以使用`wsl --update rollback` 命令回滚到内核的上一版本。

## 卸载wsl

```
wsl --unregister <DistributionName>
``` 

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**