---
title: Git快速初始化操作
date: 2021-12-10T18:10:07+08:00
categories: [Tool]
tags: [git]
slug: git-quick-initialization-operation
---

## git初次拉取远程仓库

首先从github建立一个仓库，获取仓库地址url，然后进入项目所在文件夹，运行以下代码：

```
> git init # 初始化仓库，生成.git文件

> git add . # 将项目文件的修改信息添加到.git内的一个暂存区（index）

> git commit -m “init” # 将暂存区的修改信息提交到分支

> git remote add origin ${url} # 添加远程仓库

> git push origin master # 将本地分支推送到远程仓库
```

这里执行完 `git commit -m "init"` 后，我们查看一下本地分支信息：

```
> git branch
* master
```

可见git自动为我们本地创建了一个master分支。

执行完 `git push origin master` 后，我们查看一下本地分支与远程分支的映射关系：

```
> git branch -a
* master
  remotes/origin/master

> git branch -vv
* master 3a31f4c init
```

可见并没有产生映射。

所以如果直接使用 `git push` 提交代码会报错，因为 git 不知道你要提交到哪个远程分支。

## git映射关系

建立映射关系的方法：

```
git branch -u origin/dev_r 将当前分支 dev_r 与远程分支 origin 建立映射关系

git branch -vv 查看分支映射关系
```

如果建立了映射关系，那么以后在当前分支 `git push` 时默认 push 到与当前分支建立关系的那个远程分支。

**实际操作：**

运行以下指令：

```
> git branch -u origin/master
Branch 'master' set up to track remote branch 'master' from 'origin'.
> git branch -vv
* master 3a31f4c [origin/master] init
```

即可看见产生了映射关系。

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**