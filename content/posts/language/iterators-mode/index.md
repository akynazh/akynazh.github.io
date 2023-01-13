---
title: 迭代器模式
date: 2022-08-25T11:26:17+08:00
categories: [Language]
tags: [design, java]
slug: iterators-mode
---

## 定义

迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。

通过一个Iterator，可以方便地遍历各种类型，如HashMap，ArrayList等。

## 代码展示

下面通过菜单的例子进行说明。

分别用简单数组`String[]`和`ArrayList<String>`类创建菜单内容。

### 从接口开始

创建菜单接口：

```java
public interface Menu {
	public Iterator<String> createIterator();
}
```

每个菜单都可以返回一个迭代器。

### 创建Diner菜单

该菜单用String[]创建内容，需要编写自己的迭代器。

```java
public class DinerMenu implements Menu {
	static final int MAX_ITEMS = 6;
	int numberOfItems = 0;
	String[] menuItems;
  
	public DinerMenu() {
		menuItems = new String[MAX_ITEMS];
 
		addItem("Vegetarian BLT");
		addItem("BLT");
		addItem("Soup of the day");
		addItem("Hotdog");
		addItem("Steamed Veggies and Brown Rice");
		addItem("Pasta");
	}
  
	public void addItem(String name) 
	{
		if (numberOfItems >= MAX_ITEMS) {
			System.err.println("Sorry, menu is full!  Can't add item to menu");
		} else {
			menuItems[numberOfItems] = name;
			numberOfItems = numberOfItems + 1;
		}
	}
 
	public String[] getMenuItems() {
		return menuItems;
	}
  
	public Iterator<String> createIterator() {
		return new DinerMenuIterator(menuItems);
	}
 
	public String toString() {
		return "Diner Menu";
	}
	// other menu methods here
}
```

### 创建菜单迭代器

实现`Iterater<String>`接口，实现`next()`，`hasNext()`和`remove()`方法。

```java
public class DinerMenuIterator implements Iterator<String> {
	String[] list;
	int position = 0;
 
	public DinerMenuIterator(String[] list) {
		this.list = list;
	}
 
	public String next() {
		String menuItem = list[position];
		position = position + 1;
		return menuItem;
	}
 
	public boolean hasNext() {
		if (position >= list.length || list[position] == null) {
			return false;
		} else {
			return true;
		}
	}
  
	public void remove() {
		if (position <= 0) {
			throw new IllegalStateException
				("You can't remove an item until you've done at least one next()");
		}
		if (list[position-1] != null) {
			for (int i = position-1; i < (list.length-1); i++) {
				list[i] = list[i+1];
			}
			list[list.length-1] = null;
		}
	}
}
```

### 创建PancakeHouse菜单

该菜单使用`ArrayList<String>`创建内容，可以直接使用Java内置迭代器。

```java
public class PancakeHouseMenu implements Menu {
	ArrayList<String> menuItems;
 
	public PancakeHouseMenu() {
		menuItems = new ArrayList<String>();
    
		addItem("K&B's Pancake Breakfast");
		addItem("Regular Pancake Breakfast");
		addItem("Blueberry Pancakes");
		addItem("Waffles");
	}

	public void addItem(String name)
	{
		menuItems.add(name);
	}
 
	public ArrayList<String> getMenuItems() {
		return menuItems;
	}
  
	public Iterator<String> createIterator() {
		return menuItems.iterator();
	}
  
	public String toString() {
		return "Pancake House Menu";
	}

	// other menu methods here
}
```

### 测试

printMenu方法通过一个迭代器遍历并打印菜单。

```java
public class Cafe {

	public static void main(String args[]) {
		PancakeHouseMenu pancakeHouseMenu = new PancakeHouseMenu();
		DinerMenu dinerMenu = new DinerMenu();
		
		// with iterators
		Iterator<String> pancakeIterator = pancakeHouseMenu.createIterator();
		Iterator<String>  dinerIterator = dinerMenu.createIterator();

		System.out.println("\nMENU (with iterators)\n----\nBREAKFAST");
		printMenu(pancakeIterator);
		System.out.println("\nLUNCH");
		printMenu(dinerIterator); 
	}
 
	private static void printMenu(Iterator<String> iterator) {
		while (iterator.hasNext()) {
			String menuItem = (String)iterator.next();
			System.out.println(menuItem);

		}
	}
}
```

---

**参考：《HeadFist设计模式》**

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**