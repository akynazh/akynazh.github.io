---
title: Linux实用操作之权限管理
date: 2021-12-20T10:15:34+08:00
categories: [OS]
tags: [linux]
slug: permission-management-of-linux-practical-operation
---

## 添加用户

```
[root@VM-0-11-centos ~]# useradd jzh

[root@VM-0-11-centos /]# id jzh
uid=1000(jzh) gid=1000(jzh) groups=1000(jzh)

[root@VM-0-11-centos /]# grep jzh /etc/passwd /etc/shadow /etc/group
/etc/passwd:jzh:x:1000:1000::/home/jzh:/bin/bash
/etc/shadow:jzh:!!:18980:0:99999:7:::
/etc/group:jzh:x:1000:
```

x指代密码，对应到shadow中，未设定即为“!!”

## 设置密码

在进行useradd后密码还未设定。

```
[root@VM-0-11-centos /]# passwd jzh
Changing password for user jzh.
New password:
BAD PASSWORD: The password is shorter than 8 characters
Retype new password:
passwd: all authentication tokens updated successfully.
```

若要让用户第一次能通过默认密码登录得上，并提示用户必须修改密码：

```
[root@VM-0-11-centos /]# useradd vbird
[root@VM-0-11-centos /]# echo "658766" | passwd --stdin vbird
Changing password for user vbird.
passwd: all authentication tokens updated successfully.
[root@VM-0-11-centos /]# chage -d 0 vbird # -d接最近一次需要修改密码的时间
```

使用vbird用户登录：

```
vbird@101.34.217.138's password:
You are required to change your password immediately (root enforced)
Last login: Mon Dec 20 00:04:51 2021 from 113.200.174.13
WARNING: Your password has expired.
You must change your password now and login again!
# 提示需要修改密码

# 修改密码
Changing password for user vbird.
Changing password for vbird.
(current) UNIX password:
New password:
Retype new password:
passwd: all authentication tokens updated successfully.
```

## 添加群组与加入群组

```
[root@VM-0-11-centos ~]# groupadd testgroup
[root@VM-0-11-centos ~]# gpasswd testgroup
Changing the password for group testgroup
New Password:
Re-enter new password:
[root@VM-0-11-centos ~]# gpasswd -A vbird testgroup
[root@VM-0-11-centos ~]# grep testgroup /etc/group /etc/gshadow
/etc/group:testgroup:x:1002:
/etc/gshadow:testgroup:$1$9v24LYZE$V/yYwmmoaKNpe9.zCPK3U.:vbird:
```

可见vbird已经加入该群组

## 通过ACL设置专有权限

团队开发时，由于原有权限无法满足需求，通常需要对某些成员设置专有权限。

### setfacl&getfacl

- -m 设置后续acl参数给文件使用
- -x 删除后续acl参数
- -R 递归设置

```
[root@VM-0-11-centos tmp]# touch acl
# 针对用户
[root@VM-0-11-centos tmp]# setfacl -m u:jzh:rx acl # 为jzh用户设置专有权限

# 针对群组
[root@VM-0-11-centos tmp]# setfacl -m g:testgroup:rwx acl
[root@VM-0-11-centos tmp]# getfacl acl
# file: acl
# owner: root
# group: root
user::rw-
user:jzh:r-x
group::r--
group:testgroup:rwx
mask::rwx
other::r--
```

## 登录

```
su - # 使用root登录
su - jzh # 使用jzh登录
```
