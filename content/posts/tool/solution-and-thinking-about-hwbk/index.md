---
title: 关于hwbk文件问题的解决和思考
date: 2022-10-03T20:52:12+08:00
categories: [Tool]
tags: [android]
slug: solution-and-thinking-about-hwbk
---

## hwbk文件问题

假如你知道hwbk是什么，那么你肯定为它的存在而烦恼过。

在华为系的机子上，任何第三方工具想要删除相册的一张图片，系统都会做出保护，你使用的第三方工具并没有真的删除那张图片，系统拦截了删除操作并再对文件添加后缀名.hwbk。

---

更新：现在只要不卸载系统图库，系统会拦截第三方软件的删除操作，并将删除的照片送进图库的回收站，并不会生成hwbk文件。如果卸载了系统自带图库，则可以参考本文。

## 其它类似的问题

还有一个例子就是默认桌面程序了，第三方软件nova launcher比系统自带的桌面程序好用得多，而实际上却完全无法使用，因为默认程序无法修改，系统直接锁死。

同时，现在华为系的机子，只要是Android8以后的，似乎已经再也无法解开bootloader锁，官方不再给你申请的机会了，获取root，刷机已经成为一种幻想。

## 如何看待这些问题

商家总会告诉你这是处于安全保护的考虑，可以防止你误删了东西。其实完全没有必要，第三方软件也有回收站功能，只要自己注意不要安装来路不明的软件，病毒也不会莫名其妙找上门。

他不会给你一个选项，删除是否做出hwbk保护，而是直接强行做出保护，拒绝第三方的删除，这就等同于直接废了第三方软件的删除功能。这让许多人不得不使用系统自带软件，否则就是两头跑，这边删了，再到系统自带软件删一次。

你可以说这是为了更好的安全性用户所必须做出的牺牲，但也可以说这只是商家为了利益而主动选择的一种控制用户的手段。

从本质上看，无疑是一种很单纯的商业考量。他们让自己的系统封闭起来，强行让用户推动，发展自己的生态。

如果华为自带的软件够好，我想慢慢地，用户也会主动选择自带的软件（就像apple一样）。他们不是从自身找问题，改善自己的产品，而是强迫用户去适应，剥夺自由选择的权力。

如果是为了安全方面的问题，我想，一定也不只有这种一刀切的手段吧？对于安全方面的问题，我觉得应该让用户自己做决定，自己负责。就像有的人想获取root权限，他首先应该已经明白了获取root的后果是什么，愿意承担相应的风险。

**为用户体验着想，绝不是强迫用户干什么，而是让用户自己决定干什么。**

然而，他们凭什么为用户体验着想，能赚到钱不就完了？呵呵。

当然，对于大多普通用户而言，或许从来都遇不到这些问题，但是当有一天你遇到这些问题并为之困扰时，你多少会感觉自由被剥夺了。毕竟，我们自己花钱买的东西，为什么不能让我们自己自由支配呢？

## 通过adb干掉系统自带软件

1. 电脑安装adb kits，adb所在目录加入环境变量（只是为了方便使用）
2. 手机加入开发者模式
3. 手机连接电脑，开启usb调试
4. 命令行运行：`adb devices`
5. 运行：`adb shell` 
6. 获取软件包名，写入applist.txt：`pm list packages > applist.txt`
7. 通过包名卸载软件：`pm uninstall --user 0 {pkg_name}`（包名可自行google）

这是一个可选项，在你很反感系统自带软件时可以进行操作。

下面，回到hwbk问题。

## 让脚本帮我们自动消灭hwbk吧

假设你使用的是第三方的图库或者文件管理器，为了安全的考量，建议开启第三方软件的回收站。

当存在大量hwbk文件时，一个个手动删除是不存在的，而且每天都可能产生新的hwbk，所以定时地进行扫描删除也是必要的。

另外，通过尝试，将.hwbk后缀进行更改即可删除该文件。

通过脚本可以方便地进行操作，这里我通过js完成工作。

## 使用javascript进行删除操作

做法：每天固定一个时间（建议是在自己睡觉时）完成自动的清除。对所有目标文件夹进行扫描（递归性地），如果找到了.hwbk文件，将其后缀重命名为.hwbk.fuck_hwbk，再执行删除操作即可。

kill_hwbk.js

```js
function kill_hwbk_r(parent_dir) {
    let child_dirs = files.listDir(parent_dir, function(name) {
        return files.isDir(files.join(parent_dir, name));
    });
    let hwbk_files = files.listDir(parent_dir, function(name) {
        return name.endsWith('.hwbk') && files.isFile(files.join(parent_dir, name));
    });
    child_dirs = child_dirs.map(String);
    hwbk_files = hwbk_files.map(String);
    for (let hwbk_file of hwbk_files)
        kill_hwbk(files.join(parent_dir, hwbk_file));
    for (let child_dir of child_dirs) 
        kill_hwbk_r(files.join(parent_dir, child_dir));
}

function kill_hwbk(old_name) {
    new_name = old_name + '.fuck_hwbk';
    files.move(old_name, new_name);
    console.log('remove ' +  old_name +  ' -> ' + files.remove(new_name));
    kill_count++;
}

function main(dirs) {
    console.log('[kill_hwbk.js] start');
    for (let dir of dirs)
        kill_hwbk_r(dir);
    console.log('[kill_hwbk.js] end, kill count: ' + kill_count)
    kill_count = 0;
}

let kill_count = 0;
// dirs: 需要清除hwbk的目录（递归性的）
main(dirs=[
    '/sdcard/Pictures',
    '/sdcard/Video',
    '/sdcard/DCIM',
    // ......
])
```

手机安装hamibot或者autojs，即可运行该脚本，接着可以在软件中设置定时任务，定时运行该脚本。

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**