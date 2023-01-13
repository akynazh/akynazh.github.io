---
title: Cmd重要且实用的一些命令
date: 2020-11-20T18:17:33+08:00
categories: [Language]
tags: [script, cmd]
slug: cmd-some-important-and-practical-commands
---

## 写入文件

- 写入hello字符串（同时新建了a.txt）

```cmd
echo hello > a.txt 
```

- 追加写入hello字符串

```cmd
echo hello >> a.txt 
```

- 将a.txt内容追加写入b.txt

```cmd
type a.txt >> b.txt
```

## 新建文件

- 新建空文件a.txt

```cmd
type null > a.txt 
```

## 换行（分号换行输出）

```cmd
echo hello; echo peter  
```
## 关于程序编译


test.cpp: 一个含cin输入的程序

编译cpp

```cmd
g++ test.cpp -o test 
```

以1.in作为标准输入，2.out作为标准输出执行test

```cmd
test < 1.in > 2.out 
```
---


test_err.cpp: 一个会导致编译错误的程序

把编译后出现的错误输入log.txt，命令行不会报错

```cmd
g++ test_err.cpp -o terr 2> log.txt 
```

## 打开并编辑文件

cmd下没有bash下好用的vim=_=

使用记事本打开编辑 1.py

```cmd
notepad 1.py 
```

记事本不好用呀，还是vscode香，如下~

使用vscode打开编辑1.py，首先需配置环境变量

```(${vscodepath}\bin)```

```cmd
code 1.py 
```

over