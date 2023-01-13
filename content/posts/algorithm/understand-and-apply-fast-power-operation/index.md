---
title: 理解快速幂运算并进行应用
date: 2022-07-21T20:44:54+08:00
categories: [Algorithm]
tags: [algorithm, math]
mathjax: true
slug: understand-and-apply-fast-power-operation
---

## 快速幂运算的解释

问n是否满足$x^n \mod n = x (1 < x < n)$？

先由一个例子引入：

$3^{11} = 3 \times 9^5 = 3 \times 9 \times 81^2 = 3 \times 9 \times 6561^1$

$result = 3 \times 9 \times 6561 = 3^{2^0} \times 3^{2^1} \times 3^{2^3}$

可见发现这次运算中，幂的结果等于变化中所有当**指数为奇数时底数之积**。其中，每次运算均发生指数除二（对应二进制右移一位），且当该指数为奇数时，原式乘上底数。

而这个过程其实相当于一个数进行模2取余求二进制数的过程，每次都除2，当模2余1，即对应二进制最末位为1时乘上底数，则由此可以推知快速幂运算的算法过程。

这个结论是可以证明的，如下：

对于任何十进制正整数n，设其对应二进制数为"$b_m...b_3b_2b_1$"，则有：
- 二进制转十进制：$n = 1b_1+2b_2+4b_3+...+2^{m-1}b_m$；
- 幂的二进制展开：$x^n = x^{1b_1}x^{2b_2}x^{4b_3}...x^{2^{m-1}b_m}$。

则对于$x^n$的求解，可以转化为：

- 计算$x^1,x^2,x^4...x^{m-1}$的值，相当于$x=x^2$的过程；
- 获取二进制各位$b_1,b_2,b_3,...,b_m$的值，相当于模2求余的过程。

上述过程中，当$b_i=0$时，$x^{2^{i-1}b_i}=1$，反之为$x^{2^{i-1}}$，由此可以顺利计算$x^n$。


相应代码：

```cpp
typedef long long ll;
ll mod_pow(ll x, ll n, ll mod) {
	ll res = 1;
	while(n > 0) {
		if(n & 1 == 1) res = res * x % mod; // 一个数&1的结果就是取该数二进制的最末位
		x = x * x % mod;
		n >>= 1;
	}	
	return res;
}
```
注意，运用位运算可以提高效率！

## 一道易错题

剑指 Offer 16. 数值的整数次方

实现 pow(x, n) ，即计算x的n次幂函数。不得使用库函数，同时不需要考虑大数问题。

其实就是快速幂运算的简单应用，然而却很容易忽略一些细节：

可以看几个判例：

```
1.00000
-2147483648
```

不特判的话有可能超时，注意当$x=1，x=-1，x=0，n=0$时都可以直接得到答案。

同时，如果执行`n=-n`，将会出错，因为2147483648超出了int的范围[-2147483648, 2147483647]！可以通过`long n1 = n`解决这个问题。

```
2.10000
3
```
应该注意到x可以为小数。

代码实现：

```cpp
class Solution {
public:
    double myPow(double x, int n) {
		if (x == 0) return 0;
        if (x == 1 || n == 0) return 1;
        if (x == -1) return n % 2 ? -1 : 1;
        long n1 = n; double ans = 1.0;
        if (n < 0) {
            x = 1 / x;
            n1 = -n1;
        }
        while (n1) {
            if (n1 & 1) ans *= x;
            x = x * x;
            n1 >>= 1;
        }
        return ans;
    }
};
```

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**