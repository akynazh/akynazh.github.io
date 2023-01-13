---
title: Linux上部署JAR包项目后的文件上传问题
date: 2021-11-03T00:38:12+08:00
categories: [OS]
tags: [java, linux]
slug: file-upload-problem-after-deploying-jar-package-project-on-linux
---

在进行上传文件时，一般会先获取项目类路径：

```java
File relativePathFile = new File(URLDecoder.decode(ResourceUtils.getURL("classpath:").getPath(), "utf-8"));
String absolutePath = relativePathFile.getAbsoluteFile().getPath();
```

首先取得相对路径，再进一步取得绝对路径，结果如下：

- 如果单纯运行一个java项目：

获得路径为：

```${project}/target/classes```

- 如果是运行jar包，且是在Linux系统上，则获得路径大致为：

```.../${jar包名}!/BOOT-INF/classes!```  [centos7.9下]

所以如果是jar包启动并上传文件，则无法正确放到类路径下。

所以需指定新的上传路径。

在如下路径中：

```bash
[root@VM-0-11-centos app]# ls
application.yaml  LonersHub-0.0.1-SNAPSHOT.jar static
```

假设我要把文件上传到和jar包同一路径下的static内, 可以在jar包同一路径下新建并编辑application.yaml文件如下：

```java
spring:
    resources:
        static-locations:
            - classpath:static/
            - file:/app/static/
```

然后在文件上传是指定上传路径即可。

这里编写一个工具类如下：

关注getUploadPath方法，它用于获取上传路径。

首先，为了方便后期维护和部署使用，我们先判断项目运行所在的操作系统，如果是生产环境linux则上传到上面指定的目录，而如果是本地测试项目，则将其上传到类路径下的默认位置即可。

比如，要上传一个头像：

- linux下：

返回```/app/static/${uploadType}/${fileName}```

e.g. ```/app/static/avatar/test.jpg```

- window下：

返回 ```${project}/target/classes/static/${uploadType}/${fileName}```

e.g. ```${project}/target/classes/static/avatar/test.jpg```

```java
public class FileUtils {

    /**
     * @description: 获取上传路径
     * @author Jiang Zhihang
     * @date 2022/1/2 23:32
     * @param type 上传类型，如avatar，video
     * @param fileName 上传文件的名称
     */
    public static String getUploadPath(String type, String fileName) throws FileNotFoundException, UnsupportedEncodingException {
        String osName = System.getProperty("os.name");

        if (osName.equals("Linux")) { // 部署于Linux主机上时获取的上传路径
            // 返回/app/static/${uploadType}/${fileName}
            // e.g. /app/static/avatar/test.jpg
            return File.separator + "app/static/" + type + "/" + fileName;
        } else {
            // 获取上传地址
            File relativePathFile = new File(URLDecoder.decode(ResourceUtils.getURL("classpath:").getPath(), "utf-8"));
            String absolutePath = relativePathFile.getAbsoluteFile().getPath();
            // 获取得路径为：
            // ${project}/target/classes
            // 或
            // /root/file:/root/${jar包名}!/BOOT-INF/classes!  [centos7.9下]

            // 返回 ${project}/target/classes/static/${uploadType}/${fileName}
            // e.g. ${project}/target/classes/static/avatar/test.jpg
            return absolutePath + "/static/" + type + "/" + fileName;
        }
    }

    /**
     * @description: 获取文件后缀名
     * @author Jiang Zhihang
     * @date 2022/1/2 23:37
     */
    public static String getFileType(MultipartFile file) {
        String type = file.getContentType();
        String fileType;
        if (type == null) return null;
        else {
            // type -> img/jpg
            fileType = type.substring(type.indexOf('/') + 1);
            return fileType;
        }
    }
}

```

OVER.