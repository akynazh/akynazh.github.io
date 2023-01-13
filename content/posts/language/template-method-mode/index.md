---
title: 模板方法模式
date: 2022-08-24T17:14:16+08:00
categories: [Language]
tags: [design, java]
slug: template-method-mode
---

## 定义

模板方法模式在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤。

## “好莱坞”原则

**别调用我们，我们会调用你。**

其实就是防止“依赖腐败”，也就是要避免高层组件和低层组件相互依赖。一般由高层组件依赖低层组件。

## 代码展示

泡茶和泡咖啡有着几乎相同的步骤，但在某些子步骤中有差别。通过模板方法可以很好地解决问题。

### 定义模板方法

子步骤`brew()`和`addCondiments()`为抽象方法，由子类具体实现。

```java
public abstract class CaffeineBeverage {
  
	final void prepareRecipe() {
		boilWater();
		brew();
		pourInCup();
		addCondiments();
	}
 
	abstract void brew();
  
	abstract void addCondiments();
 
	void boilWater() {
		System.out.println("Boiling water");
	}
  
	void pourInCup() {
		System.out.println("Pouring into cup");
	}
}
```

### 定义具体方法

继承CaffeineBeverage并实现抽象方法。

```java
public class Coffee extends CaffeineBeverage {
	public void brew() {
		System.out.println("Dripping Coffee through filter");
	}
	public void addCondiments() {
		System.out.println("Adding Sugar and Milk");
	}
}
```

```java
public class Tea extends CaffeineBeverage {
	public void brew() {
		System.out.println("Steeping the tea");
	}
	public void addCondiments() {
		System.out.println("Adding Lemon");
	}
}
```

### 测试

```java
Tea tea = new Tea();
Coffee coffee = new Coffee();

System.out.println("\nMaking tea...");
tea.prepareRecipe();

System.out.println("\nMaking coffee...");
coffee.prepareRecipe();
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**