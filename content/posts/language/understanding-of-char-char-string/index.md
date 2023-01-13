---
title: 关于char*, char[], string的理解
date: 2021-12-05T12:37:32+08:00
categories: [Language]
tags: [cpp]
slug: understanding-of-char-char-string
---

## 关于char[]与char*的区别

```cpp
char s1[] = "abc";
cout << s1 << endl; // abc
s1[1] = 'd'; // 改变值
cout << s1 << endl; // adc
```

"abc"为**字符串常量**，s1为**指针常量**，即指针是一个常量，所以指向**地址**不能改变，指向地址的**值**可变

```cpp
const char* s2 = "abc"; // const是默认存在的
cout << s2 << endl; // abc
s2 = "dfs"; // 改变地址
cout << s2 << endl; // dfs
```

"abc"为**字符串常量**，s2为**常量指针**，指向**地址**可变，但指向的地址的**值**不能变

以上两者皆可用于函数传值

```cpp
void print_str(const char * str) {
    printf("%s\n", str);
}

print_str(s1); // adc
print_str(s2); // dfs
```

## 关于string和char[],char*的关系

- string是类，string是对一个字符串的引用值

```cpp
const char* s1 = "abc";
string s = s1;
cout << s << endl; // abc
s += "a";
cout << s << endl; // abca 
cout << s1 << endl; 
// abc 证明string只是引用了s1
```

- string引用字符串示例

```cpp
const char *s1 = "123";
string str1 = s1; // 若要这样赋值s1必须加const
cout << str1 << endl; // 123

char s2[] = "234";
string str2 = s2;
cout << str2 << endl; // 234
```

- string转char*

```cpp
const char* s1_1 = str1.c_str(); 
// c_str 转 const char*
cout << s1_1 << endl; // 123
```

## char*,char[]与int的相互转换

```cpp
int v1 = atoi(s1);
cout << v1 << endl; // 123
v1 += 1;
char str11[100]; 
itoa(v1, str11, 10); // 10代表十进制
cout << str11 << endl; // 124
// 下面的会失败
// const char* str111;
// itoa(v1, str111, 10); // 失败
```

## string与int的相互转换

```cpp
int val = 223;
string str3 = to_string(val); 
// C++11新特性 只适用于string (char[]和char*不可以)
cout << str3 << endl; // 223
val = stoi(str3, 0, 10); // 0为起始位置 10即十进制
cout << val << endl; // 223
```

over.