## web

80/tcp

443/tcp

## verysync

22330/tcp  数据传输TCP端口

8886/tcp 用于微力图形界面管理的端口

3000/tcp 微力中继服务默认端口

22067/tcp 中继服务器连接端口

22027/udp 局域网节点IP发现端口

58397/udp UDP XXXX 数据传输UDP端口 XXXX 为随机值 可在微力同步设置中查看和设置

<!-- 80/tcp 443/tcp 软件连接配置信息获取端口, 用于获取其它节点的IP信息 中继信息 -->

## redis

6379/tcp

## mysql

3306/tcp

## ssh

22/tcp

## clash

9090/tcp

## Windows Firewall

### 配置命令

```
netsh advfirewall firewall add rule name= "MY_TCP_PORT" dir=in action=allow protocol=TCP localport=

netsh advfirewall firewall add rule name= "MY_UDP_PORT" dir=in action=allow protocol=UDP localport=
```

### 两个规则

- 入站规则：针对本机的端口

- 出站规则：针对访问其它主机的端口