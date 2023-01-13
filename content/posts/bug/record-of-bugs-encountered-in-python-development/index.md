---
title: Python开发中遇到的bug记录
date: 2022-11-04T22:53:34+08:00
categories: [Bug]
tags: [python, bug]
slug: record-of-bugs-encountered-in-python-development
---

持续更新中。

## pipenv无法正常install

```
PS C:\Users\akyna\Codes\test\test_py> pipenv install
Usage: pipenv install [OPTIONS] [PACKAGES]...

ERROR:: --system is intended to be used for pre-existing Pipfile installation, not installation of specific packages. Aborting.
```

解决方法：

因为pipenv检测到之前在该目录下创建过了环境，需要先删除之前的环境才可以：

```
PS C:\Users\akyna\Codes\test\test_py> pipenv --rm
Removing virtualenv (C:\Users\akyna\.virtualenvs\test_py-_qApXuy4)...
```

## requests库headers字段编码错误

```
UnicodeEncodeError: 'latin-1' codec can't encode characters in position 30-34: ordinal not in range(256)
```

解决方法：

加上.encode('utf-8')：

```py
return {
    'User-Agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36',
    'Host': HOST,
    'Connection': 'close',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': url.encode('utf-8'), # fix bug
}
```

## python + crontab 环境变量

crontab运行python时，如果python中使用了环境变量，将无法正常获取。

解决方法：

在crontab中配置好python中用到的环境变量：

```
# backup
0 1 * * * env code=/root/Codes /bin/bash /root/Codes/scripts/unix/bbak
# tg send
0 8 * * * env code=/root/Codes /bin/python3 ~/Codes/scripts/py/submit_tg_send.py
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**