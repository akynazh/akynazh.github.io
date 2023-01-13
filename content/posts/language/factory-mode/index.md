---
title: 工厂模式
date: 2022-08-21T23:31:45+08:00
categories: [Language]
tags: [design, java]
slug: factory-mode
---

## 我的思考

工厂模式，包括工厂方法模式和抽象工厂模式。

对于工厂方法模式，工厂是一个抽象类，提供了一些默认实现方法和一些抽象方法，具体工厂继承于它，实现对应抽象方法。

假设有多家比萨店，他们提供不同口味的比萨，而都有相同的订购比萨的方法，那么可以定义一个抽象类，提供订购比萨的具体方法和创建比萨的抽象方法。

对于抽象工厂模式，工厂是一个接口，提供了一些具体工厂会用到的方法，同时还需要定义这些方法可能用到的接口。具体工厂需要首先实现抽象工厂定义的方法可能用到的接口，然后实现抽象工厂的所有方法。

假设有多家生产比萨配料的工厂，他们都有自己的独特的配料（实现所有配料接口），那么可以定义一个抽象工厂（一个接口），提供所有配料创建方法，具体工厂各自实现所有创建方法即可。

总之，他们的具体区别如下：

- 工厂方法模式使用继承，把对象的创建委托给子类，子类实现工厂方法来创建对象。
- 抽象工厂模式使用对象组合，对象的创建被实现在工厂接口所暴露出来的方法中。

## 工厂方法模式代码

### 从抽象开始

比萨店抽象类：

```java
public abstract class PizzaStore {
 
	abstract Pizza createPizza(String item);
 
	public Pizza orderPizza(String type) {
		Pizza pizza = createPizza(type);
		System.out.println("--- Making a " + pizza.getName() + " ---");
		pizza.prepare();
		pizza.bake();
		pizza.cut();
		pizza.box();
		return pizza;
	}
}
```

### 具体的比萨店

芝加哥的比萨店：

```java
public class ChicagoPizzaStore extends PizzaStore {

	Pizza createPizza(String item) {
        	if (item.equals("cheese")) {
            		return new ChicagoStyleCheesePizza();
        	} else if (item.equals("veggie")) {
        	    	return new ChicagoStyleVeggiePizza();
        	} else if (item.equals("clam")) {
        	    	return new ChicagoStyleClamPizza();
        	} else if (item.equals("pepperoni")) {
            		return new ChicagoStylePepperoniPizza();
        	} else return null;
	}
}
```

关于其它比萨店和比萨的实现省略了。

### 测试代码

根据自然的思路：首先应有比萨店，顾客选择比萨店，选择具体口味的比萨，完成订单。

```java
PizzaStore nyStore = new NYPizzaStore();
PizzaStore chicagoStore = new ChicagoPizzaStore();

Pizza pizza = nyStore.orderPizza("cheese");
System.out.println("Ethan ordered a " + pizza.getName() + "\n");

pizza = chicagoStore.orderPizza("cheese");
System.out.println("Joel ordered a " + pizza.getName() + "\n");

pizza = nyStore.orderPizza("clam");
System.out.println("Ethan ordered a " + pizza.getName() + "\n");
```

## 抽象工厂模式代码

### 从抽象开始

配料工厂接口：

```java
public interface PizzaIngredientFactory {
 
	public Dough createDough();
	public Sauce createSauce();
	public Cheese createCheese();
	public Veggies[] createVeggies();
	public Pepperoni createPepperoni();
	public Clams createClam();
 
}
```

提供各种配料接口：

```java
public interface Cheese {
	public String toString();
}
```

其它的省略了。

### 实现配料接口

```java
public class MozzarellaCheese implements Cheese {
	public String toString() {
		return "Shredded Mozzarella";
	}
}
```

其它的省略了。

### 实现配料工厂接口

具体的配料工厂，提供自己实现的配料。

```java
public class ChicagoPizzaIngredientFactory
        implements PizzaIngredientFactory {

    public Dough createDough() {
        return new ThickCrustDough();
    }

    public Sauce createSauce() {
        return new PlumTomatoSauce();
    }

    public Cheese createCheese() {
        return new MozzarellaCheese();
    }

    public Veggies[] createVeggies() {
        Veggies veggies[] = {new BlackOlives(),
                new Spinach(),
                new Eggplant()};
        return veggies;
    }

    public Pepperoni createPepperoni() {
        return new SlicedPepperoni();
    }

    public Clams createClam() {
        return new FrozenClams();
    }
}
```

其它配料工厂省略了。

### 再从抽象开始

抽象的比萨应该含有所有工厂可能用到的配料，同时应该提供一个准备配料的抽象方法，在具体的比萨中实现这个方法，指定需要的配料，不要的则为null。

抽象的比萨店如工厂方法模式一样。

代码省略了。

### 测试代码

如工厂方法模式一样，这里省略了。

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**