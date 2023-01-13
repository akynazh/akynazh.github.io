---
title: SpringBoot邮箱服务
date: 2022-06-16T21:13:15+08:00
categories: [Web]
tags: [springboot]
slug: springboot-mailbox-service
---

## 一、导入依赖：

```xml
<!--发送邮件-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

## 二、配置文件：

QQ邮箱需要先开通好邮箱SMTP服务。

```yml
spring:
  # 邮件服务
  mail:
    password: xxxxxx
    username: xxx@qq.com
    host: smtp.QQ.com
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
    default-encoding: UTF-8
```

## 三、编写邮件服务

- `sendSimpleMailMessage()`实现只含普通文本信息的邮件发送
- `sendMimeMessage()`可以发送带附件的邮件


MailService.java

```java
@Service
public class MailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String SENDER;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // 发送普通邮件
    public void sendSimpleMailMessage(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(SENDER);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    // 发送带附件的邮件
    public void sendMimeMessage(String to, String subject, String content, String filePath) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        // true表示需要创建一个multipart message
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(SENDER);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);

        FileSystemResource file = new FileSystemResource(new File(filePath));
        String fileName = file.getFilename();
        helper.addAttachment(fileName, file);
        mailSender.send(message);
    }
}
```

## 四、编写验证码生成器

传入参数为验证码长度。

```java
public class VerifyCodeGenerator {
    public static String make(int length) {
        if (length <= 0) {
            throw new RuntimeException("验证码长度不能小于1");
        }
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}
```

## 五、Controller编写

接受用户输入的邮箱，并向该邮箱发送一个验证码；

检验用户输入的验证码，如果正确则放行。

```java
@RestController
@RequestMapping("/verify")
public class VerifyTest {
    private MailService mailService;
    @Autowired
    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/login/{email}/{code}")
    public String login(@PathVariable String email, @PathVariable String code, HttpSession session) {
        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(code)) {
            return "false";
        }
        String trueCode = (String)session.getAttribute("code");
        if (code.equals(trueCode)) {
            return "success";
        } else {
            return "fail";
        }
    }
    @PostMapping("/{email}")
    public String verify(@PathVariable String email, HttpSession session) {
        if (StringUtils.isEmpty(email)) {
            return "false";
        }
        String code = VerifyCodeGenerator.make(6);
        session.setAttribute("code", code);
        mailService.sendSimpleMailMessage(email, "Email Verify", "Your code: " + code);
        return email;
    }
}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**