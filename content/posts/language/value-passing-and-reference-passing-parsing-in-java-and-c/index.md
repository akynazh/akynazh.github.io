---
title: Java与C++中的值传递和引用传递解析
date: 2021-05-01T20:16:39+08:00
categories: [Language]
tags: [java, cpp]
slug: value-passing-and-reference-passing-parsing-in-java-and-c
---

**先说结论：Java只有值传递，而C++既有值传递又有引用传递。**

## Java的参数传递

先定义3个方法如下：

```java
public static void change1(String str, int num) {
    str = "world"; // 这里就相当与新new了一个对象!
    num = 100;
}
public static void change2(User user) {
    user.age = 1;
    user.name = "mary";
}
public static void change3(User user) {
    user = new User(1, "mary");
}
```

进行测试：

```java
public static void main(String[] args) {
    String str = "hello";
    int num = 1;
    System.out.println(str + " " + num); // hello 1
    change1(str, num);
    System.out.println(str + " " + num); // hello 1

    System.out.println("------------------");

    User user = new User(123, "peter");
    System.out.println(user.name + " " + user.age); // peter 123
    change2(user);
    System.out.println(user.name + " " + user.age); // mary 1
    
    System.out.println("------------------");
    
    user = new User(123, "peter");
    System.out.println(user.name + " " + user.age); // peter 123
    change3(user);
    System.out.println(user.name + " " + user.age); // peter 123
}
```

由change2和3可知，对于引用类型，java是值传递，在函数中只能改变形参对应的实参所引用的对象，而**无法改变实参本身**，也就是说形参传递的是实参所引用的对象，而不是实参本身。

由change1可知，对于基本数据类型，java是值传递。

对于String类型，应作特殊理解：String本身属于引用类型，String底层由char数组维护，是final类型的，本身是不可改变，通过"="赋值即相当于
通过new新创建了一个对象，本质就是change3的操作。

## C++的参数传递

解释了java的参数传递，可能会陷入困惑，到底什么才是引用传递呢？

我们再来看看C++的参数传递：

定义2个方法如下：

```cpp
void change1(User* user) {
    user->age = 999;
    user->name = "mary";
}
void change2(User* user) {
    user = new User(999, "mary");
}
```

进行测试：

```cpp
User* user1 = new User(21, "peter");
cout << user1->age << " " << user1->name << endl; // 21 peter
change2(user1);
cout << user1->age << " " << user1->name << endl; // 999 mary

User* user2 = new User(21, "peter");
cout << user2->age << " " << user2->name << endl; // 21 peter
change3(user2);
cout << user2->age << " " << user2->name << endl; // 21 peter
```

这样的效果和java测试中的change2和3是一致的，都是传递了实参引用的对象！

下面看看如何实现引用传递吧：

这里形参就传递了实参本身！

```cpp
void change3(User*& user) {
    user = new User(999, "mary");
}
```

测试如下：

```cpp
User* user3 = new User(21, "peter");
cout << user3->age << " " << user3->name << endl; // 21 peter
change4(user3);
cout << user3->age << " " << user3->name << endl; // 999 mary
```

可见在函数中实现了对形参所对应实参本身的修改！

## 为什么Java取消了引用传递

应该是为了更简单，更安全的开发吧。

函数调用无法修改实参，这样一定程度上避免了很多错误的发生，但同时限制了可以做的事情，可以说有利有弊。