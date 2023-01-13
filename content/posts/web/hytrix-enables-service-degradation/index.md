---
title: Hystrix实现服务降级
date: 2022-07-26T10:59:08+08:00
categories: [Web]
tags: [hystrix, springcloud, microservice]
slug: hytrix-enables-service-degradation
---

## 什么是服务降级

### 概念

一般指在服务器压力剧增的时候，根据实际业务使用情况以及流量，对一些服务和页面有策略的不处理或者用一种简单的方式进行处理，从而释放服务器资源的资源以保证核心业务的正常高效运行。

### 应用场景

多用于微服务架构中，一般当整个微服务架构整体的负载超出了预设的上限阈值（和服务器的配置性能有关系），或者即将到来的流量预计会超过预设的阈值时。

### 大致实现过程

为了预防某些功能出现负荷过载或者响应慢的情况，在其内部暂时舍弃对一些非核心的接口和数据的请求，而直接返回一个提前准备好的fallback（退路）错误处理信息。这样，虽然提供的是一个有损的服务，但却保证了整个系统的稳定性和可用性。

## 使用Hystrix实现服务降级

本实验配合了Feign实现，利用Feign通过接口的方式解耦服务这一特点，通过在实现服务接口的类来编写方法对应的fallback方法。

### 环境搭建

一、关于pom

在消费方实现服务降级，除了基本包导入外，导入以下：
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

二、关于application.yml

除了基本配置外，以下两个超时时间的配置需要格外注意：
```yml
# 设置feign超时时间（默认为1秒）
feign:
hystrix:
    enabled: true
client:
    config:
    default:
        ConnectTimeOut: 5000
        ReadTimeOut: 5000
# 设置hystrix超时时间（默认为1秒）
hystrix:
command:
    default:
    execution:
        isolation:
        thread:
            timeoutInMilliseconds: 2000
```

其他关于Feign的环境配置省略了。

### 实现服务降级

一、PaymentService.java

在使用了Feign的基础上使用Hystrix功能，指定fallback对应的实现类。

```java
@Service
@FeignClient(value = "CLOUD-HYSTRIX-PAYMENT-SERVICE", fallback = PaymentHystrixService.class)
public interface PaymentService {
    ...
    @GetMapping("/payment/tt")
    CommonResult<Object> timeoutTest();
}
```

二、PaymentServiceImpl.java

```java
@Service
public class PaymentHystrixService implements PaymentService{
    ...
    @Override
    public CommonResult<Object> timeoutTest() {
        return new CommonResult<>(500, "error");
    }
}
```

三、 PaymentController.java

```java
@RestController
@Slf4j
public class PaymentController {
    @Resource
    private PaymentService paymentService;
    ...
    /**
    * @description: 访问一个耗时超过3秒的服务
    * @author Jiang Zhihang
    * @date 2022/7/26 11:16
    */
    @GetMapping("/consumer/payment/tt")
    public CommonResult<Object> timeoutTest() {
        return paymentService.timeoutTest();
    }
}
```

### 测试

一、访问`http://localhost:8001/payment/tt`，由于hystrix配置最小超时时间为2秒，而访问时间超3秒，所以得到如下结果：

```json
{
    "code": 500,
    "message": "error",
    "data": null
}
```

可以发现调用了fallback方法。

二、修改hystrix超时时间为4秒，再次访问得到：

```json
{
    "code": 200,
    "message": "timeout test",
    "data": null
}
```

得到成功返回的数据。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**