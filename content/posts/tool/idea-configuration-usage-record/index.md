---
title: IDEA配置使用记录
date: 2022-01-13T21:46:42+08:00
categories: [Tool]
tags: [software]
slug: idea-configuration-usage-record
---

## 控制台中文乱码解决

1. 菜单栏HELP->Edit Custom VM OPtions中加 `-Dfile.encoding=utf-8`
2. 重启idea

## IDEA开启RunDashboard

```xml
# .idea/workspace.xml

<component name="RunDashboard">
    <option name="configurationTypes">
        <set>
            <option value="SpringBootApplicationConfigurationType" />
        </set>
    </option>
</component>
```

## IDEA关闭拼写

```
Settings -> Editor -> Inspection -> Proofreading -> 关闭Typo
```

## IDEA配置快捷输入

```
editor -> live template
```

## IDEA常用快捷键

```
alt + ctrl + L : 格式化

ctrl + shift + r : 替换字符

ctrl + r : 在当前文件中替换字符

ctrl + shift + n : 搜索项目文件

ctrl + f : 在当前文件下搜索字符

ctrl + shift + t : 进行快捷抛异常

alt + 上下键 : 光标移到下或上一层
```

## 禁用 double shift

对于2021.2.2之前的版本，方法如下：

`Ctrl+Shift+A` (Mac下为 `Comand+Shift+A`) => 输入 `Registry` => 找到 `"ide.suppress.double.click.handler"` 并勾选，再 Apply 即可。

对于2021.2.2及之后的版本，可以这么做：

菜单栏依次点击 File => Settings => Advanced Settings => User Interface => 勾选 `"Disable double modifier key shortcuts"`，或者打开设置之后搜索 disable，可快速定位。

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**