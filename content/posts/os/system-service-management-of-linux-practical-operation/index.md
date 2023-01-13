---
title: Linux实用操作之系统服务管理
date: 2022-07-24T20:42:27+08:00
categories: [OS]
tags: [linux]
slug: system-service-management-of-linux-practical-operation
---

## systemctl指令

1. 立即启动一个服务：`systemctl start my.service`
2. 立即停止一个服务：`systemctl stop my.service`
3. 重启一个服务：`systemctl restart my.service`
4. 重新加载一个服务的配置文件：`systemctl reload my.service`
5. 重载所有修改过的配置文件：`systemctl daemon-reload`
6. 开启自启动服务：`systemctl enable my.service`
7. 取消开启自启动：`systemctl disable my.service`
8. 查看是否已经自启动：`systemctl is-enabled my.service`
9. 查看服务运行状态：`systemctl status my.service`
10. 查看所有服务：`systemctl --type service`

## service和chkconfig指令

1. 启动服务：`service my.service start`
2. 终止服务：`service my.service stop`
3. 重启服务：`service my.service restart`
4. 查看服务运行状态：`service my.service status`
5. 开启或取消开机自启动：`chkconfig my.service on/off`
6. 查看开机自启动列表：`chkconfig --list`

## Unit配置文件解释

```
- Unit
   - Description，服务的描述
   - Requires，定义此unit需在哪个daemon启动后才能够启动
- Service
   - Type，定义启动时的进程行为。它有以下几种值。
   - Type=simple，默认值，执行ExecStart指定的命令，启动主进程
   - Type=forking，以 fork 方式从父进程创建子进程，创建后父进程会立即退出
   - Type=oneshot，一次性进程，Systemd 会等当前服务退出，再继续往下执行
   - Type=dbus，当前服务通过D-Bus启动
   - Type=notify，当前服务启动完毕，会通知Systemd，再继续往下执行
   - Type=idle，若有其他任务执行完毕，当前服务才会运行
   - ExecStart，启动当前服务的命令
   - ExecStartPre，启动当前服务之前执行的命令
   - ExecStartPost，启动当前服务之后执行的命令
   - ExecReload，重启当前服务时执行的命令
   - ExecStop，停止当前服务时执行的命令
   - ExecStopPost，停止当其服务之后执行的命令
   - RestartSec，自动重启当前服务间隔的秒数
   - Restart，定义何种情况 Systemd 会自动重启当前服务，可能的值包括always（总是重启）、on-success、on-failure、on-abnormal、on-abort、on-watchdog
   - TimeoutSec，定义 Systemd 停止当前服务之前等待的秒数
   - Environment，指定环境变量
- Install
   - WantedBy，值是一个或多个Target，当前Unit激活(enable)时，符号链接会放入/etc/systemd/system目录下面以Target名+.wants后缀构成的子目录中
   - RequiredBy，它的值是一个或多个Target，当前Unit激活(enable)时，符号链接会放入/etc/systemd/system目录下面以Target名+.required后缀构成的子目录中
   - Alias，当前Unit可用于启动的别名
   - Also，当前Unit激活(enable)时，会被同时激活的其他Unit
```

## 自定义服务启动

服务的管理通过systemd进行，systemd大部分配置文件位于`/usr/lib/systemd/system/`内，一般不在这进行修改。

修改的位置位于`/etc/systemd/system`内，在这里可以加入自己的服务。

### 新建service文件

```conf
vim /etc/systemd/system/test.service

# test.service
[Unit]
Description=service test

[Service]
Type=simple
ExecStart=/bin/bash -c " ~/test-service.sh"

[Install]
WantedBy=multi-user.target
```

### 开启服务并观察

```bash
[root@VM-0-11-centos ~]# systemctl daemon-reload
[root@VM-0-11-centos ~]# systemctl start test.service
[root@VM-0-11-centos ~]# systemctl status test.service
● test.service - service test
   Loaded: loaded (/etc/systemd/system/test.service; disabled; vendor preset: disabled)
   Active: active (running) since Wed 2022-04-13 00:04:24 CST; 4s ago
 Main PID: 15428 (bash)
   CGroup: /system.slice/test.service
           ├─15428 /bin/bash -c  ~/test-service.sh | at now;
           ├─15429 /bin/bash -c  ~/test-service.sh | at now;
           ├─15430 at now
           └─15432 sleep 30s

Apr 13 00:04:24 VM-0-11-centos systemd[1]: Started service test.
```

## 查看Unit启动日志

Systemd统一管理了所有Unit的启动日志，因此只需要使用journalctl命令就可以查看到服务的日志。

1. 显示尾部指定行数的日志：`journalctl -n 20`
2. 查看指定服务的日志：`journalctl /usr/lib/systemd/systemd`
3. 查看指定进程的日志：`journalctl _PID=1`
4. 查看某个 Unit 的日志：`journalctl -u nginx.service`