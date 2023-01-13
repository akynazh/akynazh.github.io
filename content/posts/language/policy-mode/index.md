---
title: 策略模式
date: 2022-08-26T16:04:19+08:00
categories: [Language]
tags: [design, java]
slug: policy-mode
---

## 定义

策略模式定义了算法族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户。

比如对于鸭子而言，不同鸭子的叫声方式可能不一样也可能一样，我们可以定义一个叫声行为接口，然后通过创建不同的叫声行为实现这个接口，在实例化鸭子时设定叫声行为即可。

这样相比于直接继承抽象鸭子后重写叫声行为方法，好处是减少了重复代码，而坏处是增加了类的数量。

## 代码展示

下面就以鸭子为例进行说明。

### 从接口开始

定义一个叫声接口：（其它接口省略）

```java
public interface QuackBehavior {
	public void quack();
}
```

### 实现叫声接口

```java
public class MuteQuack implements QuackBehavior {
	public void quack() {
		System.out.println("<< Silence >>");
	}
}
```

其它接口省略。

### 创建抽象鸭子

每只鸭子都有Fly和Quack这两种行为。

```java
public abstract class Duck {
	FlyBehavior flyBehavior;
	QuackBehavior quackBehavior;

	public Duck() {
	}

	public void setFlyBehavior(FlyBehavior fb) {
		flyBehavior = fb;
	}

	public void setQuackBehavior(QuackBehavior qb) {
		quackBehavior = qb;
	}

	abstract void display();

	public void performFly() {
		flyBehavior.fly();
	}

	public void performQuack() {
		quackBehavior.quack();
	}

	public void swim() {
		System.out.println("All ducks float, even decoys!");
	}
}
```

### 创建具体鸭子

继承于抽象鸭子，实例化时指定行为。

```java
public class MallardDuck extends Duck {

	public MallardDuck() {
		quackBehavior = new Quack();
		flyBehavior = new FlyWithWings();
	}

	public void display() {
		System.out.println("I'm a real Mallard duck");
	}
}
```

### 测试

```java
Duck mallard = new MallardDuck();
mallard.performQuack();
mallard.performFly();

Duck model = new ModelDuck();
model.performFly();
model.setFlyBehavior(new FlyRocketPowered());
model.performFly();
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**