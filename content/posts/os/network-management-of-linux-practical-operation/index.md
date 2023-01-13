---
title: Linux实用操作之网络管理
date: 2021-01-03T00:27:58+08:00
categories: [OS]
tags: [linux, network]
slug: network-management-of-linux-practical-operation
---

## 查看内网IP

grep抓取inet行，sed删除inet字串和netmask.*字串

```
alias myip=" ifconfig eth0 | grep 'inet ' | sed 's/inet//g' | sed 's/netmask.*$//g'"
```

test:

```
[root@VM-0-11-centos ~]# myip
         172.17.0.11
```

## 查看外网IP

```
curl cip.cc
```

show:

IP      : ${my_ip}
地址    : 中国  中国

数据二  : 上海市 | 腾讯云

数据三  : 中国北京北京 | 腾讯

URL     : http://www.cip.cc/${my_ip}

## 查看IP端口状况

```bash
[root@VM-0-11-centos ~]# netstat -ntlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1089/sshd

tcp6       0      0 :::3306                 :::*                    LISTEN      14528/mysqld
```

参数说明：

- n：拒绝别名都用数字
- t：即只接受TCP
- l：即只显示在listen中的
- p：可显示相关程序名

另外一种方法：

获取3306端口运行状况：

```bash
[root@VM-0-11-centos ~]# lsof -i:3306
COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
mysqld  14528 mysql   17u  IPv6 779103      0t0  TCP *:mysql (LISTEN)
```

## 开启与关闭端口

这里实验环境为centos7.9，我采用firewall来实现需求。

```bash
# 首先打开防火墙服务
[root@VM-0-11-centos ~]# systemctl start firewalld 

# 永久开启80端口
[root@VM-0-11-centos ~]# firewall-cmd --zone=public --add-port=8080/tcp --permanent 

# 使生效
[root@VM-0-11-centos ~]# firewall-cmd --reload

# 查看已经开启的端口
[root@VM-0-11-centos ~]# firewall-cmd --zone=public --list-ports
8080/tcp 3306/tcp 80/tcp

```
