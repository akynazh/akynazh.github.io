---
title: Quartz实现定时任务
date: 2022-06-15T21:11:27+08:00
categories: [Language]
tags: [java]
slug: quartz-implements-timed-tasks
---

## 一、添加注解

主启动类添加`@EnableScheduling`注解；

## 二、添加依赖：

```xml
<!--定时任务 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

## 三、创建任务

/TestTask1.java

```java
public class TestTask1 extends QuartzJobBean {
    @Override
    protected void executeInternal(JobExecutionContext context) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("Test1---" + sdf.format(new Date()));
    }
}
```

/TestTask2.java

```java
public class TestTask2 extends QuartzJobBean {
    @Override
    protected void executeInternal(JobExecutionContext context) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("Test2---" + sdf.format(new Date()));
    }
}
```

## 四、配置任务

/QuartzConfig.java

注意同组下同名任务不会重复执行。

- JobDetail：配置任务信息，生成任务
- Trigger：配置触发器信息，设置时间

```java
@Configuration
public class QuartzConfig {
    @Bean
    public JobDetail testJ1() {
        return JobBuilder.newJob(TestTask1.class).withIdentity("job1", "group").storeDurably().build();
    }
    @Bean
    public JobDetail testJ2() {
        return JobBuilder.newJob(TestTask2.class).withIdentity("job2", "group").storeDurably().build();
    } // "job2"如果为"job1"，则不会执行TestTask2而是执行TestTask1

    @Bean
    public Trigger test1() {
        SimpleScheduleBuilder ssb = SimpleScheduleBuilder.simpleSchedule().withIntervalInSeconds(59).repeatForever();
        return TriggerBuilder.newTrigger().forJob(testJ1())
                .withIdentity("trigger1", "group")
                .withSchedule(ssb)
                .build();
    }

    @Bean
    public Trigger test2() {
        return TriggerBuilder.newTrigger().forJob(testJ2())
                .withIdentity("trigger2", "group")
                .withSchedule(CronScheduleBuilder.cronSchedule("0/59 * * * * ?"))
                .build();
    }
}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**