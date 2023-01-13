---
title: 外观模式
date: 2022-08-23T16:20:06+08:00
categories: [Language]
tags: [design, java]
slug: appearance-mode
---

## 外观模式

### 定义

外观模式提供了一个统一的接口，用来访问子系统中的一群接口，外观定义了一个高层接口，让子系统更容易使用。

### “最少知识”原则

减少对象之间的交互，只和“密友”谈话，也就是减少一个类所交互的类的数量。

### 代码展示

执行一些复杂操作需要一步步执行许多小操作，那么可以将复杂操作封装为一个高层类中的方法，将所有复杂操作需要用到的类作为高层类的成员，在复杂操作的方法中可以方便的调用各个类执行各自的功能。

下面是一个家庭影院的例子：

```java
public class HomeTheaterFacade {
	Amplifier amp;
	Tuner tuner;
	StreamingPlayer player;
	CdPlayer cd;
	Projector projector;
	TheaterLights lights;
	Screen screen;
	PopcornPopper popper;
 
	public HomeTheaterFacade(Amplifier amp, 
				 Tuner tuner, 
				 StreamingPlayer player, 
				 Projector projector, 
				 Screen screen,
				 TheaterLights lights,
				 PopcornPopper popper) {
 
		this.amp = amp;
		this.tuner = tuner;
		this.player = player;
		this.projector = projector;
		this.screen = screen;
		this.lights = lights;
		this.popper = popper;
	}
 
	public void watchMovie(String movie) {
		System.out.println("Get ready to watch a movie...");
		popper.on();
		popper.pop();
		lights.dim(10);
		screen.down();
		projector.on();
		projector.wideScreenMode();
		amp.on();
		amp.setStreamingPlayer(player);
		amp.setSurroundSound();
		amp.setVolume(5);
		player.on();
		player.play(movie);
	}
 
 
	public void endMovie() {
		System.out.println("Shutting movie theater down...");
		popper.off();
		lights.on();
		screen.up();
		projector.off();
		amp.off();
		player.stop();
		player.off();
	}

	public void listenToRadio(double frequency) {
		System.out.println("Tuning in the airwaves...");
		tuner.on();
		tuner.setFrequency(frequency);
		amp.on();
		amp.setVolume(5);
		amp.setTuner(tuner);
	}

	public void endRadio() {
		System.out.println("Shutting down the tuner...");
		tuner.off();
		amp.off();
	}
}
```

各个功能器件的代码省略了。

进行测试：

```java
Amplifier amp = new Amplifier("Amplifier");
Tuner tuner = new Tuner("AM/FM Tuner", amp);
StreamingPlayer player = new StreamingPlayer("Streaming Player", amp);
CdPlayer cd = new CdPlayer("CD Player", amp);
Projector projector = new Projector("Projector", player);
TheaterLights lights = new TheaterLights("Theater Ceiling Lights");
Screen screen = new Screen("Theater Screen");
PopcornPopper popper = new PopcornPopper("Popcorn Popper");

HomeTheaterFacade homeTheater = 
        new HomeTheaterFacade(amp, tuner, player, 
                projector, screen, lights, popper);

homeTheater.watchMovie("Raiders of the Lost Ark");
homeTheater.endMovie();
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**