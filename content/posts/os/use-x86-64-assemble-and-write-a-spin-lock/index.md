---
title: 使用x86_64汇编写一个自旋锁
date: 2022-06-09T23:37:51+08:00
categories: [OS]
tags: [assembly, os]
slug: use-x86-64-assemble-and-write-a-spin-lock
---

## 一、理论分析

自旋锁，顾名思义，即自己不断旋转重复进行的锁，当多个线程访问同一资源时，为实现互斥访问，必须给目标资源加锁，此时只允许一个线程访问，此时其他线程无法访问，并且一直重复请求访问，直到该锁被释放。访问完资源的线程及时释放锁以供其他资源访问。

自旋锁可以通过比较替换算法实现：设锁为1时被占用，为0时空闲。当一个线程请求锁时，即进入请求锁循环“spinlock”，设预期值为0，修改值为1，让锁值与预期值比较，若锁值等于预期值，则锁空闲，将锁值置为修改值，退出spinlock循环；若锁值不等于预期值，则证明锁被占用，继续spinlock循环。

为验证是否成功实现自旋，开启一个释放锁线程，请求锁线程自旋一段时间后，释放锁线程进行锁的释放，即把锁值置为预期值0。此时，请求锁线程成功获得锁并退出spinlock循环。

## 二、设计与实现

使用x86_64汇编实现自旋锁：

### Intel语法

```c
// 尝试获取锁
void lock(long *p) {
    long a = 0, c = 1;
    printf("try to get lock...\n");
    __asm__(
        "push rax \n\t"
        "push rcx \n\t"
        "spin_lock: \n\t"
        "mov rcx, %[c] \n\t"
        "mov rax, %[a] \n\t"
        // 比较并替换算法，若p==rax==0则获得锁并使p=rcx(==1)，若p(==1)!=rax则进入自旋。
        "lock cmpxchg %[p], rcx \n\t"
        "jne spin_lock \n\t"
        "pop rcx \n\t"
        "pop rax \n\t"
        : [p]"+m"(*p)
        : [a]"r"(a), [c]"r"(c)
        : "rcx", "rax"
    );
}
// 释放锁
void unlock(long *p) {
    __asm__(
        "mov %[p], 0; \n\t"
        : [p]"+m"(*p)
    );
}
```

### AT&T语法

```c
void lock(long *p) {
    long a = 0, c = 1;
    printf("try to get lock...\n");
    __asm__(
        "pushq %%rax \n\t"
        "pushq %%rcx \n\t"
        "spin_lock: \n\t"
        "movq %1, %%rcx \n\t"
        "movq %2, %%rax \n\t"
        "lock cmpxchg %%rcx, %0 \n\t"
        "jne spin_lock \n\t"
        "popq %%rcx \n\t"
        "popq %%rax \n\t"
        : "+m"(*p)
        : "r"(c), "r"(a)
        : "%rcx", "%rax"
    );
}
void unlock(long *p) {
    __asm__(
        "movq $0, %0; \n\t"
        : "+r"(*p)
    );
}
```

## 测试自旋锁

初始化锁值为1，主线程尝试获取锁，进入自旋，子线程在一段时间后释放锁，锁值置为0，接着，主线程获得锁并把锁置为1。

```cpp
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

// intel语法实现自旋锁 > gcc -pthread -masm=intel -o s spinlock.c
// 尝试获取锁
void lock(long *p) {
    long a = 0, c = 1;
    printf("try to get lock...\n");
    __asm__(
        "push rax \n\t"
        "push rcx \n\t"
        "spin_lock: \n\t"
        "mov rcx, %[c] \n\t"
        "mov rax, %[a] \n\t"
        // 比较并替换算法，若p==rax==0则获得锁并使p=rcx(==1)，若p(==1)!=rax则进入自旋。
        "lock cmpxchg %[p], rcx \n\t"
        "jne spin_lock \n\t"
        "pop rcx \n\t"
        "pop rax \n\t"
        : [p]"+m"(*p)
        : [a]"r"(a), [c]"r"(c)
        : "rcx", "rax"
    );
}
// 释放锁
void unlock(long *p) {
    __asm__(
        "mov %[p], 0; \n\t"
        : [p]"+m"(*p)
    );
}

// 释放锁线程
void *mythread(void* args) {
    long* p = (long*) args;
    // 推迟释放锁，此时自旋在进行中
    sleep(2);
    // 释放锁
    unlock(p);
    printf("after unlock: %ld\n", *p);
}

int main() {
    long a = 1; // 设刚开始锁已被获取
    long *p = &a;
    // 开启一个用于释放锁的线程
    pthread_t t1;
    pthread_create(&t1, NULL, mythread, (void*)p);
    printf("before lock: %ld\n", *p);
    // 主线程尝试获取
    lock(p);
    pthread_join(t1, NULL);    
    printf("after lock: %ld\n", *p);
    return 0;
}
```

这里采用intel语法编写的自旋锁进行测试，执行命令`gcc -pthread -masm=intel -o s spinlock.c`进行编译。

若采用AT&T，执行命令`gcc -pthread -o s spinlock.c`进行编译，无需`-masm=intel`，因为gcc底层默认采用AT&T。

## 三、运行结果

运行结果如下：

```c
before lock: 1
try to get lock...
after unlock: 0
after lock: 1
```

一开始锁值为1，请求锁线程（即主线程）请求获得锁，进入自旋。2s后释放锁线程进行锁的释放，接着请求锁线程成功获得锁，锁值又被置为1，成功实现自旋与锁的释放。

over.