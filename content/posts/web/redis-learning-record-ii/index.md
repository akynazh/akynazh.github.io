---
title: Redis学习记录二
date: 2021-12-20T10:15:05+08:00
categories: [Web]
tags: [redis, database]
slug: redis-learning-record-ii
---

## 事务

```
127.0.0.1:6379> multi # 开启事务
OK
127.0.0.1:6379> set book java
QUEUED
127.0.0.1:6379> get book
QUEUED
127.0.0.1:6379> exec # 执行事务
1) OK
2) "java"
127.0.0.1:6379> get book
"java"
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set name peter
QUEUED
127.0.0.1:6379> discard # 取消事务
OK
127.0.0.1:6379> exec
(error) ERR EXEC without MULTI
127.0.0.1:6379> get name
(nil)
```

## 获取key

### 获取指定key

```
keys * # 获取所有key
```

```
keys pattern # 根据pattern获取key
```

```
- * 代表匹配任意字符
- ? 代表匹配一个字符
- [] 代表匹配部分字符，例如[1,3]代表匹配1和3，而[1-10]代表匹配1到10的任意数字。
- x 转移字符，例如要匹配星号，问号需要转义的字符
```

e.g.

```
127.0.0.1:6379> keys *
1) "book"
2) "mkeys"
3) "zset"
4) "mkey"
127.0.0.1:6379> keys m*
1) "mkeys"
2) "mkey"
```



### 获取key信息

```
127.0.0.1:6379> keys *
1) "book"
2) "mkeys"
3) "zset"
4) "mkey"
127.0.0.1:6379> dbsize # 获取key数量
(integer) 4
```

### 删除key

```
127.0.0.1:6379> flushall # 删除所有数据库所有key
OK
127.0.0.1:6379> keys *
(empty list or set)
```

```
flushdb # 删除当前数据库所有key
```

redis数据库数量是固定的：

```
127.0.0.1:6379> config get databases
1) "databases"
2) "16" # 共16个数据库
```

## 发布和订阅

开启一个redis-cli:

```
127.0.0.1:6379> subscribe news
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "news"
3) (integer) 1
```

再开启一个redis-cli:

```
PS C:\Users\akyna> redis-cli
127.0.0.1:6379> publish news "hello"
(integer) 1
127.0.0.1:6379> publish news "world"
(integer) 1
```

在第一个的redis-cli中接收到订阅的消息：

```
127.0.0.1:6379> subscribe news
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "news"
3) (integer) 1
1) "message"
2) "news"
3) "hello"
1) "message"
2) "news"
3) "world"
```
