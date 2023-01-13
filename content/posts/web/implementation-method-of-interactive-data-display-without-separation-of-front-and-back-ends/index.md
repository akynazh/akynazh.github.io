---
title: 在前后端不分离的情况下进行交互性数据展示的实现方法 
date: 2022-02-11T00:05:25+08:00
categories: [Web]
tags: [springboot, web]
slug: implementation-method-of-interactive-data-display-without-separation-of-front-and-back-ends
---

## 前言

开发web项目时，常常需要在前端展示一些交互性的数据，比如表单填写错误的提示，操作成功与否的提示等。

本文主要讲述在使用Thymeleaf作为模板引擎开发前端时，即在前后端不分离的情况下，前后端进行交互性数据展示的实现方法。

## 使用cookie传递数据：不推荐

### 一、步骤

- 后端通过addCookie方法设置值
- 前端在页面加载时读取cookie值并进行展示
- 前端删除该cookie值

### 二、缺陷

这个方法我使用过，但是效果并不好，原因如下：

1. 用户可能禁止cookie
2. 后端如果有重定向操作将导致cookie添加失败
3. 前端每次都要删除cookie，有时可能会失效

## 使用session传递数据：值得借鉴

### 一、步骤

- 后端往session中存入数据
- 前端通过${session}进行获取数据并展示
- 前端将该数据删除或修改为指定默认值

这里注意正常情况下js是无法操作或者访问session值的，我们可以通过thymeleaf内置脚本进行操作：

```js
<script th:inline="javascript">
// 这里可以通过session访问值
</script>
```

### 二、缺陷

这个方法不好的地方显而易见，我们每次都要删除session值，而且只能通过内置脚本的方式操作，很不方便。

但是这种方法的思想值得借鉴，请看如下方法。

## 通过RedirectAttributesModelMap传递数据

注意这里后端采用SpringMVC。

### 一、步骤

- 通过RedirectAttributesModelMap往model中存值
- 返回视图对象，在视图对象中通过thymeleaf内置脚本进行数据展示

### 二、示例：提醒用户首先进行登录

#### 1、后端代码：

```java
@GetMapping("/loginFirst")
public String loginFirst(RedirectAttributesModelMap model) {
    model.addFlashAttribute("msg", "请先进行登录");
    return "redirect:/";
}
```

1. RedirectAttributesModelMap可以确保redirect后保存在model中数据不丢失

2. addFlashAttribute是把数据临时放在session中并在刷新页面后自动删除的方法，配合RedirectAttributesModelMap进行使用

#### 2、前端代码：

必须注意，这里外部js无法通过$('#msg').val()获取th:value设置的值的，所以必须通过thymeleaf提供的内联js代码操作交互的数据。

```html
<div class="alert"></div>
<input id="msg" value="" style="display: none"/>
<script th:inline="javascript">
    let msg = [[${msg}]];
    document.getElementById("msg").setAttribute("value", msg.toString());
</script>
```

这里可以在inline部分完成所有信息展示操作，但由于thymeleaf内联js无法调用jquery代码，所以我把msg存到隐藏域中，再通过jquery代码调用

```js
$(document).ready(function () {
    let msg = $('#msg').val();
    if (msg !== '' && msg != null) {
        $('.alert').html(msg).addClass('alert-info').show().delay(1500).fadeOut();
    }
})
```

#### 3、提示信息的css代码：

```css
/* 触发方式: $('.alert').html("errorMsg").addClass('alert-info').show().delay(1500).fadeOut();*/
.alert {
    display: none;
    position: fixed;
    top: 10%;
    left: 50%;
    min-width: 150px;
    margin-left: -100px;
    z-index: 99999;
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 5px;
}
.alert-info {
    color: white;
    text-align: center;
    font-family: "Times New Roman", SansSerif, sans-serif;
    background-color: black;
    background-image: linear-gradient(to bottom, gray, black);
    border-color: black;
}
```

### 三、评价

这个方法原理同上一个方法，都是通过session进行数据访问，只不过springmvc为我们封装好了好用的操作方法而已。

需要避过的坑有：

1. RedirectAttributesModelMap必须与addFlashAttribute结合使用
2. 无法通过外部js访问th:value设置的值，需要通过thymeleaf内联js进行操作或将数据保存到隐藏域中再进行外部js的操作

## 总结

本文主要介绍在前后端不分离的情况下进行交互性数据展示的实现方法，有点麻烦，容易出错，这也让我再次意识到前后端分离的必要性！


---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**