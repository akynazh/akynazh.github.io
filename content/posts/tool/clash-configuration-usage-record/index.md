---
title: Clash-Linux配置使用记录
date: 2023-01-13T21:43:06+08:00
categories: [Tool]
tags: [proxy, ]
slug: clash-linux-configuration-usage-record
---
## 安装

```bash
wget https://github.com/Dreamacro/clash/releases/download/v1.11.8/clash-linux-amd64-v1.11.8.gz
gzip -d clash-linux-amd64-v1.11.8.gz
sudo mv clash-linux-amd64-v1.11.8 /usr/bin/clash
chmod +x /usr/bin/clash
```

## 获取订阅链接并配置

在自己使用的机场中获取clash订阅链接，然后下载配置文件到 `~/.config/clash/config.yaml`:

```bash
mkdir -p ~/.config/clash
cd ~/.config/clash
wget -O config.yaml {link}

vim config.yaml

# 不允许局域网中其它电脑使用该代理，以及设置clash管理界面密码。
allow-lan: false
secret: your password
```

## 运行代理并选择节点

```bash
# 第一次需要下载Country.mmdb，可考虑先运行以下命令
# clash -f ~/.config/clash/config.yaml

nohup clash -f ~/.config/clash/config.yaml >/dev/null 2>&1 &
```

登录clash管理界面进行网速的测试和节点的切换：

访问[clash.razord.top](http://clash.razord.top/)，设置Host为主机IP，端口默认为9090，密钥为刚刚配置的密码。

最后设置proxy环境变量，可通过alias进行配置以方便使用。

## 实现开机自启动

vim /etc/systemd/system/clash.service

```conf
[Unit]
Description=Clash Proxy

[Service]
WorkingDirectory=/root
ExecStart=/usr/bin/clash -f .config/clash/config.yaml >/dev/null 2>&1
Type=simple
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl start clash
systemctl status clash

systemctl enable clash
```

---

**From my blog: [akynazh](https://akynazh.site)**.

**Over.**
