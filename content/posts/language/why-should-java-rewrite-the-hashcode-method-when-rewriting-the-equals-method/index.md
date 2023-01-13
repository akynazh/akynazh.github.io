---
title: Java重写equals方法的同时为什么要重写hashcode方法
date: 2021-11-26T09:23:27+08:00
categories: [Language]
tags: [java]
slug: why-should-java-rewrite-the-hashcode-method-when-rewriting-the-equals-method
---

## 提出问题

先看一个例子：

当两个人年龄相同时，我们认为这两个对象相同：

```
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

可以看到上述程序中不但重写了equals()方法，同时重写了hashcode()方法：

```
@Override
public int hashCode() {
    return Objects.hash(age);
}
```

重写equals**最好要重写hashcode()**，对需要进行比较的部分字段进行**hash()**，也就是让值通过一个**哈希函数**获取到对应的哈希值

但是为何？如果不重写也是可以顺利比较的。

## 原因

其实这样是为了**提高程序的效率**:

如果不重写hashcode()的话，可以试想一下，向一个元素个数为10000的集合中插入一个新的元素，就需要对之前的10000个元素进行比较。

每次比较都要**调用一次equals()**比较每一个需要比较的字段，可以容易地想象出比较需要花费的**时间复杂度**是巨大的。

如果插入元素时，先通过hashcode的寻找可以飞速地判断集合中是否存在一样的元素，在**O(1)的时间**内可以解决集合插入问题。

同时重写hashcode()也保证了对象进行equals时，如果为true，其对应的**hashcode也一定相等**。

虽然在不涉及集合操作时不重写hashcode()不影响比较，编译运行也不会报错，但是这会**违反Java中对象的比较规则**。

## 总结：
 
若重写equals(Object obj)方法，有必要重写hashcode()方法，确保通过equals(Object obj)方法判断结果为true的两个对象具备相等的hashcode()返回值。

说得简单点就是：**如果两个对象相同，那么他们的hashcode应该相等**。

另外，值得注意的是，**如果两个对象不相同，他们的hashcode可能相同**。