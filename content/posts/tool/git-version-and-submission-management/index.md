---
title: Git版本与提交管理
date: 2022-12-06T11:42:39+08:00
categories: [Tool]
tags: [git]
slug: git-version-and-submission-management
---

## 关于HEAD

HEAD 代表当前分支的最新提交名称，它可以由一些修饰符进行修饰进而产生不同的含义。

**关于 HEAD~{n}**

`~` 是用来在当前提交路径上回溯的修饰符。

`HEAD~{n}` 表示当前所在的提交路径上的前 n 个提交（n >= 0）：

- `HEAD = HEAD~0` （即当前最新的一次commit）
- `HEAD~ = HEAD~1`
- `HEAD~~ = HEAD~2`

**关于 HEAD^{n}**

`^` 是用来切换父级提交路径的修饰符。

当我们始终在一个分支比如 dev 开发/提交代码时，每个 commit 都只会有一个父级提交，就是上一次提交。此时 `HEAD~1` 等价于 `HEAD^`。

当并行多个分支开发，feat1, feat2, feat3，完成后 merge feat1 feat2 feat3 回 dev 分支后，此次的 merge commit 就会有多个父级提交。

- `HEAD^ = HEAD^1` 第一个父级提交
- `HEAD^2~1` 第二个父级提交的上一次提交

## 强行覆盖本地分支（不关心本地修改）

若在其它分支上进行了修改，而本地也有了一定的修改，但本地的修改是可以忽略的（或者你不小心放入了一些无关文件），那么，这时你很需要用强行覆盖这个操作。

```
git fetch
git reset --hard HEAD
git merge origin/$CURRENT_BRANCH # 若已做映射：git merge
```

## 修改提交过的版本

### 修改上次提交

这里对提交的信息和作者进行修改，注意邮箱两侧由<>包括住

```
git commit --amend --message="modify" --author="your_name <your_email>"
git push -f
```

### 修改多次提交

进行 `git rebase` 之前，先将本地修改提交完毕。

```
# 列出最近3次提交
git rebase -i HEAD~3
```

得到大致如下内容：

```
pick 8ae7972 update
pick 1a22dfd update
pick 00433e4 update

# Rebase 368e5c8..00433e4 onto 368e5c8 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous

......
```

可见确实列出了前面3次的修改记录。

将需要修改的 commit-id 前面对应 “pick” 改为 “edit”，即可在后续操作中对该分支进行修改。

之后，x次修改就进行x次下面两条命令：

```
git commit --amend --message="modify" --author="your_name <your_email>"
git rebase --continue
```

经过x次以上命令，不出什么问题的话，将会有大致如下的提示出现：

```
Successfully rebased and updated refs/heads/master.
```

现在，强制推送即可：

```
git push --force
```

## 取消或删除提交

当你在某一次提交中不小心忘记了把一些敏感信息进行ignore，那么你很可能需要删除那一次提交。

可以使用 `git reset` 删除提交，记录将被真正删除，是将 HEAD 指向某个 commit-id， 该操作需要谨慎使用。

如果使用 `git revert` 则只是取消上一次修改，上一次的提交记录还在，并且多生成了一次提交记录。也就是说对于敏感信息的处理是无效的。同时，该操作如果想重做多次修改，需要按如下规则进行操作：

```
git revert [倒数第一个提交] [倒数第二个提交]
# 如 git revert HEAD HEAD~1
```

### 取消上一次提交

```
git revert HEAD
git push origin master
```

### 删除上一次提交

删除上一次提交，也就是把 `HEAD` 指向 `HEAD^`， `--hard` 使得工作区里面的文件也回到以前的状态。

```
git reset --hard HEAD^
```

取消某次提交：

```
git reset --hard commit_id
```

接着进行提交即可：

```
git push origin master -f # origin为之前指定的远程分支
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**