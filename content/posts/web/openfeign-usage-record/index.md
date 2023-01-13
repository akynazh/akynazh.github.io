---
title: OpenFeign使用记录
date: 2022-07-22T17:39:24+08:00
categories: [Web]
tags: [springcloud, microservice]
slug: openfeign-usage-record
---

## 为什么要使用OpenFeign

之前在消费端使用RestTemplate时，每次请求都要进行诸如

```java
restTemplate.postForObject(PAYMENT_URL + "/payment/create", payment, CommonResult.class);
```

这样的调用，需要指定较多参数，当一个接口调用中需要非常多这样的请求时，会比较繁琐，而且这种方式不够抽象。

OpenFegin利用面向接口编程的思想，抽象化，简化了上述操作。

## 使用OpenFeign

### 关于pom.xml

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### 关于application.yml

除了基本配置内容外，注意以下配置：

```yml
feign:
# 设置feign客户端超时时间（默认为1秒）
client:
    config:
    default:
        ConnectTimeOut: 10000
        ReadTimeOut: 10000
# 针对每个接口设置日志监控级别
logging:
level:
    com.jzh.springcloud.service.PaymentService: debug # feign日志以什么级别监控端口
```

### 编写服务接口

首先在启动类开启@EnableFeignClients注解，接着编写服务接口：

- 添加@FeignClient注解，值为对应微服务名；
- 方法对应微服务Controller下的方法即可。

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentService {
    @GetMapping("/payment/get/{id}")
    CommonResult<Payment> getPaymentById(@PathVariable("id") Long id);

    @PostMapping("/payment/create")
    CommonResult<Integer> createPayment(@RequestBody Payment payment);
}
```

### 调用接口

注入PaymentController接口，然后即可调用它的方法。

```java
@RestController
@Slf4j
public class PaymentController {
    @Resource
    private PaymentService paymentService;

    @PostMapping("/consumer/payment/create")
    public CommonResult<Integer> create(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    @GetMapping("/consumer/payment/get/{id}")
    public  CommonResult<Payment> getPayment(@PathVariable("id") Long id) {
        return paymentService.getPaymentById(id);
    }
}
```

### 配置日志输出级别

返回Logger.Level对象，放入spring容器中

```java
@Configuration
public class FeignConfig {
    @Bean
    Logger.Level feignLogLevel() {
        return Logger.Level.BASIC;
    }
}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**