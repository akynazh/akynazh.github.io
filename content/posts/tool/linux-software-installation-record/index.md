---
title: Linux软件安装和配置记录
date: 2022-11-13T21:15:53+08:00
categories: [Tool]
tags: [linux, software]
slug: linux-software-installation-and-configuration-records
---
## BASE

```
apt update -y
apt install curl wget vim net-tools  git nginx -y
# apt install openssh*

--------------------------------------------

yum update -y
yum install curl wget vim net-tools git nginx -y
yum install openssh*
```

## yum镜像

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo # centos7

yum makecache
yum -y update
```

## apt镜像

```
cp /etc/apt/sources.list /etc/apt/sources.list.bak
vim /etc/apt/sources.list

lsb_release -c 查看版本代码

如要用于其他版本，把 focal 换成其他版本代号即可: 22.04：jammy；20.04：focal；18.04：bionic；16.04：xenial；14.04：trusty。

# 默认注释了源码仓库，如有需要可自行取消注释
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse

deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

## python3

### 安装

```
yum update
yum install openssl-devel bzip2-devel libffi-devel -y
yum groupinstall "Development Tools" -y
wget https://www.python.org/ftp/python/3.10.2/Python-3.10.2.tgz
tar -zxvf Python-3.10.2.tgz
cd Python-3.10.2
./configure --enable-optimizations
make altinstall
ln -sf /usr/local/bin/python3.10 /usr/bin/python3
ln -sf /usr/local/bin/python3.10 /bin/python3
ln -sf /usr/local/bin/pip3.10 /usr/bin/pip

------------------------------------------------------

apt update
apt install software-properties-common -y
add-apt-repository ppa:deadsnakes/ppa && apt update
apt install python3.10 -y
ln -sf /usr/bin/python3.10 /usr/bin/python3
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3 get-pip.py
ln -sf /usr/local/bin/pip3.10 /usr/bin/pip
```

### Pip 镜像配置

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip config set install.trusted-host https://pypi.tuna.tsinghua.edu.cn
```

### 遇到的问题

#### No module named 'distutils.cmd'

```
apt install python3-distutils -y
```

#### setup

python setup.py egg_info did not run successfully.

```
pip install setuptools -U
```

#### lzma

ModuleNotFoundError: No module named '_lzma' 解決方法：

```
yum install xz-devel
yum install python-backports-lzma
pip install backports.lzma

找到lzma.py，如日誌提示的/usr/local/lib/python3.7/lzma.py，修改zma.py文件中的導入部份如下：

修改前：
from _lzma import *
from _lzma import _encode_filter_properties, _decode_filter_properties

修改後：
try:
    from _lzma import *
    from _lzma import _encode_filter_properties, _decode_filter_properties
except ImportError:
    from backports.lzma import *
    from backports.lzma import _encode_filter_properties, _decode_filter_properties
```

## verysync

```
curl http://www.verysync.com/shell/verysync-linux-installer/go-installer.sh > go-installer.sh
chmod +x go-installer.sh
./go-installer.sh
```

## java

### 安装

```
wget https://repo.huaweicloud.com/java/jdk/8u151-b12/jdk-8u151-linux-x64.tar.gz
tar -zxvf jdk-8u151-linux-x64.tar.gz
sudo mkdir /usr/local/java
sudo mv jdk1.8.0_151 /usr/local/java/jdk1.8
```

### 环境变量

```
# java env
export JAVA_HOME=/usr/local/java/jdk1.8
export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
export PATH=$PATH:$JAVA_HOME/bin
```

## maven

### 安装

```
wget https://dlcdn.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz
sudo mkdir /usr/local/maven
tar -zxvf apach*
sudo mv apache-maven-3.8.6 /usr/local/maven/3.8.6
```

### 环境变量

```
# maven env
MAVEN_HOME=/usr/local/maven/3.8.6
export PATH=$PATH:$MAVEN_HOME/bin
```

### 镜像

sudo vim /usr/local/maven/3.8.6/conf/settings.xml

```
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

## node npm

### 安装

```
curl --silent --location https://rpm.nodesource.com/setup_16.x | bash -
yum -y install nodejs

--------------------------------------------

apt install nodejs npm
```

### 镜像

设置成淘宝源

```
npm config set registry https://registry.npm.taobao.org
```

## mysql

### 安装

```
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
yum install mysql-community-server -y
```

### 配置root密码

vim /etc/my.cnf

```
+ skip-grant-tables
```

```
mysql
flush privileges;
alter mysql.user 'root'@'localhost' identified by 'xxxxxx';
```

vim /etc/my.cnf

```
- skip-grant-tables
```

## redis

```
yum install epel-release
yum install -y redis
```

## c/c++

```
yum install gcc -y
yum install gcc-c++ -y
yum install gdb -y
```

## git

### 安装

```
yum install git -y

------------------------------------

apt install git -y
```

### 配置密钥

将公钥手动部署到github

### 配置提交人信息

```
git config --global user.name "akynazh"
git config --global user.email "1945561232@qq.com"
```

### http代理

```
git config --global http.https://github.com.proxy socks5://127.0.0.1:7891
```

### ssh代理

```
# ~/.ssh/config

Host github.com
    User git
    Port 22
    Hostname github.com
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand nc -v --proxy-type socks5 --proxy 127.0.0.1:7891 %h %p

Host ssh.github.com
    User git
    Port 443
    Hostname ssh.github.com
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand nc -v --proxy-type socks5 --proxy 127.0.0.1:7891 %h %p
```

unix系统使用nc（netcat）命令，若未安装netcat，需先安装：

```
yum install nc
```

### Go

```bash
apt install golang-go
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**
