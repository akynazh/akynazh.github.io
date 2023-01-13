---
title: Shell基本操作总结
date: 2022-10-19T22:44:10+08:00
categories: [Os]
tags: [linux]
slug: shell-basic-operation-summary
---

## shell参数

- $# 参数个数
- $@ 取出所有参数
- $0 取出第一个参数

```sh
if [ "$1" = "-u" ]
then
    echo update
fi
echo $0
```

ans:

```
[root => ~]$ ./test.sh
./test.sh
[root => ~]$ ./test.sh -u
update
./test.sh
```

## 算术运算

```sh
[root@VM-0-11-centos ~]# a=1
[root@VM-0-11-centos ~]# b=$((a*12))
[root@VM-0-11-centos ~]# echo $b
12
```

## 比较运算

指令：-eq -ne -lt -gt -ge -le 

注：字符串比较直接用“=”而不是上述指令。

```sh
[root@VM-0-11-centos ~]# a=10
[root@VM-0-11-centos ~]# [ $a -eq 10 ] && echo yes
yes
[root@VM-0-11-centos ~]# [ $a -ge 11 ] && echo yes || echo no
no
```

指令：-a -o

```sh
[root@VM-0-11-centos ~]# a=10;b=12;
[root@VM-0-11-centos ~]# [ $a -lt 11 -a $b -lt 13 ] && echo yes || echo no
yes
[root@VM-0-11-centos ~]# [ $a -lt 11 -a $b -lt 11 ] && echo yes || echo no
no
```

## 字符串运算

1. -z（即zero）检测字符串长度是否为0，为0返回 true。  
2. str检测字符串是否为空，不为空返回 true。

```sh
[root@VM-0-11-centos ~]# [ -z "jzh" ] && echo yes || echo no
no
[root@VM-0-11-centos ~]# [ "jzh" = "zh" ] && echo yes || echo no
no
```

## 字符串的引号使用

双引号与单引号效果不一样，如下：

```sh
root@ubuntu2004:~# echo "$PATH"
/usr/local/java/jdk1.8.0_311/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:...
root@ubuntu2004:~# echo '$PATH'
$PATH
```

## 获取时间

```sh
# 输出格式化时间
[root@VM-0-11-centos ~]# date '+%Y-%m-%d %H:%M:%S'
2022-04-10 13:22:04
# 输出当前时间戳
[root@VM-0-11-centos ~]# date +%s
1649568128
```

## 条件判断

注：中括号两端要有空白符。

```
[root@VM-0-11-centos tmp]# [ "a" == "b" ] && echo hello || echo bye
bye
[root@VM-0-11-centos tmp]# [ "a" == "a" ] && echo hello || echo bye
hello
```

## 文件运算

1. -r 即read
2. -w 即write
3. -x 即exec
4. -s 即文件不为空
5. -e 即exist

```sh
[root@VM-0-11-centos ~]# touch t.sh
[root@VM-0-11-centos ~]# [ -s ./t.sh ] && echo yes || echo no
no
[root@VM-0-11-centos ~]# [ -e ./t.sh ] && echo yes || echo no
yes
```

## 读取输入

read -p "prompt words" var_name

```sh
[root@VM-0-11-centos ~]# read -p "age:" age
age:12
[root@VM-0-11-centos ~]# echo $age
12
```

read -a variable_name （读取数组）

```sh
[root@VM-0-11-centos tmp]# read -a arr
1 2 3 4 5
[root@VM-0-11-centos tmp]# echo ${arr[4]}
5
```

## 条件判断语句

### if else

```sh
if [  ]
then
	do something
elif [  ]
then
	do something
else
	do something
fi
```

### case

```sh
case ${var} in
"condition1")
do something
;;
"condition2")
do something
;;
*) #anything
do something
;;
esac
```

## 循环语句

### while

```sh
while [ condition ]
do
	do something
done
```

when meet the condition, start the loop.

### until

```sh
until [ condition ]
do
	do something
done
```

when meet the condition, end the loop.

### for

遍历数组：

```sh
for $var in ${array}
do
	do something
done
```

遍历指定数字序列：

```sh
for $var in {1..100}
do
	do something
done
```

条件遍历：

```sh
for ( (i=1; i<=${var}; i++) )
do
	do something
done
```

## sh命令

- -n 不执行，只检查语法 not execute but check
- -v 执行前输出脚本内容 view the script
- -x 将使用到脚本内容输出

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**