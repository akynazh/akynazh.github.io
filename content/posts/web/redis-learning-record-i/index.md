---
title: Redis学习记录一
date: 2021-12-14T23:40:44+08:00
categories: [Web]
tags: [redis, database]
slug: redis-learning-record-i
---

## Open, Connect And Config


1. open redis:

```
redis-server
```

2. connect to redis:

```
redis-cli
```

3. disconnect:

```
redis-cli shutdown
```

4. show chinese:

```
redis-cli --raw
```

5. connect to remote redis:

```
redis-cli -h host -p port -a password
```

6. get redis config:

```
config get {config_name}
```

## Data Type

list:

```
lpush clist redis
lpush clist mysql
lrange clist 0 100
```

key:

```
127.0.0.1:6379> set mkey sos
OK
127.0.0.1:6379> get mkey
"sos"
127.0.0.1:6379> del mkey
(integer) 1
127.0.0.1:6379> get mkey
(nil)
```

keys: 接偶数个参数，一一对应。

```
127.0.0.1:6379> hmset mkeys A a B b C c
OK
127.0.0.1:6379> hget mkeys B
"b"
```

set:

```
127.0.0.1:6379> sadd mkey 123
(integer) 1
127.0.0.1:6379> sadd mkey 123
(integer) 0
127.0.0.1:6379> smembers mkey
1) "123"
```

sorted_set: 根据分数和字典序进行排序，同分数下比较字典序，不同分数时，分数越低越靠前。

```
127.0.0.1:6379> zadd zs 1 ak
(integer) 1
127.0.0.1:6379> zadd zs 1 to
(integer) 1
127.0.0.1:6379> zrangebyscore zs 0 100
1) "ak"
2) "to"
127.0.0.1:6379> zadd zs 1 redis
(integer) 1
127.0.0.1:6379> zrangebyscore zs 0 100
1) "ak"
2) "redis"
3) "to"
127.0.0.1:6379> zadd zs 0 pp
(integer) 1
127.0.0.1:6379> zrangebyscore zs 0 100
1) "pp"
2) "ak"
3) "redis"
4) "to"
```

## Password的设置

```
PS C:\Users\akyna> redis-cli
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) ""
127.0.0.1:6379> config set requirepass 12345
OK
127.0.0.1:6379> config get requirepass
(error) NOAUTH Authentication required.
127.0.0.1:6379> auth 12345 # 进行密码验证
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "12345" # 发现已经有密码咯
127.0.0.1:6379> exit
PS C:\Users\akyna> redis-cli
127.0.0.1:6379> auth 12345
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "12345"
```

如果重启server密码会失效。

一般在Linux下主机重启后需要重新配置一下密码。

可以修改redis.conf文件，设置密码:

```
requirepass ${password}
```

以后通过下面命令：

```
redis-server redis.conf
```

进行服务重新启动时的配置，这样可以在服务开启时同时指定密码。
