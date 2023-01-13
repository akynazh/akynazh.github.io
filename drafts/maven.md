## 下载依赖

加入pom.xml所在目录：

```
mvn dependency:sources
```

## 生成jar包

```
# mvn clean
mvn package
```

## 指定jar包名称

```xml
<build>
    <!-- 指定jar包包名 -->
    <finalName>form-team-talent</finalName>
</build>
```