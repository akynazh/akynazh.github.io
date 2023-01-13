---
title: Docker软件安装记录
date: 2023-01-13T21:28:37+08:00
categories: [Tool]
tags: [docker]
slug: docker-software-installation-record
---

## Docker

```bash
curl -fsSL https://get.docker.com | bash -s docker
# curl -sSL https://get.daocloud.io/docker | sh
```

## Mirror

```bash
vim /etc/docker/daemon.json

{
  "registry-mirrors": [
          "https://docker.mirrors.ustc.edu.cn",
          "http://hub-mirror.c.163.com",
          "https://registry.docker-cn.com"
  ]
}

----------------------------------------------

systemctl restart docker
```

## Docker-compose

```bash
curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# curl -L https://get.daocloud.io/docker/compose/releases/download/v2.4.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# ln -s /usr/local/bin/docker-compose /usr/bin/dockerc
```

## 运行权限问题

```bash
sudo usermod -aG docker $USER
sudo reboot
```

## MySQL

```bash
docker pull mysql:5.7

docker run -p 3306:3306 \
--name mysqldb \
# --network form-team-talent-network \
-v /docker/mysql/conf:/etc/mysql/conf.d \
-v /docker/mysql/logs:/logs \
-v /docker/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=658766@Jzh \
-d mysql:5.7

docker exec -it 7904c6d2c6f8 /bin/bash
mysql -uroot -p
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**