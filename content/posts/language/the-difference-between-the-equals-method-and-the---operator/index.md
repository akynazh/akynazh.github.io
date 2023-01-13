---
title: equals方法和==运算符的作用区别
date: 2020-11-25T00:21:05+08:00
categories: [Language]
tags: [java]
slug: the-difference-between-the-equals-method-and-the---operator
---

## equals方法与"=="的比较与分析

首先提出一个重要的点:

- == 比较时进行**地址**的比较

- equals 比较时进行**值**的比较

```java
String a = "123";
String b = "123";
System.out.println(a.equals(b)); // true
System.out.println(a == b); // true

String a1 = new String("123");
String b1 = new String("123");
System.out.println(a1.equals(b1)); // true
System.out.println(a1 == b1); // false
```

好像没问题。

然而阅读源码Object类，可以发现对象中默认equals方法进行的是地址的比较

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

再阅读源码String类，可以发现String类中重写了equals方法，覆盖掉了Object的equals方法，所以String的equals是值比较！

```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String aString = (String)anObject;
        if (coder() == aString.coder()) {
            return isLatin1() ? StringLatin1.equals(value, aString.value)
                              : StringUTF16.equals(value, aString.value);
        }
    }
    return false;
}
```

**所以equals()不一定进行值的比较，在使用自己创建的类时，若想进行值的比较就必须重写equals()方法。**

## 如何重写equals方法

- **重写equals方法的目的**：

重写equals是 **在两个对象某些字段相等时就认定两个对象相等** 的情况下进行的

- **重写一个完美的equals()的步骤**

>1.显式参数命名为otherObject，稍后将它强制转换为另一个名为other的变量
>
>2.检测this与otherObject**是否相等**
>
>3.检测otherObject**是否为null**
>
>4.比较this与otherObject的类，如果equals的语义可以在子类中改变，就使用**getclass**检测
>
>如果所有的子类都有相同的相等性语义，就使用**instanceof**检测
>
>5.将otherObject**强制转换**为相应类类型的变量
>
>6.使用 **==** 比较基本类型字段 使用 **Object.equals**比较对象字段

by 《core Java》

注：
> instanceof进行类型检查规则是:你属于该类or**该类的派生类**;
> 
> getClass获得类型信息采用==来进行检查是否相等的操作是严格的判断,只会判断**本类**.

example:

当两个人年龄相同时，我们认为这两个对象相同：

```java
class Person {
    private int age;
    private String name;

    public Person(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age;
    }

    @Override
    public int hashCode() {
        return Objects.hash(age);
    }
}
```

test:

```java
Person p1 = new Person(15, "Mary");
Person p2 = new Person(15, "Mark");
System.out.println(p1.equals(p2)); // true
System.out.println(p1 == p2); // false
```

over
