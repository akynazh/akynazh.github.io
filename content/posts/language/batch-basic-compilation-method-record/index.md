---
title: Batch基本编写方法记录
date: 2022-08-03T23:34:36+08:00
categories: [Language]
tags: [batch, windows]
slug: batch-basic-compilation-method-record
---

## 读取输入

```bat
set /p ch="y/n:"
echo %ch%
```

## 变量运算

通过`%{var}%`访问变量，通过`/a`进行表达式计算设置值。

```bat
@echo off

set money=100
echo 初始金额： %money%

set /a money=%money%*2
set /a money=%money%+100
echo 现在的金额：%money%
```

## 选择并跳转

`:{point}` 用于指定一个跳转点。

```bat
@echo off

set /p ch="y/n:"
if "%ch%"=="" (
    goto end
) else if "%ch%"=="n" (
    goto no
) else if "%ch%"=="y" (
    goto yes 
) else (
    goto end
)

:no
echo NO
goto end

:yes
echo YES
goto end

:end
```

## 循环语句

- 通过%%x设置和访问循环值；
- 通过(start, steps, end)设置循环；
- /l 将通过比较start和end来执行迭代。

```bat
@echo off

for /l %%x in (1, 5, 100) do (
    echo hello, jzh-%%x
)
```

## 变量动态变化

- `setlocal enabledelayedexpansion`开启变量延迟，使得变量可以动态变化;
- 需通过`!{var}!`访问变化中的量。

```bat
@echo off
@REM 开启变量延迟，使得变量可以动态变化
setlocal enabledelayedexpansion 

set /a i=1
for /l %%i in (1, 1, 10) do (
	echo hello
	set /a i+=1
	echo !i!
)
echo %i%
```

## 接收参数

```bat
@echo off
rem %1 即 args[0]
if "%1" == "a" echo open a.txt 

if "%2" == "b" echo open b.txt
```

---

参考文档：[windows-commands](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**