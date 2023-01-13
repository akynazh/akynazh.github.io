---
title: Zipkin使用记录
date: 2022-07-29T18:26:44+08:00
categories: [Web]
tags: [springcloud, microservice]
slug: zipkin-usage-record
---

## Zipkin的作用

- 查看微服务调用过程；
- 分析微服务依赖关系；
- 方便地找到调用过程错误发生位置。

## Zipkin使用记录

一、下载Zipkin并运行：

```
java -jar zipkin.jar
```

这样成功运行后，默认在端口9411可以查看图形管理界面。

二、依赖引入

在所有调用到的微服务中引入：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

三、配置文件

```yml
spring:
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      probability: 1 # 采样率介于0和1之间，1表示全部采集
```

## 测试

通过service-name标签搜索自己的微服务名称，即可检索到与该微服务有依赖的所有微服务，可查看调用过程，依赖关系等。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**