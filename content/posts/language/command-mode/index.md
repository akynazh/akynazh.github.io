---
title: 命令模式
date: 2022-08-22T11:41:33+08:00
categories: [Language]
tags: [design, java]
slug: command-mode
---

## 定义

命令模式将“请求”封装成对象，以便使用不同的请求、队列或者日志来参数化其他对象。命令模式也支持可撤销的操作。

比如对于遥控器而已，我们会将操作封装为一个按钮（命令）对象，通过按下按钮执行操作。

## 代码展示

下面以遥控器作为例子：

### 从接口开始

命令接口：

```java
public interface Command {
	public void execute();
}
```

### 定义操控对象

一个风扇对象：（其它对象省略了）

```java
public class Light {
	String location = "";

	public Light(String location) {
		this.location = location;
	}

	public void on() {
		System.out.println(location + " light is on");
	}

	public void off() {
		System.out.println(location + " light is off");
	}
}
```

### 定义操控对象的命令

操作风扇的命令：

**开风扇**：

```java
public class LightOnCommand implements Command {
	Light light;

	public LightOnCommand(Light light) {
		this.light = light;
	}

	public void execute() {
		light.on();
	}
}
```

**关风扇：**

```java
public class LightOffCommand implements Command {
	Light light;
 
	public LightOffCommand(Light light) {
		this.light = light;
	}
 
	public void execute() {
		light.off();
	}
}
```

### 定义空命令

用于初始化遥控器：

```java
public class NoCommand implements Command {
	public void execute() {}
}
```

### 定义遥控器

包含两个数组，分别用于开命令和关命令。

```java
public class RemoteControl {
	Command[] onCommands;
	Command[] offCommands;
 
	public RemoteControl() {
		onCommands = new Command[7];
		offCommands = new Command[7];
 
		Command noCommand = new NoCommand();
		for (int i = 0; i < 7; i++) {
			onCommands[i] = noCommand;
			offCommands[i] = noCommand;
		}
	}
  
	public void setCommand(int slot, Command onCommand, Command offCommand) {
		onCommands[slot] = onCommand;
		offCommands[slot] = offCommand;
	}
 
	public void onButtonWasPushed(int slot) {
		onCommands[slot].execute();
	}
 
	public void offButtonWasPushed(int slot) {
		offCommands[slot].execute();
	}
  
	public String toString() {
              ...
	}
}
```

### 测试代码

```java
RemoteControl remoteControl = new RemoteControl();

Light livingRoomLight = new Light("Living Room");
Light kitchenLight = new Light("Kitchen");
CeilingFan ceilingFan= new CeilingFan("Living Room");
GarageDoor garageDoor = new GarageDoor("Garage");
Stereo stereo = new Stereo("Living Room");

LightOnCommand livingRoomLightOn = 
		new LightOnCommand(livingRoomLight);
LightOffCommand livingRoomLightOff = 
		new LightOffCommand(livingRoomLight);
LightOnCommand kitchenLightOn = 
		new LightOnCommand(kitchenLight);
LightOffCommand kitchenLightOff = 
		new LightOffCommand(kitchenLight);

CeilingFanOnCommand ceilingFanOn = 
		new CeilingFanOnCommand(ceilingFan);
CeilingFanOffCommand ceilingFanOff = 
		new CeilingFanOffCommand(ceilingFan);

GarageDoorUpCommand garageDoorUp =
		new GarageDoorUpCommand(garageDoor);
GarageDoorDownCommand garageDoorDown =
		new GarageDoorDownCommand(garageDoor);

StereoOnWithCDCommand stereoOnWithCD =
		new StereoOnWithCDCommand(stereo);
StereoOffCommand  stereoOff =
		new StereoOffCommand(stereo);

remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);
remoteControl.setCommand(1, kitchenLightOn, kitchenLightOff);
remoteControl.setCommand(2, ceilingFanOn, ceilingFanOff);
remoteControl.setCommand(3, stereoOnWithCD, stereoOff);

System.out.println(remoteControl);

remoteControl.onButtonWasPushed(0);
remoteControl.offButtonWasPushed(0);
remoteControl.onButtonWasPushed(1);
remoteControl.offButtonWasPushed(1);
remoteControl.onButtonWasPushed(2);
remoteControl.offButtonWasPushed(2);
remoteControl.onButtonWasPushed(3);
remoteControl.offButtonWasPushed(3);
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**
