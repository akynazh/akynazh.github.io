---
title: Window实用命令记录之文件操作
date: 2021-04-19T13:48:19+08:00
categories: [Language]
tags: [windows, cmd, powershell]
slug: file-operation-recorded-by-window-utility-command
---

## 创建文件或文件夹

### cmd下创建文件

```
type nul > test.jpg
```

### powershell下创建文件

```
new-item test.jpg
```

### 创建文件夹

```
mkdir test
```

## 重命名文件

注意不能指定到新的路径。

```
PS D:\a\tmp\test> ren test.txt my.txt
```

## 移动文件

该命令也可用于重命名。

```
PS D:\a\tmp\test> move test.jpg mydir
```

## 复制文件和文件夹

copy无法递归复制，而xcopy可以。

```
PS D:\a\tmp\test\mydir> copy test.jpg test1.jpg
```

```
# mydir not empty
PS D:\a\tmp\test> copy mydir mydir1
PS D:\a\tmp\test> ls mydir1
# empty

PS D:\a\tmp\test> xcopy mydir mydir2
目标 mydir2 是文件名
还是目录名
(F = 文件，D = 目录)? D
mydir\test.jpg
mydir\test1.jpg
复制了 2 个文件
```

## 删除文件或文件夹

### del

删除文件。powershell可以使用rm。

### rd（rmdir）

删除空目录。

`rd -R`递归删除非空目录。
