---
title: Matlab基本用法整理 
date: 2020-02-06T20:41:12+08:00
categories: [Language]
tags: [matlab, math]
slug: basic-usage-sorting-of-matlab
---
## 基本语法方面

### 提取矩阵某行或某列

```matlab
A(:, [2 3]) 返回第2和第3列
```

### 获取随机数

```matlab
randi(100); % 1 到 100 之间的随机整数
```

### 初始化数组

```matlab
zeros(1, 30); % 1行30列的全0数组
```

### 控制语句

```matlab
for i = 0 : 100
    for j = 1 : 10
        if (...) 
          ...
        else 
          ...
        end
    end
    ...
end
```

### 格式化输出

```matlab
fprintf("若选手选择改变，则成功次数为：%d, 成功率为：%f\n", count, count / SUM);
```

## 初等数学方面

### 求解方程组

注：solve已经改版，不可传入字符串

实例：求解二元一次方程

```matlab
syms x y;
s = x - 6 * y == 2;
t = 5 * x + 4 * y == 3;
result = solve(s, t);
```

### 求平均值，中值与标准差

```matlab
A = [12 13 7 18 16 21 9 10 2 18];
A = sort(A);
ave = mean(A);
md = median(A);
sigma = std(A);
```

### 解一阶导数方程

```matlab
syms x y;
y = -0.0283 * x^2 + 0.7387 * x + 8.9191;
my_x = solve(diff(y)); % diff(A)用于求导数
my_y = subs(y, x, my_x); % 当x=my_x时求y的值
fprintf("(%.2f, %.2f)\n", my_x, my_y);
```

## 基础绘图方面

### 绘制二维图

绘制二维图并设置x,y轴通过坐标原点

```matlab
x = [-2.5*pi:0.1:2.5*pi];
y = [-1:0.1:1];
y = cos(x);
plot(x,y)
ax = gca;
ax.XAxisLocation = 'origin';
ax.YAxisLocation = 'origin';
```

### 绘制三维图

使用mesh或surf，subplot进行分区

```matlab
[x, y] = meshgrid(-5:0.1:5, -3:0.1:3);
z = x.^2 + y.^2;
subplot(1,2,1)
surf(x, y, z);
subplot(1,2,2)
mesh(x,y,z)
```

### 绘制等高线

```matlab
[x, y] = meshgrid(-5:0.1:5, -3:0.1:3);
z = x.^2 + y.^2;%z就是高度
contour(x,y,z)%绘制等高线
subplot(2,2,1)
[C,h] = contour(x,y,z, 'ShowText', 'on');
% [M,c] = contour(___) 返回等高线矩阵和等高线对象 c。
% 显示等高线图后，使用 c 设置属性。
```

## 高数和线代方面

### 泰勒级数第n项展开

```matlab
T = taylor(f, x, 'Order', n);
```

### 求极大线性无关组

```matlab
A =

     1     2     3     1
     0     1     2    -2
     2     1     0     8

>> [R j] = rref(A)

R =

     1     0    -1     5
     0     1     2    -2
     0     0     0     0

%主元所在列数
j =

     1     2

% 即得到极大线性无关组

>> M = A(:,[1,2])

M =

     1     2
     0     1
     2     1
```

### 求Ax = 0基础解系

```matlab
A =

     2    -2     1     3
     9    -5     2     8

%求出最小有理数解
>> r = rank(A);
>> X = null(A, 'r')

X =

    0.1250   -0.1250
    0.6250    1.3750
    1.0000         0
         0    1.0000

%求出规范正交基
>> X = null(A)

X =

    0.1293   -0.1052
    0.3860    0.7386
    0.9041   -0.2092
   -0.1302    0.6322
```

### 左除与右除

```matlab
右除正斜杠： A / B -> A * inv(B)
左除反斜杠： A \ B -> inv(A) * B
```

### 求Ax = b特解

```matlab
A非方阵时，无法利用x = A^(-1) * b

应该使用x = A \ b
```

### 计算特征多项式及特征值

```matlab
>> A = [1 2 3; 2 1 3; 3 3 6]

A =

     1     2     3
     2     1     3
     3     3     6

>> f = poly(A)

f =

    1.0000   -8.0000   -9.0000   -0.0000

>> lamda = roots(f)

lamda =

    9.0000
   -1.0000
   -0.0000
```

### 计算特征值的简易方法

```matlab
>> eig(A)

ans =

   -1.0000
   -0.0000
    9.0000
```

### 计算特征值及对应特征向量

```matlab
>> [Q, D] = eig(A)

Q =

    0.7071    0.5774    0.4082
   -0.7071    0.5774    0.4082
         0   -0.5774    0.8165


D =

   -1.0000         0         0
         0   -0.0000         0
         0         0    9.0000
```

### 使用命令eig把二次型标准化

```matlab
同上，由D可得标准型，由Q可得正交变换法。
```

### 使用命令eig判断二次型的正定性

```matlab
同上，观察D对角线元素正负性即可。
```

### 使用命令orth把向量组正交规范化

```matlab
A =

     2    -2     1     3
     9    -5     2     8
   
>> B = orth(A)

B =

   -0.2982    0.9545
   -0.9545   -0.2982

%满足B * B' == eye(rank(A))

>> B * B'

ans =

    1.0000    0.0000
    0.0000    1.0000

```
