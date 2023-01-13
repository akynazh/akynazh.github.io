---
title: 理解Ribbon并自己实现负载均衡
date: 2022-07-20T17:07:35+08:00
categories: [Web]
tags: [microservice, springcloud]
slug: understand-ribbon-and-realize-load-balancing-by-yourself
---

## 负载均衡（LB）是什么

对于用户的某个请求，将有多个相同功能的服务点服务该请求，某个服务点挂了，其他服务点还是可以进行服务，这样就实现了系统的高可用。

## 关于集中式LB和进程内LB

### 集中式LB

在服务的消费方和提供方之间使用独立的LB设施，（软硬件均可，软件如Nginx，硬件如F5），由该设施负责把访问请求通过某种策略（可自行指定）转发至服务的提供方。

### 进程内LB

将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务点进行服务。

Ribbon属于进程内LB，它只是一个类库，集成于消费方进程，消费方通过它获取服务提供方的地址。

## 使用Ribbon实现负载均衡

### 关于导包

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> <!-- 已经包含了ribbon -->
</dependency>
```
注意eureka内置了ribbon。

### 开启注解

```java
@Configuration
public class ApplicationContextConfig {
    @Bean
    @LoadBalanced // 赋予负载均衡能力
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

访问相同服务名地址即可。

## 修改Ribbon负载均衡规则

所有规则均实现了IRule接口，通过查看接口实现类即可知道规则的种类。

默认是RoundRobinRule（轮询）这一规则。

下面修改为RandomRule（随机）这一规则：

### 在启动类扫描不到的包下创建规则：

```java
@Configuration
public class MyRibbonRule {
    @Bean
    public IRule myRule() {
        return new RandomRule();
    }
}
```

### 在启动类指定规则：

```java
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name="CLOUD-PAYMENT-SERVICE", configuration = MyRibbonRule.class)
public class OrderMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class, args);
    }
}
```

## 自己实现负载均衡

### 编写LB接口即实现类

要实现负载均衡，首先应获取得到所有的服务实例`ServiceInstance`。

```java
public interface LoadBalancer {
    ServiceInstance getServiceInstance(List<ServiceInstance> instances);
}
```

通过自旋锁获取新值，取余ServiceInstance个数，得到目标ServiceInstance下标。

```java
@Component
public class MyLoadBalancer implements LoadBalancer {
    private AtomicInteger aint = new AtomicInteger(0);
    public final int myCAS() {
        int expect, next;
        for (;;) {
            expect = aint.get();
            next = (expect + 1) % Integer.MAX_VALUE;
            if (aint.compareAndSet(expect, next)) return next;
        }
    }
    @Override
    public ServiceInstance getServiceInstance(List<ServiceInstance> instances) {
        if (instances == null || instances.size() <= 0) return null;
        return instances.get(myCAS() % instances.size());
    }
}
```

### 编写Controller

注意需要通过获取得到的ServiceInstance的uri作为访问前缀。

```java
@Resource
private RestTemplate restTemplate;

@Resource
private EurekaDiscoveryClient discoveryClient;

@Resource
private LoadBalancer loadBalancer;

@GetMapping("/consumer/payment/lb")
public String lbTest() {
    List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");
    ServiceInstance instance = loadBalancer.getServiceInstance(instances);
    log.info("lbtest: " + instance.getUri().toString());

    return restTemplate.getForObject(instance.getUri() + "/payment/lb", String.class);
}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**