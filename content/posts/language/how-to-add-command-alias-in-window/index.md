---
title: Window添加命令别名的方法
date: 2022-06-24T22:52:59+08:00
categories: [Language]
tags: [windows, powershell]
slug: how-to-add-command-alias-in-window
---

## 前言

下面将介绍3种方法：

- CMD添加别名的方法
- PowerShell添加别名的方法
- 通过添加环境变量的方式设置别名

## CMD添加别名的方法

### 设置临时的别名

可以通过doskey命令实现。

```bat
doskey ls=echo ====== ^&^& dir /b $* ^&^& echo ======
```

`$*`表示还可能有其他命令参数，`^&^&`用于分开多条命令。

单纯在一个cmd窗口中使用doskey设置别名，别名只能在该窗口中使用。

### 设置永久的别名

可以通过将doskey命令写入bat脚本，再把脚本路径添加到注册表Autorun实现永久且所有cmd都可用的别名，具体步骤如下：

1. 编写脚本：

```bat
@echo off
doskey ls=dir /b $*
doskey lss=echo ====== ^&^& dir /b $* ^&^& echo ======
```

2. 添加路径到注册表

在`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor`下的Autorun中，将数值设为doskey命令脚本所在的路径即可。这样所有用户都可以使用设置好的别名。

也可在HKEY_CURRENT_USER下的对应位置设置，只针对当前用户设置别名。

### 优缺点

通过doskey的方式，挺方便的，但是在命令非常多的情况下不是很方便，同时，设置的命令还不可以在powershell下运行。

## PowerShell添加别名的方法

### 为PowerShell设置临时的别名

```ps1
PS C:\Users\akyna> set-alias escc esc
PS C:\Users\akyna> escc
......
```

如果带参数，则可以通过function进行：

```ps1
PS C:\Users\akyna> function func{nircmd emptybin}
PS C:\Users\akyna> set-alias ctrash func
PS C:\Users\akyna> ctrash
```

这样的别名只是在当前会话下有效，开启另一个shell就失效了。

可以通过`export-alias my-alias.txt`导出当前会话下的alias，在其他shell中，通过`import-alias my-alias.txt`即可使用。

### 删除PwerShell临时别名

```ps1
PS C:\Users\akyna> remove-item alias:escc
PS C:\Users\akyna> escc
escc: The term 'escc' is not recognized as a name of a cmdlet, function, script file, or executable program.
...
```

### 为PowerShell设置永久的命令别名

1. 打开 PowerShell ，运行 echo $profile，会输出一个powershell配置文件的路径。
2. 打开文件，按以下格式可以设置多条别名：

```ps1
function 别名 { 需要替代的命令，可以包含空格 }
```

**e.g.** 

一个升级vscode的命令：

```ps1
# 升级vscode
function updatevs {
    taskkill /f /t /im code.exe
    move D:\a\VSCode* D:\a\vs.zip
    Bandizip.exe x -o:"D:\tools3\vscode\Microsoft VS Code" -aoa "D:\a\vs.zip"
    del D:\a\vs.zip
    code
    pause
}
#其他别名
...
```

以后，新的别名都可以继续添加在该文件中，非常方便。

3. 将ExecutionPolicy设为RemoteSigned。

   - 以管理员身份打开 PowerShell，执行 `Set-ExecutionPolicy RemoteSigned`。
   - 重新启动 PowerShell ，完成。

### 优缺点

对于命令非常多的情况很方便，但是无法在cmd下运行别名。

下面介绍一种同时适用于powershell和cmd的方式。

## 通过添加环境变量的方式设置别名

### 操作方法

假如我想通过exesc这个命令运行一些操作命令：

- 在路径my_path下新建exesc.bat文件，该文件包含了一系列操作命令；
- 将my_path加入环境变量；
- 命令行即可通过键入exesc命令执行exesc.bat。

以后添加任何命令都可以在这个路径中新建bat文件编写别名，非常方便。

这样在powershell和cmd中都可以使用通过这个方法设置好的别名，但是注意，前提是这个脚本中的命令同时适用于powershell和cmd，比如，如果该脚本中存在一个`ls`命令，但是cmd没有这个命令，那么cmd就无法使用该别名，但是你可以先通过上面介绍的doskey方法设置好ls别名，这样就可以愉快使用了。

### 优缺点

个人感觉是很不错的方法，但是一个别名对应一个文件，不是很方便，无法在一个文件中同时指定所有别名。

如果想实现通用性，必须兼顾cmd和powershell都存在的命令。如果想使用powershell很多特有的命令，那么实现通用性是比较麻烦的。

## 总结

如果你只使用powershell，那么只使用上面第二种方法就好了，这是最舒服的方法。

如果你只是用cmd，那么就考虑用powershell吧，它可比cmd强大多啦，内置了许多linux命令别名以及一些强大的命令。如果实在不想换，那就用第一种老方法。

第三种方法，可以视情况而定使用。

---

**From My Blog: [akynazh](https://akynazh.site)**

over.