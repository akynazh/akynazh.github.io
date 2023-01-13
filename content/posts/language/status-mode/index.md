---
title: 状态模式
date: 2022-08-25T22:54:26+08:00
categories: [Language]
tags: [design, java]
slug: status-mode
---

## 定义

状态模式允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

比如某个机器有各种复杂的状态，每个状态都着共同的参数，而这些参数值有区别。用户通过某些操作会改变机器的状态，机器转变状态后，以当前状态的方法给用户反馈。

## 代码展示

以机器的例子说明。

### 从接口开始

编写状态接口：

```java
public interface State {
 
	public void insertQuarter();
	public void ejectQuarter();
	public void turnCrank();
	public void dispense();
	
	public void refill();
}
```

### 创建机器类

```java
package headfirst.designpatterns.state.gumballstate;

public class GumballMachine {
    // 各种机器状态
	State soldOutState;
	State noQuarterState;
	State hasQuarterState;
	State soldState;
    // 当前状态
	State state;
	int count = 0;
 
	public GumballMachine(int numberGumballs) {
		soldOutState = new SoldOutState(this);
		noQuarterState = new NoQuarterState(this);
		hasQuarterState = new HasQuarterState(this);
		soldState = new SoldState(this);

		this.count = numberGumballs;
 		if (numberGumballs > 0) {
			state = noQuarterState;
		} else {
			state = soldOutState;
		}
	}
 
	public void insertQuarter() {
		state.insertQuarter();
	}
 
	public void ejectQuarter() {
		state.ejectQuarter();
	}
 
	public void turnCrank() {
		state.turnCrank();
		state.dispense();
	}
 
	void releaseBall() {
		System.out.println("A gumball comes rolling out the slot...");
		if (count > 0) {
			count = count - 1;
		}
	}
 
	int getCount() {
		return count;
	}
 
	void refill(int count) {
		this.count += count;
		System.out.println("The gumball machine was just refilled; its new count is: " + this.count);
		state.refill();
	}

	void setState(State state) {
		this.state = state;
	}
    public State getState() {
        return state;
    }

    public State getSoldOutState() {
        return soldOutState;
    }

    public State getNoQuarterState() {
        return noQuarterState;
    }

    public State getHasQuarterState() {
        return hasQuarterState;
    }

    public State getSoldState() {
        return soldState;
    }
 
	public String toString() {
        // 省略了
	}
}
```

### 定义各种机器状态

以其中一个状态为例子：

```java
public class HasQuarterState implements State {
	GumballMachine gumballMachine;
 
	public HasQuarterState(GumballMachine gumballMachine) {
		this.gumballMachine = gumballMachine;
	}
  
	public void insertQuarter() {
		System.out.println("You can't insert another quarter");
	}
 
	public void ejectQuarter() {
		System.out.println("Quarter returned");
		gumballMachine.setState(gumballMachine.getNoQuarterState());
	}
 
	public void turnCrank() {
		System.out.println("You turned...");
		gumballMachine.setState(gumballMachine.getSoldState());
	}

    public void dispense() {
        System.out.println("No gumball dispensed");
    }
    
    public void refill() { }
 
	public String toString() {
		return "waiting for turn of crank";
	}
}
```

每个状态中都有机器操作的一些方法，这些方法可能改变机器的状态。

## 测试

```java
GumballMachine gumballMachine = new GumballMachine(2);

System.out.println(gumballMachine);

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

System.out.println(gumballMachine);

gumballMachine.insertQuarter();
gumballMachine.turnCrank();
gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.refill(5);
gumballMachine.insertQuarter();
gumballMachine.turnCrank();

System.out.println(gumballMachine);
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**