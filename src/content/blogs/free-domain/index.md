---
title: 免费获取二级域名并部署 github 仓库
description: 本教程介绍了如何免费给博客获取域名，并提供了注册、获取、托管详细步骤及技术支持方式。教程的内容针对新 UI 进行更新，配图丰富。
publishDate: 2026-03-23 21:14:10
category: tech
---

## 前提

拥有一个 [Github](https://github.com) 的账号和博客仓库。

## 领取域名

### 注册

#### Github

前往 {% btn 'https://github.com/signup',Github,anzhiyufont anzhiyu-icon-circle-arrow-right,purple larger %} 注册账号。

#### DigitalPlat Domains

前往 {% btn 'https://dash.domain.digitalplat.org/signup?ref=uGQR48cE9B',Digitalplat,anzhiyufont anzhiyu-icon-circle-arrow-right,purple larger %}  注册账号，完整人名、电话号码、完整地址等信息不用填写真实的，可以在 [美国身份生成器](https://www.meiguodizhi.com/) 生成。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/2.png)
注册完成后会发一封验证到邮箱。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/3.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/4.png)
登录后需要 KYC 验证（使用 Github 账号即可）。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/5.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/6.png)
验证成功后会显示这个页面。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/7.png)

### 获取

书接上回，点击左侧 <kbd>注册</kbd>。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/8.png)

{% tip error %}~Digitalplat 于 2026/3/20（文章发布约一周后） 左右更新 UI 和页面交互，文章中获取部分截图为旧版，可能无法对应位置，但操作基本相同。~{% endtip %}
{% tip fa-atom, sync %}UppubDatetime: 本文章已更新至最新。{% endtip %}

{% link 旧版存档,点击查看旧版,https://life.rusin7.com/post/dpdns-org/ %}

{% link DigitalPlat Domains 仪表盘,下滑找到我的域名统计-最大允许域名数,https://dash.domain.digitalplat.org/dashboard %}

下滑找到我的域名统计-最大允许域名数，正常是 $2$ 个，如果你开始没按我的教程注册是 $1$ 个。

![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/9.png)
{% note info flat %}
每个账户理论上可以注册 $3$ 个免费的 dpdns.org 域名。
- 第 $2$ 个需要在注册时， <kbd>Referral code</kbd> 填 `uGQR48cE9b` 或 `QFFXW3uiRm`，如果按前面我的教程一步步注册，可以默认拥有 $2$ 个，再 star 一下获得第 $3$ 个。
- 第 $3$ 个需要给他们的 Github 项目 star，点击验证通过后就可以，验证不难。
{% endnote %}
- 登录 Github。
- {% btn 'https://github.com/DigitalPlatDev/FreeDomain',访问仓库,anzhiyufont anzhiyu-icon-circle-arrow-right %}。
- 点击右上角 <kbd>⭐“Star”</kbd>。
- 点击 {% btn 'https://dash.domain.digitalplat.org/auth/kyc/github',这里,anzhiyufont anzhiyu-icon-circle-arrow-right %}。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/10.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/11.png)
https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/sourcehttps://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/12.png
***

<span>
点击 {% btn 'https://dash.domain.digitalplat.org/panel/main?page=%2Fpanel%2Fregister',注册,anzhiyufont anzhiyu-icon-circle-arrow-right,pink larger %}，填写想注册的域名。
</span>

![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/12.png)
如果被占用，可以换个域名试试，被占用图片：
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/13.png)
红框中的 *Name Server1，\*Name Server2先填 `1.com` 和 `2.com`，等会儿可以修改。未被占用图片：

![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/14.png)
域名注册成功后会显示这个页面。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/15.png)

## 托管到 CF

### 登录

用 Github [登录 Cloudflare](https://dash.cloudflare.com/login)。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772802324633.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772802412422.png)

### 添加

点击添加站点（Onboard a domain）。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772802648682.png)
选择免费版继续。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772804243558.png)
类型选择 CHAME，名称填写 `@` ，目标填写 Github page 地址（username.github.io，将 username 替换为你的 Github 用户名），点击保存（Save）。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772804929713.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772804934072.png)
保存后效果如下图。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772805054433.png)
点击底部蓝色 继续激活 按钮。

### 修改 Name Server

回到[注册域名的网站](https://dash.domain.digitalplat.org/domains)，点击刚刚的域名，下滑页面，找到原来是 1.com 和 2.com 的 Name server。在 Cloudflare 页面点击 <kbd>显示名称服务器指令</kbd> （ `Show nameserver instructions` ） 依次点击 Click to copy 按钮并依次复制到刚刚的域名的 Name server 1 和 Name server 2，修改后继续在注册域名的网站点击 `更新名称服务器` （ `UppubDatetime nameservers` ），成功后效果如下图。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/16.png)

### 检查

回到 Cloudflare，点击 `现在就检查名称服务器` （ `Check nameservers now` ）。
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772848750931.png)
域名注册商可能需要 $3$ 分钟 $\sim 24$ 小时来处理 Nameserver 的更新，当你的网站在 Cloudflare 上激活后，你会收到一封邮件通知。
你也可以保留 Cloudflare 页面，当显示如下两图时，说明检查成功了。

![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772851053998.png)

<center>单个域名概述页面</center>

![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772851718121.png)
![截屏](https://jsd.liiiu.cn/gh/ruying-suixing/blog/themes/hexo-theme-anzhiyu-1.7.1/source/img/2026/46209/1772851759034.png)

<center>所有域名管理页面</center>

## 结语

可以愉快地享用Cloudflare的服务了！
祝大家打造出品牌化的个人博客，为平凡的生活添彩！
