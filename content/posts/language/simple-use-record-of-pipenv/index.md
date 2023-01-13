---
title: pipenv简单使用记录
date: 2023-01-04T22:55:27+08:00
categories: [Language]
tags: [python]
slug: simple-use-record-of-pipenv
---

## 关于pipenv

pipenv集成了pip，virtualenv两者的功能，且完善了两者的一些缺陷。

## 安装pipenv

```
pip install pipenv -U
```

## 创建虚拟环境

初次创建环境可以使用以下类似命令：

```
pipenv install --python C:/Users/akyna/AppData/Local/Programs/Python/Python37/python.exe --pypi-mirror https://pypi.tuna.tsinghua.edu.cn/simple
```

`--python` 是可选的，可以指定python版本，参数为python解释器的绝对路径，如果不指定，默认使用当前系统的python。

`--pypi-mirror` 是可选的，可以指定镜像，加速下载。

创建好后，在当前目录下将会生成 `Pipfile` 文件，在 `~\.virtualenvs` 下生成虚拟环境目录（存放python解释器和依赖）。

如果目录中已经存在 `Pipfile` 或者 `requirements.txt`，pipenv会自动检测这两个文件并将对应依赖进行安装。

查看虚拟环境目录位置：

```
pipenv --venv
```

## 激活虚拟环境

```
pipenv shell # 激活虚拟环境

python -V
```

如果激活了虚拟环境，在当前shell下，使用的python或者pip都是虚拟环境中的python和pip。

## 配置Pip并安装依赖

配置镜像源为清华源：

```
vim Pipfile

[[source]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
```

以后所有依赖的安装都不需要指定 `--pypi-mirror` 了。 

安装依赖：（建议关闭代理，如果有的话）

```
pipenv install {pkg} # 如果激活了虚拟环境，可以使用pip
# pipenv install -r requirements.txt
```

安装完依赖后，将会生成 `Pipfile.lock` 文件，以后初始化虚拟环境都只需要运行 `pipenv install` 即可完成所有依赖的安装。

当然，也可以通过生成 `requirements.txt` 的方式进行，下次初始化虚拟环境时，pipenv也会自动识别目录下的 `requirements.txt`：

```
pipenv requirements > requirements.txt
```

通过 `pipenv graph` 可以查看目前安装的库及其依赖。

## 关于Pipfile和Pipfile.lock

这两个文件是相互补充的关系。

首先，对于pipfile, 里面一般记录了以下类似内容：

- Source: 记录包的下载地址源

- Dev-packages : 记录当我们开发时所需要使用的包的相关信息

- Packages: 用于记录我们程序运行所依赖的包

- Requires: 指定了使用的python的版本

然后，对于Pipfile.lock文件，

这是一个json类型的文件，在这个文件里面，它记录了：

- 开发所用的包和其详细的版本
- 记录了源代码的包的下载地址，其中的hash值用于包的验证

使用 `pipenv lock` 可以更新Pipfile.lock文件，lock操作将让安装依赖的时间变长，可以通过 `--skip-lock` 来跳过lock操作。

对于 `Dev-packages` 字段，使用 `pipenv install` 创建虚拟环境时需要添加 `--dev` 才会安装它对应的包（默认只安装Packages下的包）。

安装依赖时，添加 `--dev` 将会把包依赖记录到 `Dev-packages` 下而不是 `Packages` 下。

## 更新包

```
pipenv update --outdated  # 查看所有需要更新的依赖项
pipenv update  # 更新所有包的依赖项
pipenv update <包名>  # 更新指定的包的依赖项
```

## 卸载包

```
pipenv uninstall XXX  # 卸载XXX模块并从Pipfile中移除
pipenv uninstall --all  # 卸载全部包并从Pipfile中移除
pipenv uninstall --all-dev  # 卸载全部开发包并从Pipfile中移除
```

## 退出虚拟环境

```
exit  # 退出当前虚拟环境

python -V # 将变为系统的python版本
```

## 删除虚拟环境

```
pipenv --rm  # 删除虚拟环境 
```

在~/.virtualenvs中的虚拟环境将被删除。

## 运行文件

方式一： 

```
pipenv run python xxx.py
```

方式二：在激活环境中运行

```
# 进入激活环境
pipenv shell
# 运行文件
python xxx.py
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**