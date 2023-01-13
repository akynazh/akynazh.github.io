---
title: Consul配置过程及测试
date: 2022-07-19T16:34:39+08:00
categories: [Web]
tags: [springcloud, microservice]
slug: consul-configuration-process-and-test
---

## 前言

类似于zookeeper和eureka，也起到微服务注册中心的作用, 满足分布式系统中的CP原则，是弱可用性的。

不同于zookeeper和eureka这两种主要由Java编写的语言，它主要由Go语言编写。

## 配置Consul环境

1. 下载consul，配置环境变量。
2. 运行`consul agent -dev`开启服务。
3. 默认端口为8500，访问`localhost:8500`进入管理界面。

## 编写springcloud服务代码

一、关于pom.xml

除了一些基本包的导入之外，关于consul包的导入：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```

二、关于application.yml

```yml
spring:
  application:
    name: cloud-consumer-order

  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
```

三、启动类添加@EnableDiscoveryClient注解。

## consul测试

较为简单，访问localhost:8500查看即可。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**