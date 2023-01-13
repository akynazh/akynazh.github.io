---
title: Window增加右键打开选项
date: 2021-11-20T18:10:30+08:00
categories: [Tool]
tags: [windows]
slug: add-right-click-open-option-in-window
---

## 加入注册表界面

- win+R

- regedit


## 增加右键操作文件选项

### 以vscode作为编辑文件实例

注册表页面下进入：

计算机\HKEY_CLASSES_ROOT\*\shell

1. 新建项 Vscode

2. 右键Vscode并新建项command

    - 编辑command默认选项值为： ```${vscodepath}\Code.exe %1```
    
    %1是可选的参数，这里必须要加，表示作用于该文件。

3. 编辑Vscode值

   - 编辑右键显示名称：默认值改为Open with vscode （不编辑则为新建项的名称）

   - 编辑右键显示图标：新建字符串值icon 添加：```${vscodepath}\Code.exe``` (有些可以这样，但一般为ico文件)


## 增加目录下右键打开选项

### 以window terminal作为实例

注册表页面下进入：

计算机\HKEY_CLASSES_ROOT\Directory\Background\shell

1. 新建项 Terminal

2. 右键Terminal 新建项command

   - 编辑command默认选项值为：```${terminalpath}\wt.exe```

3. 编辑Terminal值

   - 编辑右键显示名称：默认值改为Open in terminal （不编辑则为新建项的名称）

   - 编辑右键显示图标：新建字符串值icon 添加：```${terminalicon}```

4. 编辑window terminal的json配置文件

    - 对应位置修改如下，"."即表示当前目录。

```json
    "profiles": 
    {
        "defaults": 
        {
            "startingDirectory" : "."
        },
    ...
    }
```

over