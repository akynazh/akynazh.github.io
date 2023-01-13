---
title: 对于Rest风格的理解
date: 2022-12-08T16:35:54+08:00
categories: [Web]
tags: [web]
slug: understanding-of-rest-style
---

**REST**，全称 Representational State Transfer，即表现层状态转移。

符合REST规范的写法：

```
POST http://www.test.com/lemon   // 创建
Get http://www.test.com/lemon    // 查询
PUT http://www.test.com/lemon    // 修改
DELETE http://www.test.com/lemon //删除
```

不符合REST规范的写法：

```
POST http://www.test.com/Createlemon  // 创建
POST http://www.test.com/Querylemon   // 查询
POST http://www.test.com/Modifylemon  // 修改
POST http://www.test.com/Deletelemon  //删除
```

也就是用 URL 定位资源，用 HTTP 描述操作。

实际操作：

对于前端，在 js 中可以指定请求类型，以通过 ajax 发送请求为例，可以通过 type 属性进行指定，假如我要进行一条插入操作，则 type 值应为 "PUT":

```js
$.ajax({
    type: "PUT",
    url: "http://www.test.com/lemon",
    contentType: 'application/json',
    data: JSON.stringify({ ID: "1" }),
    success: function (data, status) {}
});
```

对于后端，以 java 为例，对于 PUT 操作，即可对应采用 `@PutMapping` 进行指定。

此外，对于前后端数据的交互，数据需要是 json 格式的，后端中可采用 `@RestController` 进行自动的转换，对象将会自动转换为 json 格式数据返回给前端。

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**