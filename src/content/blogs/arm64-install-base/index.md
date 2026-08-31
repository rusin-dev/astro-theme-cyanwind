---
title: 在 arm64 中安装虚拟环境
publishDate: 2026-04-03
tags: [Git,Nodejs,教程]
description: 本文讲述了然如何在 arm64 系统上安装虚拟环境、NodeJs 和 Git。
category: tech
heroImage:
  src: https://image.rusin7.com/file/hexo/cover/Dpl8bPpL.webp
  color: "#53afa0"
---

## 安装虚拟环境

### 下载

下载指定版本:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-py312_24.7.1-0-Linux-aarch64.sh
```

如果官方源下载缓慢，可以试试**国内的清华镜像源**：

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-py312_24.7.1-0-Linux-aarch64.sh
```

运行安装脚本：

```bash
bash Miniconda3-py312_24.7.1-0-Linux-aarch64.sh
```

安装过程中，按照提示操作即可：
*   按 `Enter` 键阅读完许可协议。
*   输入 `yes` 接受协议。
*   按 `Enter` 键接受默认安装路径（`/home/user/miniconda3`）。
*   **关键一步**：按 Enter 后，安装程序会开始解压文件，然后在接近结束时，一定会问你一个问题，类似：
    ```text
    Do you wish the installer to initialize Miniconda3
    by running conda init? [yes|no]
    ```
    这是问你是否要初始化 Conda 时，务必输入 `yes` 并回车。

重新加载配置文件：

```bash
source ~/.bashrc
```

### 验证

**重新打开**终端，你会看到终端提示符前面出现了 (base)，这就表示安装成功了！

## 安装 Git

```bash
conda install git
```

### 验证 Git 安装

安装成功后，再次检查 Git 版本：

```bash
git --version
```

如果输出类似 `git version 2.x.x`，就表示安装成功了。

###  让 VS Code 识别 Git

```bash
which git
```
记下输出。

操作方法：

1. 在 VS Code 中按 `Ctrl + ,` 打开设置。
2. 在搜索框输入 `git.path`。
3. 找到 **“在 settings.json 中编辑”**（点击右上角的文档图标）。
4. 在 JSON 配置中添加（或修改）：
   ```json
   "git.path": "刚刚的输出"
   ```
5. 保存文件，**关闭 VS Code 再重新打开**。

## 安装 NodeJs

### 安装 nvm
运行以下代码（也可以自己从 [NodeJs 官网](https://nodejs.org/zh-cn/download) 获得）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

然后关闭再重新打开一个终端。

### 安装 Node.js

加载后，就可以使用 nvm 安装 Node.js 了。推荐以下两种方式：

1. LTS（长期支持）版本

  ```bash
  nvm install --lts
  ```

2. 安装最新的稳定版本

  ```bash
  nvm install node
  ```

最后输入

  ```bash
  npm install -g pnpm
  npm install -g yarn
  ```

### 验证

```bash
npm -v
pnpm -v
yarn -v
```
