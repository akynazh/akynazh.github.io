---
title: Synchronized到底锁了谁
date: 2021-05-19T22:43:45+08:00
categories: [Language]
tags: [java, language]
slug: who-the-hell-is-synchronized-locking
recommand: 1
---

## Synchronized方法

- 静态方法上的锁

  静态方法是属于“类”，不属于某个实例，是所有对象实例所共享的方法。也就是说如果在静态方法上加入synchronized，那么它获取的就是这个类的锁，锁住的就是**这个类**。
   
- 普通方法上的锁

  实例方法并不是类所独有的，每个对象实例独立拥有它，它并不被对象实例所共享。在实例方法上加入synchronized，那么它获取的就是这个类的锁，锁住的就是这个**对象实例**。

## Synchronized代码块

- `synchronized(this){...}`

this关键字所代表的意思是该对象实例，这种用法synchronized锁住的是**对象实例**。

- `synchronized(Demo.class){...}`

锁的是**该类**。

- `synchronized(obj){...}`

synchronized同步代码块对对象内部的实例加锁。

假设demo1与demo2方法不相关，此时两个线程对同一个对象实例分别调用demo1与demo2，均能获取各自的锁。

代码如下：

```java
public class Demo {
    private Object lock1 = new Object();
    private Object lock2 = new Object();

    public void demo1() {
        synchronized (lock1) {
            while (true) {  //死循环目的是为了让线程一直持有该锁
                System.out.println(Thread.currentThread());
            }
        }
    }

    public void demo2() {
        synchronized (lock2) {
            while (true) {
                System.out.println(Thread.currentThread());
            }
        }
    }
}
```

demo1方法中的同步代码块锁住的是**lock1对象实例**，demo2方法中的同步代码块锁住的是**lock2对象实例**。

如果线程1执行demo1，线程2执行demo2，由于两个方法抢占的是不同的对象实例锁，也就是说两个线程均能获取到锁执行各自的方法。