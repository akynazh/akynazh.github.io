---
title: Zookeeper配置过程与测试
date: 2022-07-19T12:00:37+08:00
categories: [Web]
tags: [microservice, springcloud]
slug: zookeeper-configuration-process-and-test
---

## 前言

Zookeeper类似于Eureka，起到微服务注册中心的作用，满足分布式系统中的CP原则，是弱可用性的。

## 配置zookeeper环境

### 安装zookeeper

下载并解压zookeeper包为zookeeper3.7.1（假设下载的是3.7.1版本）。

然后将zookeeper解压缩到/usr/local/zookeeper3.7.1。

### 配置参数

一、编辑/conf/zoo.cfg

编辑zookeeper包内配置文件/conf/zoo.cfg（先创建，再将zoo_sample.cfg内容复制到其中）

修改或添加以下内容：

```conf
dataDir=/usr/local/zookeeper3.7.1/dataDir
dataLogDir=/usr/local/zookeeper3.7.1/dataLogDir
```

注意同时创建对应文件夹。其中端口号默认为2181，也可以进行修改。

二、 配置环境变量

```conf
# zookeeper
export ZOOKEEPER_HOME=/usr/local/zookeeper3.7.1
export PATH=$PATH:$ZOOKEEPER_HOME/bin
```

接着通过source命令生效。

### 开启zookeeper连接

（前置条件是已配好java环境）

执行`zkServer.sh start`即可。

### 查看连接情况：

```bash
zkServer.sh status

ZooKeeper JMX enabled by default
Using config: /usr/local/zookeeper3.7.1/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Mode: standalone
```
可见已经开启成功了。

### 客户端进行连接：

执行`zkCli.sh`，连接成功后可查看：

```bash
[zk: localhost:2181(CONNECTED) 1] ls /
[zookeeper]
[zk: localhost:2181(CONNECTED) 2] get /zookeeper
```

## 编写springcloud服务代码

一、关于pom.xml

除了一些基本包的导入之外，关于zookeeper包的导入：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.7.1</version>
</dependency>
```

starter默认包可能和自己服务器上的zookeeper版本不一致，需要排除并执行导入。

二、关于application.yml

```yml
cloud:
    zookeeper:
    connect-string: 172.23.215.195:2181 # 自己服务器ip以及zookeeper端口地址。
```

三、启动类添加@EnableDiscoveryClient注解。

## zookeeper测试

```bash
[zk: localhost:2181(CONNECTED) 3] ls /
[services, zookeeper]
[zk: localhost:2181(CONNECTED) 4] ls /services
[cloud-provider-payment]
[zk: localhost:2181(CONNECTED) 5] ls /services/cloud-provider-payment
[2f68697b-4e55-4740-9204-f74842694a1d]
[zk: localhost:2181(CONNECTED) 10] get /services/cloud-provider-payment/2f68697b-4e55-4740-9204-f74842694a1d

{"name":"cloud-provider-payment","id":"2f68697b-4e55-4740-9204-f74842694a1d","address":"LAPTOP-JZH","port":8004,"sslPort":null,"payload":{"@class":"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance","id":"application-1","name":"cloud-provider-payment","metadata":{}},"registrationTimeUTC":1658200325523,"serviceType":"DYNAMIC","uriSpec":{"parts":[{"value":"scheme","variable":true},{"value":"://","variable":false},{"value":"address","variable":true},{"value":":","variable":false},{"value":"port","variable":true}]}}
```

对以上json串格式化后，可以获得服务具体信息如下：

```json
{
    "name": "cloud-provider-payment",
    "id": "2f68697b-4e55-4740-9204-f74842694a1d",
    "address": "LAPTOP-JZH",
    "port": 8004,
    "sslPort": null,
    "payload": {
        "@class": "org.springframework.cloud.zookeeper.discovery.ZookeeperInstance",
        "id": "application-1",
        "name": "cloud-provider-payment",
        "metadata": {}
    },
    "registrationTimeUTC": 1658200325523,
    "serviceType": "DYNAMIC",
    "uriSpec": {
        "parts": [
            {
                "value": "scheme",
                "variable": true
            },
            {
                "value": "://",
                "variable": false
            },
            {
                "value": "address",
                "variable": true
            },
            {
                "value": ":",
                "variable": false
            },
            {
                "value": "port",
                "variable": true
            }
        ]
    }
}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**