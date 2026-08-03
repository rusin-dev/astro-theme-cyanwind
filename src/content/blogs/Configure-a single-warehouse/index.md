---
title: 对单一仓库配置小号以远程管理小号仓库
description: 命令行操作给这个仓库单独设置小号仅本地生效把远程地址绑定到小
publishDate: 2026-04-20 21:16:59
tags: [VS code,Git]
---

## 命令行操作

- 给这个仓库单独设置小号（仅本地生效）

    ```bash
    git config --local user.name "用户名"
    git config --local user.email "邮箱"
    ```

- 把远程地址绑定到小号仓库

    ```bash
    git remote set-url origin https://github.com/用户名/仓库名.git
    ```

- 推送（第一次会让你登录小号）

    ```bash
    git push -f origin main
    ```

## 登录时怎么填？

弹出窗口时：
**使用 SSH 登录**

在输入框中填入在 [这里](https://github.com/settings/tokens/new) 创建的 SSH 密钥（权限建议仅 Repo）。

***

> ## 最终效果（最舒服的状态）
>
> - 全局 Git = 大号
> - 其他所有仓库 = 大号
> - 只有特定文件夹 = 小号

{% note blue 'anzhiyufont anzhiyu-icon-bullhorn' modern %}永远不用再切换账号{% endnote %}
