---
title: Swagger使用记录
date: 2022-06-25T21:20:38+08:00
categories: [Web]
tags: [web, springboot]
slug: swagger-usage-record
---

## 依赖导入：

```xml
<!-- swagger所需依赖 -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.6.1</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.6.1</version>
</dependency>
```

## 配置Swagger

/config/SwaggerConfig.java

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                .paths(PathSelectors.any())
                .build();
    }

    // 基本信息的配置，信息会在api文档上显示
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("jzh测试的接口文档")
                .description("xx相关接口的文档")
                .termsOfServiceUrl("http://localhost:7777")
                .version("1.0")
                .build();
    }
}
```

以后访问`http://localhost:7777`即可查看文档界面。

## Swagger具体使用

### 注解用途

一、@Api

使用在类上，表明是swagger资源，@API拥有两个属性:value、tags，源码如下：

```java
//If tags is not used,this value will be used to set the tag for the operations described by this resource. Otherwise, the value will be ignored.
String value() default "";

//Tags can be used for logical grouping of operations by resources or any other qualifier.
String[] tags() default {""};
```

生成的api文档会根据tags分类，如果tags未被使用，那么value将被当作tag使用（value一般用于描述该类的作用，但不能有多个值）。

二、@ApiOperation

使用于在方法上，表示一个请求的操作。

- value：用于方法描述
- notes：用于提示内容
- tags：可以重新分组（视情况而用）

三、@ApiParam

使用在方法上或者参数上。

- name：参数名
- value：参数说明
- required：是否必填

四、@ApiModel

使用在类上，表示对类进行说明。

- value：表示对象名
- description：描述

五、@ApiModelProperty

使用在方法，字段上，表示对model属性的说明或者数据操作更改。

- value：字段说明
- name：重写属性名字
- dataType：重写属性类型
- required：是否必填
- example：举例说明
- hidden：隐藏

### 具体使用

/SwaggerTest.java

```java
@RestController
@RequestMapping("/swagger")
@Api(tags = {"测试swagger", "用户基本操作"})
public class SwaggerTest {
    @ApiOperation(value = "新增用户")
    @GetMapping("/adduser/{userName}/{userPwd}")
    public SwaggerUser addUser(@PathVariable @ApiParam(value = "用户名", required = true) String userName,
                        @PathVariable @ApiParam(value = "密码", required = true) String userPwd) {
        return new SwaggerUser(new Random().nextInt(100), userName, userPwd);
    }
}
```

/SwaggerUser.java

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SwaggerUser {
    @ApiModelProperty(value = "用户ID")
    private Integer userId;
    @ApiModelProperty(value = "用户名")
    private String userName;
    @ApiModelProperty(value = "用户密码")
    private String userPwd;

}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**