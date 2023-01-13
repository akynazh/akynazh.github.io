---
title: 开发中遇到的命名规范问题
date: 2022-12-08T15:40:09+08:00
categories: [Language]
tags: [naming]
slug: naming-standard-problems-encountered-in-development
---

## 后端中与数据库交互时

数据库一般采用下划线命名，而对于 java 而言，实体类的命名应当是驼峰式的命名，所以在与数据库交互时需要注意进行转换。

对于采用了 Mybatis-plus 框架的应用，无需考虑此问题，因为它已经帮我们做好转换了，对应的配置如下：

```
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
```

如果你数据库命名已经采用了驼峰式命名，需要将该配置置为 false。（默认为 true）

对于没采用该框架的应用，需要注意在编写的 sql 语句中进行转换。

## 关于后端返回的 json 数据

首先注意，json 采用驼峰命名法。

一般对于前后端分离的项目，后端都是返回 json 格式数据，比如使用 `@RestController` 进行自动的转换。

对于一个采用驼峰命名法命名的变量，比如 userId，转换后返回前端的 json 属性名是 userId，没有问题。

但是当变量名为 uId时，转换后则变为 uid，这就产生了问题。我还测试了其它一些变量，如下：

```
# userId
{"code":200,"msg":"ok","obj":{"userId":"hello"}}
# uId
{"code":200,"msg":"ok","obj":{"uid":"hello"}}
# Id
{"code":200,"msg":"ok","obj":{"id":"hello"}}
# uuId
{"code":200,"msg":"ok","obj":{"uuId":"hello"}}
```

可见当为 uId 和 Id 时，都会出现问题。

一般可以考虑在后端变量命名时，不让第二个字符大写，或者采用 `@JsonProperty("uId")` 进行解决。

## 关于前端的命名问题

css 采用串式命名法（kebab-case）。

在串式命名法中，各个单词之间通过下划线“-”连接，比如：

```
hello-world
first-project
```

js 采用驼峰命名法。

## 关于 url 变量的命名问题

注意域名是不区分大小写的：

`hTTps://aKYnazh.site` 和 `https://akynazh.site` 是一回事。

但对于路径名称和变量则是区分大小写的，对于这些部分名称的命名，则需要视情况而定。

但一般是字母全部小写和使用连词符（-）分割。

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**