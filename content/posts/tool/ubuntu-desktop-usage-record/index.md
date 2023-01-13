---
title: Ubuntu桌面使用记录
date: 2023-01-13T21:09:27+08:00
categories: [Tool]
tags: [ubuntu, software]
slug: ubuntu-desktop-usage-record
---
## 共享文件夹

C:/Users/akyna/Codes <------> /home/jzh/Codes

虚拟机面板 -> 共享文件夹 -> 选择位置，勾选固定分配和自动挂载

-> 执行命令将 jzh 加入共享组，然后重启：

```bash
usermod -a -G vboxsf jzh
reboot
```

## 共享宿主机代理

1. 宿主机 clash 勾选 ALLOW_LAN
2. 宿主机防火墙开放 7890 号端口
3. 进入 Ubuntu Desktop settings，根据主机局域网ip进行配置

命令行也无需配置 `http_proxy` 等变量，自动配好了！

## 解决自动生成文件夹的问题

vim ~/.config/user-dirs.dirs

```
# 将类似如下行删除
XDG_PUBLICSHARE_DIR="$HOME/Public"
XDG_DOCUMENTS_DIR="$HOME/Documents"
XDG_MUSIC_DIR="$HOME/Music"
XDG_PICTURES_DIR="$HOME/Pictures"
XDG_VIDEOS_DIR="$HOME/Videos"
```

sudo vim /etc/xdg/user-dirs.conf

```
enabled=False
```

然后重启即可。

## 解决点击无响应的Bug

```
sudo apt-get update
sudo apt-get install --reinstall gnome-control-center
```

## 屏幕分辨率

设备 -> 安装增强功能

```
cd /media
cd VBOXADDITIONS_4.3.6_91406
sh VBboxLinuxAdditions.run
reboot
```

系统 -> 首选项 -> 显示器，可看到新出现的分辨率 `1024x768`。

## 用户管理

1. 添加用户

```
sudo adduser username 
```

2. 添加sudo权限

```
sudo usermod -G sudo username 
```

3. 添加root权限

如果需要让此用户有root权限，执行命令：

```
sudo vim /etc/sudoers
```

修改文件如下：

```
# User privilege specification
root ALL=(ALL) ALL
username ALL=(ALL) ALL
```

## 切换模式

```
alt + ctrl + f3 切换到命令行模式

alt + f1 复原
```

## 无法打开Terminal的问题

You have to add `LANG=en_US.UTF-8` to `/etc/default/locale` and reboot your system. (Solution from this Arch Linux forum post.)

## 软件商店卡在启动界面

```
killall gnome-software

rm -rf ~/.cache/gnome-software

reboot
```

## 命令行启动

```
VBoxManage startvm Local-Ubuntu-Jzh --type headless
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**
