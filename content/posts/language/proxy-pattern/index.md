---
title: 代理模式
date: 2022-08-26T10:41:19+08:00
categories: [Language]
tags: [design, java]
slug: proxy-pattern
---

## 定义

代理模式为另一个对象提供一个替身或占位符以控制对这个对象的访问。

我们对一个对象的使用或者一个对象中方法的调用，可以通过这个对象的代理人进行访问，这个代理人可以方便地控制这个对象，让对象的功能更为强大或更易于使用。

常见的代理有：远程代理，虚拟代理，动态代理。

## 远程代理

对于远程代理，其实就是本地调用远程的方法，本地堆（客户端）有一个Stub代理对象，这个对象负责完成RMI操作，也就是远程方法调用，而远程堆（服务端）有一个Skeleton代理对象，它接收客户端的RMI操作，并传递给真正的服务对象进行服务，之后再返回给客户端结果。

使用过程中需要注意调用的对象必须是可序列化的，无需序列化的对象可以添加`transient`关键字。通过`rmiregistry &`开启RMI，之后进行服务注册。服务端通过`Naming.rebind()`绑定服务地址，客户端通过`Naming.lookup()`调用远程方法。另外，远程传输对象需要继承于`UnicastRemoteObject`。

在Java5中，RMI和动态代理搭配使用，动态代理动态产生Stub，远程对象的Stub是Proxy实例，它是自动产生的，来处理所有把客户的本地调用变成远程调用的细节。

## 虚拟代理

对于虚拟代理，也就是说这个代理对象是虚拟的，由代理来扮演对象的替身。

比如对于从网络加载一副图像展现给用户，我们可能需要等待一定时间，这段时间内图像应该展现为用户友好的“等待中”字样，而在网络图像获取成功后进行网络图像的展现。

这个过程可以通过代理的方式方便地完成：虚拟代理对象扮演图像的替身，它通过创建一个线程加载网络图像，加载期间将图像动态地变为用户友好字样，完成加载后改为网络图像。

可以发现我们不是直接使用图像本身，而使用了代理对象作为图像，也就是说，代理扮演了图像这个角色。

下面是一个图像代理对象：

```java
class ImageProxy implements Icon {
	volatile ImageIcon imageIcon;
	final URL imageURL;
	Thread retrievalThread;
	boolean retrieving = false;
     
	public ImageProxy(URL url) { imageURL = url; }
     
	public int getIconWidth() {
        ...
	}
 
	public int getIconHeight() {
        ...
	}
	
	synchronized void setImageIcon(ImageIcon imageIcon) {
		this.imageIcon = imageIcon;
	}
     
	public void paintIcon(final Component c, Graphics  g, int x,  int y) {
		if (imageIcon != null) {
			imageIcon.paintIcon(c, g, x, y);
		} else {
			g.drawString("Loading album cover, please wait...", x+300, y+190);
			if (!retrieving) {
				retrieving = true;
				retrievalThread = new Thread(() -> {
						try {
							setImageIcon(new ImageIcon(imageURL, "Album Cover"));
							c.repaint();
						} catch (Exception e) {
							e.printStackTrace();
						}
				});
				retrievalThread.start();
			}
		}
	}
}
```

## 动态代理

对于动态代理，代理对象在运行时才被创建，可以通过人为设定值来修改原本的对象，这样也就让一个代理对象可以获得不同的功能或属性，也就是说，代理对象增强了一个对象的功能。

下面以一个简单例子说明动态代理的使用过程：

### 创建类

```java
public interface Person {
	String getName();
    // ...
    void setName(String name);
    // ...
}
```

```java
public class PersonImpl implements Person /*, {其它接口} */ {
	String name;
	String gender;
	String interests;
	int rating;
	int ratingCount = 0;
  
	public String getName() {
		return name;	
	} 
    // ...
	public void setName(String name) {
		this.name = name;
	}
    // ...
}
```

### 创建InvocationHandler

实现invoke方法，设置该对象不允许setGeekRating。

```java
public class OwnerInvocationHandler implements InvocationHandler { 
	Person person;
 
	public OwnerInvocationHandler(Person person) {
		this.person = person;
	}
 
	public Object invoke(Object proxy, Method method, Object[] args) 
			throws IllegalAccessException {
  
		try {
			if (method.getName().startsWith("get")) {
				return method.invoke(person, args);
   			} else if (method.getName().equals("setGeekRating")) {
				throw new IllegalAccessException(); // 不允许setGeekRating
			} else if (method.getName().startsWith("set")) {
				return method.invoke(person, args);
			} 
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } 
		return null;
	}
}
```

### 测试代码

```java
// 初始化一些对象
initializeDatabase(); 
// 获取对象
Person joe = getPersonFromDatabase("Joe Javabean"); 
// 获取代理对象
Person ownerProxy = (Person) Proxy.newProxyInstance( 
        joe.getClass().getClassLoader(),
        joe.getClass().getInterfaces(),
        new OwnerInvocationHandler(joe));
// 进行测试
System.out.println("Name is " + ownerProxy.getName());
ownerProxy.setInterests("bowling, Go");
try {
    ownerProxy.setGeekRating(10); // 将会抛出异常
} catch (Exception e) {
    System.out.println("Can't set rating from owner proxy");
}
System.out.println("Rating is " + ownerProxy.getGeekRating());
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**