---
title: Linux展示性内容配置记录
date: 2022-07-13T21:21:50+08:00
categories: [Tool]
tags: [linux]
slug: linux-display-content-configuration-record
---
## Vim

```
vim /etc/vimrc

set tabstop=4 # 修改vim中tab长度
set shiftwidth=4 # 修改vim自动缩进长度
set noeb vb t_vb= # 禁用vim蜂鸣声
```

```
vim /etc/inputrc

set bell-style none # 禁用bash蜂鸣声
```

## 主机名称

```
hostnamectl

hostnamectl set-hostname xxx
```

## 登录欢迎信息配置

```
vim /etc/update-motd.d 
```

自行修改基本欢迎信息。

```
vim /etc/ssh/sshd_config

PrintLastLog no
```

不打印上次登录信息。

## 命令提示符

```bash
vim ~/.bashrc

export PS1="[\u => \w]\$ "
```

```
\a	铃声字符
\d	格式为“日 月 年”的日期
\e	ASCII 转义字符
\h	本地主机名
\H	完全合格的限定域主机名
\j	shell 当前管理的作业数
\1	shell 终端设备名的基本名称
\n	ASCII 换行字符
\r	ASCII 回车
\s	shell 的名称
\t	格式为“小时:分钟:秒”的24小时制的当前时间
\T	格式为“小时:分钟:秒”的12小时制的当前时间
\A	格式为“小时:分钟”的24小时制的当前时间
@	格式为 am/pm 的12小时制的当前时间
\s	shell的名字
\u	当前用户的用户名
\v	bash shell 的版本
\V	bash shell 的发布级别
\w	当前工作目录
\W	当前工作目录的基本名称
!	该命令的 bash shell 历史数
#	该命令的命令数量
$	如果是普通用户，则为美元符号$；如果超级用户（root 用户），则为井号#。
\nnn	对应于八进制值 nnn 的字符
\	斜杠
[	控制码序列的开头
]	控制码序列的结尾
```

## 系统时区修改

```
root@OranMe2474:~# timedatectl list-timezones | grep Shanghai
Asia/Shanghai
root@OranMe2474:~# timedatectl set-timezone Asia/Shanghai
root@OranMe2474:~# timedatectl
               Local time: Mon 2022-11-28 10:59:39 CST
           Universal time: Mon 2022-11-28 02:59:39 UTC
                 RTC time: n/a
                Time zone: Asia/Shanghai (CST, +0800)
System clock synchronized: yes
              NTP service: inactive
          RTC in local TZ: no
```

## Crontab时区修改

```
vim /etc/crontab

CRON_TZ=Asia/Shanghai
TZ=Asia/Shanghai

systemctl restart cron
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**
