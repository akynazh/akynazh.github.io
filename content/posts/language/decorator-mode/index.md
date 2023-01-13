---
title: 装饰者模式
date: 2022-08-21T23:17:27+08:00
categories: [Language]
tags: [design, java]
slug: decorator-mode
---

## 我的思考

装饰，如其名，就是对一个对象进行加工，包装，修饰。

假设一杯“普通的咖啡，价格10”，我们可以选择添加自己喜欢的配料。

首先我们添加牛奶，那么就变成了一杯“含牛奶配料的咖啡，价格2 +（价格12）”；

我想再加点巧克力，那么再往上包装变成“含巧克力的含牛奶配料的咖啡，价格3 +【价格2+（价格12）】”。

这么一层层封装上去就是装饰模式。

我们要在每一个配料中定义一个可包装的对象，在包装后返回这个对象。具体代码如下文。

## 代码实现

### 定义抽象类

饮料抽象类：

```java
public abstract class Beverage {
	String description = "Unknown Beverage";
  
	public String getDescription() {
		return description;
	}
 
	public abstract double cost();
}
```

配料抽象类：

**注意这里配料也继承了饮料类，这样Beverage在通过包装之后还是返回一个Beverage，具体见测试代码。**

```java
public abstract class CondimentDecorator extends Beverage {
	Beverage beverage;
	public abstract String getDescription();
}
```

### 定义具体类

牛奶配料：（其他配料省略）

```java
public class Milk extends CondimentDecorator {
	public Milk(Beverage beverage) {
		this.beverage = beverage;
	}

	public String getDescription() {
		return beverage.getDescription() + ", Milk";
	}

	public double cost() {
		return .10 + beverage.cost();
	}
}

```

浓缩咖啡类：（其他饮料略）

```java
public class Espresso extends Beverage {
  
	public Espresso() {
		description = "Espresso";
	}
  
	public double cost() {
		return 1.99;
	}
}
```

### 测试代码

```java
public class StarbuzzCoffee {
 
	public static void main(String args[]) {
		Beverage beverage = new Espresso();
		System.out.println(beverage.getDescription() 
				+ " $" + beverage.cost());
 
		Beverage beverage2 = new DarkRoast();
		beverage2 = new Mocha(beverage2);
		beverage2 = new Mocha(beverage2);
		beverage2 = new Whip(beverage2);
		System.out.println(beverage2.getDescription() 
				+ " $" + beverage2.cost());
 
		Beverage beverage3 = new HouseBlend();
		beverage3 = new Soy(beverage3);
		beverage3 = new Mocha(beverage3);
		beverage3 = new Whip(beverage3);
		System.out.println(beverage3.getDescription() 
				+ " $" + beverage3.cost());
	}
}
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**