---
title: 适配器模式
date: 2022-08-23T16:00:04+08:00
categories: [Language]
tags: [design, java]
slug: adapter-mode
---

## 适配器模式

### 定义

适配器模式将一个类的接口，转换成客户期望的另一个接口，适配器让原本接口不兼容的类可以合作无间。

### 代码展示

鸭子和火鸡叫声不一样，通过编写适配器让火鸡适配鸭的方法。

#### 从接口开始

```java
public interface Duck {
	public void quack();
	public void fly();
}
```

```java
public interface Turkey {
	public void gobble();
	public void fly();
}
```

#### 编写适配器

```java
public class TurkeyAdapter implements Duck {
	Turkey turkey;
 
	public TurkeyAdapter(Turkey turkey) {
		this.turkey = turkey;
	}
    
	public void quack() {
		turkey.gobble();
	}
  
	public void fly() {
		for(int i=0; i < 5; i++) {
			turkey.fly();
		}
	}
}

```

#### 编写具体类

绿头鸭：

```java
public class MallardDuck implements Duck {
	public void quack() {
		System.out.println("Quack");
	}

	public void fly() {
		System.out.println("I'm flying");
	}
}
```

野火鸡：

```java
public class WildTurkey implements Turkey {
	public void gobble() {
		System.out.println("Gobble gobble");
	}
 
	public void fly() {
		System.out.println("I'm flying a short distance");
	}
}
```

#### 代码测试

```java
public class DuckTestDrive {
    static void testDuck(Duck duck) {
		duck.quack();
		duck.fly();
	}
	public static void main(String[] args) {
		Duck duck = new MallardDuck();

		Turkey turkey = new WildTurkey();
		Duck turkeyAdapter = new TurkeyAdapter(turkey);

		turkey.gobble();
		turkey.fly();
		testDuck(duck);
		testDuck(turkeyAdapter);
	}
}
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**