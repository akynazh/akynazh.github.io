---
title: Config结合Bus使用记录
date: 2022-07-27T22:00:55+08:00
categories: [Web]
tags: [springcloud, microservice]
slug: config-combined-with-bus-usage-record
---

## 为何要使用Config和Bus

Config可以进行多个微服务下的全局配置，更加方便，易于管理。

当全局配置修改时，需要通知各个微服务，一个一个地通知是非常耗时的，如果可以通过广播的方式快速将消息传递出去就轻松多了，而通过Bus即可实现这一点。

## 测试方法

一、在6996端口通过git拉取全局配置，相当于一个ConfigServer，6886和6776端口作为ConfigClient；

二、Bus结合RabbitMQ实现，修改配置时，只通知ConfigServer，达到消息广播的效果。

## 依赖引入

一、ConfigServer端：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

二、ConfigClient端：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

其他一些基本包就省略了。

## 文件配置

一、ConfigServer端：

以下为application.yml:

```yml
spring:
  cloud:
    config:
      server:
        git:
          # github项目地址
          uri: https://github.com/akynazh/SpringCloud-Demo.git
          # 指定搜索项目下config文件夹中的内容
          search-paths:
            - config
          # 指定分支
          default-label: master
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
management:
  endpoints:
    web:
      exposure:
        # 通过/actuator/bus-refresh可进行事件通知
        include: "bus-refresh"
```

以后，运维人员修改config时，即可通过如下地址：

```
http://localhost:6996/actuator/bus-refresh
```

即可发送POST请求进行消息通知。

二、ConfigClient端：

以下为bootstrap.yml:（可以加载全局配置）

```yml
spring:
  application:
    name: cloud-config-client
  cloud:
    config:
      label: master # 分支
      name: config # 文件名
      profile: dev # 环境
      uri: http://localhost:6996 # 全局配置加载地址
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
```

值得注意的地方：

第一，config文件名编写需要遵循一定规则，我选择的是{name}-{profile}.yml的格式，然后如上配置文件应该填写对应内容。

第二，application-name可以用于后续选择性通知，如只想通知6776，可通过POST请求访问如下地址：http://localhost:6996/actuator/bus-refresh/cloud-config-client:6776

## 编写Java类

一、ConfigServer需要注意添加@EnableConfigServer注解。
 
二、ConfigClient端的Controller编写：

```java
@RestController
@Slf4j
public class MyController {

    @Resource
    private Environment env;

    @Value("${server.port}")
    String port;

    @GetMapping("/v")
    public String getVersion() {
        return "port: " + port + "\t " + env.getProperty("config.version");
    }
}
```

## 测试

### 启动RabbitMQ

进入到sbin文件目录下：

```
.\rabbitmq-service.bat start
```

默认启动在5672端口。（图形界面在15672端口）

### 加载配置测试

访问：http://localhost:6996/master/config-dev.yml

会从github加载得到：

```yml
config:
  label: master
  profile: dev
  version: 3.0
```

访问：http://localhost:6776/v

得到：

```
port: 6776 3.0
```

6886得到相同结果，证明成功加载全局配置。

### 修改配置测试

修改配置version为3.6，提交，发送请求如下：

```
curl -X POST "http://localhost:6996/actuator/bus-refresh"
```

发现三个端口version均改为3.6，测试通过。

修改配置version为3.9，提交，发送请求如下：

```
curl -X POST "http://localhost:6996/actuator/bus-refresh/cloud-config-client:6776"
```

发现6996和6776的version为3.9，而6886的version仍为3.6，测试通过。


---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**