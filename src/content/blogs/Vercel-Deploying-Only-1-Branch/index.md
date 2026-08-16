---
title: Vercel 仅部署指定分支的方法
description: 如何指定特殊分支？ 从中选择的项目，在侧边栏中打开Settings
publishDate: 2026-05-12 20:55:55
tags: [Git]
category: tech
---

## 如何指定特殊分支

1. 从[仪表板](https://vercel.com/dashboard)中选择的项目
2. 在侧边栏中打开 Settings。
3. 点击 Environments。
4. 点击 Production 环境（/settings/environments/production）。

{% tip cogs %}这样配置之后，Vercel 仍然会在任一分支更改时自动构建，结果当然是 {% label Error red %} 了！怎么办呢？{% endtip %}

## 使用分支跟踪（推荐）

最直接的方法是在项目设置中配置分支跟踪。默认情况下，Vercel 会在所有分支上触发部署，但可以指定 {% label main red %} red %} 分支作为生产环境分支，这样只有 {% label main red %} 分支的变更才会触发生产部署。

开启分支跟踪非常简单，按照以下步骤操作：

1. 从[仪表板](https://vercel.com/dashboard)中选择的项目
2. 在侧边栏中打开 Settings。
3. 点击 Environments。
4. 点击 Production 环境（/settings/environments/production）。
5. 在 Branch Tracking 中，输入想要追踪的分支名称，例如 {% label main red %}。
6. 点击 `Save`。

  <!-- ![alt text](/img/2026/Vercel-仅部署指定分支的方法/image.png) -->

还可以在 Preview 环境（/settings/environments/preview）中关闭 Branch Tracking。这样就可以确保只有 {% label main red %} 分支的变更才会触发任何构建。

## 使用 git 配置

在项目根目录的 `vercel.json` 文件中添加 `git.deploymentEnabled` 配置，精确控制哪些分支可以触发部署：

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

## 使用忽略构建步骤

如果需要更灵活的控制，可以在项目设置的“忽略构建步骤”部分使用自定义 Bash 脚本：

```bash
#!/bin/bash
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  exit 1  # 继续构建
else
  exit 0  # 跳过构建
fi
```
