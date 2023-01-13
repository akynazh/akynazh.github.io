---
title: Window实用命令记录之进程与网络控制
date: 2022-04-18T23:10:39+08:00
categories: [Language]
tags: [windows, powershell, cmd]
slug: process-and-network-control-of-window-practical-command-recording
---

## 进程相关

### tasklist

- tasklist用于查看运行的进程
- findstr相当于linux的grep

```
PS C:\Users\akyna> Tasklist | findstr Code
Code.exe                     19184 Console                    1     94,012 K
Code.exe                     19300 Console                    1     26,324 K
......
```

### taskkill

使用该工具按照进程 ID (PID) 或映像名称终止任务。

参数列表:

-    /PID  processid        指定要终止的进程的 PID。
-    /IM   imagename        指定要终止的进程的映像名称。
-    /T                     终止指定的进程和由它启用的子进程。
-    /F                     指定强制终止进程。
-    /?                     显示帮助消息。

e.g.

```
TASKKILL /IM notepad.exe
TASKKILL /PID 1230 /PID 1241 /PID 1253 /T
TASKKILL /F /IM cmd.exe /T
```

## 网络相关

### ipconfig

执行网卡相关操作

```
$ ipconfig # 查看网卡信息，如ip地址
$ ipconfig /all # 查看mac地址

$ ipconfig /displaydns # 查看dns缓存内容
$ ipconfig /flushdns # 清除dns缓存
```

### ping

测试本机与指定机器是否联通

```
$ ping jingyan.baidu.com 
$ ping -t jingyan.baidu.com # ping 1000万次
$ ping -n 10 jingyan.baidu.com # ping 指定次数
```

### netstat

该命令用于显示协议统计信息和当前 TCP/IP 网络连接。

一般使用方式：

```
netstat -ano
```

命令解释：

```
-a            显示所有连接和侦听端口。
-n            以数字形式显示地址和端口号。
-o            显示拥有的与每个连接关联的进程 ID。
-r            显示路由表。
```

注意-t和-u并不是只列出tcp和udp的意思。

```
 -t            显示当前连接卸载状态。
 没有-u命令。
```