---
title: Linux实用操作之文本操作
date: 2021-12-05T00:20:09+08:00
categories: [OS]
tags: [linux]
slug: text-operation-of-linux-practical-operation
---

## 使用grep抓取期望的结果

在过去登录主机的人中截取登录信息含root的行信息

```
last | grep 'root'
```

比较重要，记忆：

grep [-acinv] [--color=auto] '搜寻字串' filename

选项与参数：

-a ：将 binary 文件以 text 文件的方式搜寻数据

-c ：计算找到 '搜寻字串' 的次数

-i ：忽略大小写的不同，所以大小写视为相同

-n ：顺便输出行号

-v ：反向选择，亦即显示出没有 '搜寻字串' 内容的那一行

--color=auto ：可以将找到的关键字部分加上颜色的显示喔

## awk命令操作文本

- 格式化输出：以tab隔开打印前五行中每行的第一和第三个字符

awk '{[pattern] action}' {filenames}

```
last -n 5 | awk '{print $1 "\t" $3}'
```

注意必须是内双引号外单引号的形式。

- 分隔字符

awk -F  #-F指定所操作文件中的目标分割字符

使用","分隔

```
awk -F, '{print $1 " - " $2}' log.txt
```

- 设置变量

awk -v  # 设置变量

设置变量k等于1

```
awk -vk=1 '{print $1, $1+k}' log.txt
```

- 使用awk脚本

awk -k {awk_script} {file}

使用my.awk处理log.txt

```
awk -k my.awk log.txt
```

## sed命令操作文本

- 打印删除了第二到第五行的文本

```
nl /etc/passwd | sed '2,5d'
```

注：nl可以额外输出行号

- '2,$d' 匹配删除了第2到最后一行的文本
- '/root/d' 匹配删除了含root的行的文本

a: add

c: commute

d: delete

i: insert

p: print

s: s/old/new/g

## 使用cut处理输出的结果

对以:隔开的结果，输出第三个到第五个

```
echo $PATH | cut -d ':' -f 3,5
```

## 使用sort和uniq处理结果

使用 last 将帐号列出，仅取出帐号栏，进行排序后仅取出一位

```
last | cut -d ' ' -f 1 | sort | uniq
```
