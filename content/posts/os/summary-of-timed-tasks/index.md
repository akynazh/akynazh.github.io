---
title: 关于定时任务的总结
date: 2022-10-03T17:22:29+08:00
categories: [OS]
tags: [crontab, schtasks]
slug: summary-of-timed-tasks
---

## Linux下的定时任务

### 规则

`*/1 * * * * cmd`

5个单元：

分钟（0-59） 小时（0-23  日期（1-31） 月份（1-12） 星期几（0-6，其中0代表星期日）

### 例子

每分钟执行一次：`* * * * * cmd`

或者：`*/1 * * * * cmd`

每天早上6点10分执行一次：`10 6 * * * cmd`

每两个小时执行一次：`0 */2 * * * cmd`

在1月1日早上4点执行一次：`0 4 1 1 * cmd`

### 注意事项

一、crontab不会使用在.bashrc之类的文件中定义的变量。

解决方法：

1. 若为python脚本，可以通过`os.environ.get('{env}')在脚本中访问变量；
2. 若为shell脚本，可以在脚本中执行`source {your_env_file}`;
3. 类似于2，可以在crontab语句中执行`source {your_env_file}`。

二、crontab用户配置位于：/var/spool/cron/{用户名}

可见，每个用户对应一个crontab配置，所以在crontab语句中使用~是可以的。

三、crontab日志位于：/var/log/cron

## Windows下的定时任务

### 规则

```
SCHTASKS /parameter [arguments]

Parameter List:
    /Create         Creates a new scheduled task.

    /Delete         Deletes the scheduled task(s).

    /Query          Displays all scheduled tasks.

    /Change         Changes the properties of scheduled task.

    /Run            Runs the scheduled task on demand.

    /End            Stops the currently running scheduled task.

    /ShowSid        Shows the security identifier corresponding to a scheduled task name.

    /?              Displays this help message.
```

查询某个操作的具体用法：

```
schtasks /create /?

SCHTASKS /Create [/S system [/U username [/P [password]]]]
    [/RU username [/RP password]] /SC schedule [/MO modifier] [/D day]
    [/M months] [/I idletime] /TN taskname /TR taskrun [/ST starttime]
    [/RI interval] [ {/ET endtime | /DU duration} [/K] [/XML xmlfile] [/V1]]
    [/SD startdate] [/ED enddate] [/IT | /NP] [/Z] [/F] [/HRESULT] [/?]

    ...
```

### 例子

**一、每30分钟运行一次：**

`schtasks /create /sc minute /mo 30 /tn "{task_name}" /tr "{task}"`

阅读可知：

/sc，指定频率的单位：

```
/SC   schedule     Specifies the schedule frequency.
                    Valid schedule types: MINUTE, HOURLY, DAILY, WEEKLY,
                    MONTHLY, ONCE, ONSTART, ONLOGON, ONIDLE, ONEVENT.
```

/mo，在/sc的基础上，指定大小（可以的情况下使用，如MINUTE可以，而ONSTART不可以）：

```
Modifiers: Valid values for the /MO switch per schedule type:
    MINUTE:  1 - 1439 minutes.
    HOURLY:  1 - 23 hours.
    DAILY:   1 - 365 days.
    WEEKLY:  weeks 1 - 52.
    ONCE:    No modifiers.
    ONSTART: No modifiers.
    ONLOGON: No modifiers.
    ONIDLE:  No modifiers.
    MONTHLY: 1 - 12, or
             FIRST, SECOND, THIRD, FOURTH, LAST, LASTDAY.

    ONEVENT:  XPath event query string.
```

/tn，即“task name”，注意是unique的，不能与其它任务重名。

/tr，即“task run”，指定任务，即一个可执行的程序，如exe，bat。


**二、开机启动程序**

需要通过管理员模式运行以下命令：

`schtasks /create /tn "{task_name}" /sc onlogon /tr "{task}"`

**三、每天22:00:00执行一次**

`schtasks /create /tn "{task_name}" /sc daily /st 22:00:00 /tr "{task}"`

阅读可知：

/st，用于指定执行的具体时刻：

```
/ST   starttime    Specifies the start time to run the task. The time
                    format is HH:mm (24 hour time) for example, 14:30 for
                    2:30 PM. Defaults to current time if /ST is not
                    specified.  This option is required with /SC ONCE.
```
**四、删除定时任务**

`schtasks /delete /tn "{task_name}"`

由于任务名是唯一的，所以通过/tn指定任务名即可删除任务。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**