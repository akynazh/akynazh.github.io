---
title: 配置网络以实现主机和虚拟机系统互通
date: 2022-02-13T21:20:01+08:00
categories: [Tool]
tags: [network, linux]
slug: configure-the-network-to-realize-the-interworking-between-host-and-virtual-machine-system
---
## 主机配置防火墙入站规则

主机如果没开启防火墙则可以跳过这一步。

进入防火墙管理界面，新建入站规则放通目标虚拟机系统IP即可。

## 选择桥接模式

默认好像是NAT模式，改为桥接模式，指定网卡为当前主机网络的网卡，我的是“Realtek PCIe.GBE Family Controller”。

我的主机网络网关是 `192.168.1.1`，子网掩码为 `255.255.255.0`，IP为 `192.168.1.126`，我想配置虚拟机网络IP为 `192.168.1.127` 或者 `192.168.1.128`。

## Ubuntu配置静态IP

通过netplan的方法进行，编辑 `/etc/netplan/00-installer-config.yaml`如下：

```yaml
network:
  ethernets:
    enp0s3:
      dhcp4: no
      optional: no
      nameservers:
        addresses: [114.114.114.114, 8.8.8.8]
      gateway4: 192.168.1.1
      addresses: [192.168.1.128/24]
  version: 2
```

然后执行 `sudo netplan apply`即可。

## CentOS配置静态IP

找到当前网络下网卡名，然后编辑/etc/sysconfig/network-scripts下的ifcfg-{网卡名}文件如下：

```ini
BOOTPROTO="static" # 静态IP
IPADDR=192.168.1.127 # IP
NETMASK=255.255.255.0 # 子网掩码
GATEWAY=192.168.1.1 # 网关
DNS1=114.114.114.114
DNS2=8.8.8.8
ONBOOT=yes
```

之后再重启网络服务即可：

```
systemctl restart network
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**
