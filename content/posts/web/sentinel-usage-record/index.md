---
title: Sentinel使用记录
date: 2022-08-08T17:46:49+08:00
categories: [Web]
tags: [springcloud, microservice]
slug: sentinel-usage-record
---

## Sentinel是什么

Sentinel 是面向分布式、多语言异构化服务架构的流量治理组件，主要以流量为切入点，从流量路由、流量控制、流量整形、熔断降级、系统自适应过载保护、热点流量防护等多个维度来帮助开发者保障微服务的稳定性。（来源于官方文档）

个人使用感觉：类似于Hystrix，使用上感觉比Hystrix更容易，功能也更强大。

## 架构说明

两个生产者服务运行在9001和9002端口，一个消费者服务运行在80端口，均注册到nacos，消费者调用两个生产者的服务。

将消费者服务注册到sentinel中，通过修改一些规则进行测试。

controller下的方法指定好处理服务限流，降级或熔断等的方法blockHandler，以及处理未知异常的fallback方法，通过指定class的方法避免代码膨胀。

service下的方法指定好关于生产者的服务限流，降级或熔断等的处理方法。

## 代码编写记录

### 生产者端

一、配置

关于nacos的配置省略，只记录sentinel的配置：

```yaml
spring:
  application:
    name: nacos-payment-provider
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8179
```

二、controller编写

```java
@RestController
@Slf4j
public class PaymentController {
    @Value("${server.port}")
    private String port;

    @GetMapping("/payment/nacos/info")
    public String paymentInfo() {
        return "port: " + port;
    }
}
```

返回对应端口，方便测试负载均衡。

### 消费者端

一、配置

```yaml
spring:
  application:
    name: nacos-order-consumer
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8179
feign:
  sentinel:
    enabled: true
```

注意要开启feign的sentinel支持。

二、依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
...
```

三、service编写

```java
@FeignClient(value = "nacos-payment-provider", fallback = PaymentFallbackService.class)
@Service
public interface PaymentService {
    @GetMapping("/payment/nacos/info")
    String paymentInfo();
}
```

对应实现类：

```java
@Service
public class PaymentFallbackService implements PaymentService{
    @Override
    public String paymentInfo() {
        return "feign::fallback";
    }
}
```

这里处理关于生产者的服务限流，降级或熔断问题。

四、两个服务问题Hanlder的编写

根据官方文档，这里的方法都需指明为static，否者无法识别。

1、GlobalBlockHandler

```java
@Component
public class GlobalBlockHandler {
    public static String block1(BlockException e) {return "block1";}
    public String block2(BlockException e) {return "block2";}
}
```

这个用于消费者端处理服务限流，降级或熔断等问题。

2. GlobalFallbackHandler

```java
@Component
public class GlobalFallbackHandler {
    public static String fallback1()  {return "fallback1";}
    public static String fallback2()  {return "fallback2";}
}
```

这个用于消费者端处理未知异常。

五、controller编写

```java
@RestController
@Slf4j
public class OrderController {
    @Resource
    PaymentService paymentService;

    @GetMapping("/consumer/payment/nacos/info")
    @SentinelResource(
            value = "paymentInfo",
            fallbackClass = GlobalFallbackHandler.class, fallback = "fallback1",
            blockHandlerClass = GlobalBlockHandler.class, blockHandler = "block1"
    )
    public String paymentInfo()  {
        int a = 1 / 0;
        return paymentService.paymentInfo();
    }
}
```

指定好class的同时，需用fallback和blockHandler分别指定好具体的方法名。

## 测试

一、测试除0错误是否正确进入fallback1：直接访问接口，返回“fallback1”，正确；

二、测试消费者端服务限流：sentinel指定流控规则，QPS设置阈值为1，连续访问接口，返回“block1”，正确；

三、测试生产者端除0错误是否正确进入fallback：给生产者controller添加除0错误，访问接口，返回“feign::fallback”，正确；

四、测试其他服务规则：

指定熔断规则，熔断策略选为慢调用比例，最大RT（Round Trip Time，也叫响应时间）设置为200ms，比例阈值设置为0.5，最小请求数设置为5。

为模拟慢调用，手动增大发出接口请求到收到结果的延迟，在controller中添加`Thread.sleep(1000)`，延迟1秒。

连续访问接口，首先返回了“9001”，即访问正常时得到的结果，然而发现在5次以上的请求以后，返回了“block1”，成功熔断。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**