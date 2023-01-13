---
title: Java开发中遇到的bug记录
date: 2022-01-06T17:23:00+08:00
categories: [Language]
tags: [java, bug]
slug: record-of-bugs-encountered-in-java-development
---

持续更新中。

## BufferedWriter无法正确写出问题

这是一段客户端代码，向服务器端发送消息，然后接收服务器端的回复：

```java
try (
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()))
) {
    String message;
    while((message = stdIn.readLine()) != null) {
        out.write(message);
        out.flush();
        System.out.println("Receive from server: " + in.readLine());
    }
} catch (Exception e) {
    System.out.println(e.getMessage());
}
```

这是服务端代码的一部分，接收客户端消息，并向客户端回复：

```java
try (
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()))
) {
    String message;
    while((message = in.readLine()) != null) {
        System.out.println(Thread.currentThread().getName() + ": receive from port " + socket.getPort() + ": " + message);
        out.write(message);
        out.flush();
    }
} catch (Exception e) {
    System.out.println(e.getMessage());
}
```

这里两端都使用了 `BufferedReader` 和 `BufferedWriter` 作为消息的传输工具。

经过测试发现，消息传输是失败的。

问题出现在 `out.write(message);` 和 `message = in.readLine()` 这两个地方，因为 `in.readLine()` 读取的是一行数据，即数据必须要存在换行符，如果不存在的话将无法读完，一直处于阻塞状态。

所以，解决方法就是将写出的数据通过 `newLine` 操作加上换行符：

```java
out.write(message); // 如果使用BufferedWriter，则需要添加换行符
out.newLine();
```

另一种更好的方法是使用 `PrintWriter`，使用它的写出操作 `println` 进行消息的输出。

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**