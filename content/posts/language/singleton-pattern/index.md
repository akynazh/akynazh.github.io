---
title: 单件模式
date: 2022-08-22T11:14:23+08:00
categories: [Language]
tags: [java, design]
slug: singleton-pattern
---

## 我的思考

单件模式，容易知道需要某个对象是独一无二的，那么它首先应该是静态的，不能在程序动态运行期间被再次创建。

当在多个线程中用到它时，在创建时需要考虑线程安全问题，可通过加锁等方式解决。

## 代码实现

### 传统的单件

定义一个私有实例化的对象，把单件对象作为一个私有的静态成员变量，通过静态方法`Singleton.getInstance()`获取，若获取为null则创建对象。

```java
public class Singleton {
	private static Singleton uniqueInstance;
 
	private Singleton() {}
 
	public static Singleton getInstance() {
		if (uniqueInstance == null) {
			uniqueInstance = new Singleton();
		}
		return uniqueInstance;
	}
}
```

### 线程安全的单件

传统的单件线程不安全，解决如下：

```java
public class Singleton {
	private static Singleton uniqueInstance;
 
	private Singleton() {}
 
	public static synchronized Singleton getInstance() {
		if (uniqueInstance == null) {
			uniqueInstance = new Singleton();
		}
		return uniqueInstance;
	}
}
```

### 改善多线程性能

如上线程安全的代码，getInstance()在多次调用的情况下性能太低，改善方法如下：

一、“急切”创建实例（“饿汉式”）

JVM加载该类时马上创建实例，也保证线程安全。

```java
public class Singleton {
	private static final Singleton uniqueInstance = new Singleton();
 
	private Singleton() {}
 
	public static Singleton getInstance() {
		return uniqueInstance;
	}
}
```

二、双重检查加锁（“懒汉式”）

保证只在第一次获取对象时才加锁。

volatile确保当uniqueInstance被初始化时，多个线程正确处理uniqueInstance变量。

```java
public class Singleton {
	private volatile static Singleton uniqueInstance;
 
	private Singleton() {}
 
	public static Singleton getInstance() {
		if (uniqueInstance == null) {
			synchronized (Singleton.class) {
				if (uniqueInstance == null) {
					uniqueInstance = new Singleton();
				}
			}
		}
		return uniqueInstance;
	}
}
```

### 枚举实现的单件

首先明白一个问题，枚举类型为什么是线程安全的？

我们定义的一个枚举，在第一次被真正用到的时候，会被虚拟机加载并初始化，而这个初始化过程是线程安全的。而我们知道，解决单例的并发问题，主要解决的就是初始化过程中的线程安全问题。

所以，由于枚举的以上特性，枚举实现的单例是天生线程安全的。

```java
public enum Singleton {
	UNIQUE_INSTANCE;
}
```

通过`Singleton.UNIQUE_INSTANCE;`即可获取该实例。

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**