---
title: Linux实用操作之进程管理 
date: 2022-10-02T22:55:53+08:00
categories: [OS]
tags: [linux]
slug: process-management-of-linux-practical-operation
---

## 查看所有进程

### ps -ef

- -e : all processes (-A)
- -f : full-format, including command lines

```bash
[root@VM-0-11-centos ~]# ps -ef | head -n 1
UID PID PPID C STIME TTY TIME CMD
```

解释如下：
- PPID  父进程ID
- C 占用CPU百分比
- STIME 就是"start time"
- TTY 进程在哪个终端显示
- CMD 命令的名称和参数

### ps aux

- a: all with tty, including other users (和-a是不同的)
- u: user-oriented format
- x: processes without controlling ttys

```bash
[root@VM-0-11-centos ~]# ps -aux | head -n 1
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
```

解释如下：

- %MEM 占用内存百分比
- VSZ 该进程使用的虚拟內存量（KB）
- RSS 该进程占用的固定內存量（KB）（驻留中页的数量）
- STAT 进程状态

STAT状态位常见的状态字符有:
```
D      //无法中断的休眠状态（通常 IO 的进程）； 
R      //正在运行可中在队列中可过行的； 
S      //处于休眠状态； 
T      //停止或被追踪； 
Z      //僵尸进程； 
s      //进程的领导者（在它之下有子进程）； 
l      //多线程，克隆线程（使用 CLONE_THREAD, 类似 NPTL pthreads）； 
+      //位于后台的进程组；
```

### ps -l

仅查阅自己的bash相关程序

...

## 查看相关进程

```bash
[root@VM-0-11-centos ~]# ps -ef | head -n 1; ps -ef | grep java
UID        PID  PPID  C STIME TTY          TIME CMD
root     25889 24972  4 17:46 pts/1    00:00:11 java -jar LonersHub-0.0.1-SNAPSHOT.jar
root     26558 24972  0 17:51 pts/1    00:00:00 grep --color=auto java
```

## 终止或重启进程

### 关于kill命令

kill用于想某个进程发送信号。

列出所有序号代表的信号含义：

```bash
[root@VM-0-11-centos ~]# kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP      6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL ......
```

最常用的信号是：

- 1 (SIGHUP)：重新加载进程。

- 9 (SIGKILL)：杀死一个进程。

- 15 (SIGTERM)：正常停止一个进程。

默认不带信号序号的kill就是SIGTERM，SIGTERM可以被阻塞、处理和忽略，因此有的进程可能无法按预期的结束。

### 关于killall命令

无需PID，通过指定的名称进行对应进程的kill操作。

killall [-iIe] -signal 指令名称

-i: interactive, 互动式kill

### 停止进程

1. 获取相关进程PID，再通过kill终止占用该端口的程序：

```bash
kill -9 PID
```

更快捷的方式：（根据某个名称进行操作，可能导致错误，因为多个进程可能含有相同名称，慎用。）

```bash
kill -9 `ps -ef | grep ins | grep -v color | awk '{print $2}'`
```

2. 通过相关名称kill

e.g. 依次询问每个htppd相关程序是否需要被终止

```bash
killall -i -9 httpd
```

## 背景工作切换

1. 观察当前工作状态： jobs

`jobs -l`可同时列出PID。

2. 将背景工作拿到前景来处理：fg %jobnumber

3. 让工作在背景的状态变成运行在：bg &jobnumber

e.g. 

当按下ctrl-z将vim工作放到背景后，默认情况下，vim工作将处于"Stpped"状态，使用bg开始运行。

plus: & 将工作放到背景“执行”。

## 离线管理

```bash
nohub {cmd} &
```

不打印日志：

```bash
nohup {cmd} >/dev/null 2>&1 &
```

`/dev/null`类似于回收站，只是无法像window的回收站一样恢复。

`>/dev/null`，就是把标准输出（1）写到`/dev/null`。

对于`2>&1`：

我们知道，1代表标准输出，而2代表标准错误输出，而0代表标准输入，这里就是将标准错误输出重定向到标准输出，这样也让标准错误输出写到了`/dev/null`。