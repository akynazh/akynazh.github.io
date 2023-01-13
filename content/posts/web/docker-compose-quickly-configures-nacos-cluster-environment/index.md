---
title: Docker-compose快速配置nacos集群环境
date: 2022-08-07T16:02:27+08:00
categories: [Web]
tags: [docker, microservice, springcloud]
slug: docker-compose-quickly-configures-nacos-cluster-environment
recommand: 1
---

## 前言

### 总体架构说明

在一台CentOS主机上部署，版本为7.9，IP为192.168.1.127。

通过docker创建三台nacos环境的机器，端口均运行在8848，分别映射到主机的8848，8858，8868端口上，名称（hostname）分别为nacos-server1，nacos-server2，nacos-server3。

主机通过nginx监听8080端口，通过负载均衡将请求转发到三台nacos机器上。

主机作为数据库源，使用mysql作为数据库，端口为3306，三台机器都安装mysql环境，端口运行在3306，映射到主机3307端口。

### 服务说明

创建一个简单的服务，注册到上述nacos环境中，通过在bootstrap.yaml中读取nacos配置来验证环境是否配置成功。

## 搭建nacos环境

### 编辑docker-compose的yaml文件

在nacos官网下载nacos-docker到主机上，编辑`example/cluster-hostname.yaml`文件。

根据官网说明，在nacos2中需要额外暴露两个端口，分别偏移8848这个端口1000和1001。

```yaml
version: "3"
services:
  nacos1:
    hostname: nacos-server-1
    container_name: nacos1
    image: nacos/nacos-server:${NACOS_VERSION}
    volumes:
      - ./cluster-logs/nacos1:/home/nacos/logs
      - ./init.d/custom.properties:/home/nacos/init.d/custom.properties
    ports:
      - "8848:8848"
      - "9848:9848" # 偏移1000
      - "9849:9849" # 偏移1001
      - "9555:9555"
    env_file:
      - ../env/nacos-hostname.env
    restart: always
    depends_on:
      - mysql

  nacos2:
    hostname: nacos-server-2
    image: nacos/nacos-server:${NACOS_VERSION}
    container_name: nacos2
    volumes:
      - ./cluster-logs/nacos2:/home/nacos/logs
      - ./init.d/custom.properties:/home/nacos/init.d/custom.properties
    ports:
      - "8858:8848"
      - "9858:9848"
      - "9859:9849"
    env_file:
      - ../env/nacos-hostname.env
    restart: always
    depends_on:
      - mysql
  nacos3:
    hostname: nacos-server-3
    image: nacos/nacos-server:${NACOS_VERSION}
    container_name: nacos3
    volumes:
      - ./cluster-logs/nacos3:/home/nacos/logs
      - ./init.d/custom.properties:/home/nacos/init.d/custom.properties
    ports:
      - "8868:8848"
      - "9868:9848"
      - "9869:9849"
    env_file:
      - ../env/nacos-hostname.env
    restart: always
    depends_on:
      - mysql
  mysql:
    container_name: mysql
    image: nacos/nacos-mysql:5.7
    env_file:
      - ../env/mysql.env
    volumes:
      - ./mysql:/var/lib/mysql
    ports:
      - "3307:3306"
```

### 配置数据库信息

通过官网提供的sql脚本在主机建好数据库。

接着指定mysql数据库源信息，编辑`env/nacos-hostname.env`文件如下：

```conf
PREFER_HOST_MODE=hostname # hostname模式
NACOS_SERVERS=nacos-server-1 nacos-server-2 nacos-server-3
MYSQL_SERVICE_HOST=192.168.1.127
MYSQL_SERVICE_DB_NAME=nacos_config
MYSQL_SERVICE_PORT=3306
MYSQL_SERVICE_USER=****
MYSQL_SERVICE_PASSWORD=******
```

注意填写好主机的mysql账号密码。

最后指定docker中mysql信息，编辑`env/mysql.env`文件即可：

```conf
MYSQL_ROOT_PASSWORD=******
MYSQL_DATABASE=nacos_config
MYSQL_USER=****
MYSQL_PASSWORD=******
```

### 运行docker

执行如下命令即可：

```
docker-compose -f example/cluster-hostname.yaml up
```

等到出现如下信息即成功部署环境：

```
nacos2  | 2022-08-07 07:05:41,147 INFO Nacos started successfully in cluster mode. use external storage
nacos2  |
nacos1  | 2022-08-07 07:05:41,194 INFO Nacos is starting...
nacos1  |
nacos1  | 2022-08-07 07:05:41,240 INFO Nacos started successfully in cluster mode. use external storage
nacos1  |
nacos3  | 2022-08-07 07:05:42,097 INFO Nacos is starting...
nacos3  |
nacos3  | 2022-08-07 07:05:42,135 INFO Nacos started successfully in cluster mode. use external storage
```

## 搭建nginx环境

首先安装nginx，接着编辑`/etc/nginx/nginx.conf`文件如下：

```conf
...

http {
    ...
    upstream nacos-servers {
            server 192.168.1.127:8848;
            server 192.168.1.127:8858;
            server 192.168.1.127:8868;
    }
    server {
            location / {
                    proxy_pass http://nacos-servers;
            }
            listen 8080;
    }
}
```

监听8080端口，通过upstream转发到三台机器上。

接着运行nginx即可：

```
nginx -c /etc/nginx/nginx.conf
```

## 创建微服务

一、关于依赖导入：

除了其他一些基本的依赖，还需要导入：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

二、配置文件编写：

编辑`bootstarp.yaml`如下：

nacos的地址即nginx配置好的地址192.168.1.127:8080。

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 192.168.1.127:8080
      config:
        server-addr: 192.168.1.127:8080
        file-extension: yaml
  profiles:
    active: prod
  application:
    name: nacos-config-client
server:
  port: 9669
```

三、启动类记得还要开启@EnableDiscoveryClient注解。

四、编写具体服务：

```java
@RefreshScope
@RestController
@Slf4j
public class ConfigController {
    @Value("${config.version}")
    private String version;

    @GetMapping("/v")
    public String getVersion() {
        return version;
    }
}
```

注意开启@RefreshScope注解。

## 测试

一、访问192.168.1.127:8080，成功访问并登录；

二、查看集群管理的节点列表，三个前缀名为nacos-server的节点都处在UP状态；

三、编写`nacos-config-client-prod.yaml`文件，为微服务名+环境的格式：

```
config:
    version: 1.0
```

四、开启微服务，再查看服务列表，名为nacos-config-client的服务已经成功注册，访问接口/v，返回1.0；

五、修改配置，version改为2.0，再次访问/v接口，返回2.0。

测试完毕。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**