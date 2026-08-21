<div align="center">
    <a href="./public/theme.svg"><img width="40%" alt="logo" src="https://cdn.luogu.com.cn/upload/image_hosting/uwxcg3ya.png" /></a>
    <h1><b>CyanWind | 青风</b></h1>
    <p><em>一个简单、轻量 astro 框架博客主题，加载快速，SEO 友好，开箱即用。</em></p>
    <p>
        简体中文 | <a href="https://github.com/rusin-dev/astro-theme-cyanwind/blob/main/README_en.md">English</a> | <a href="https://blog.rusin7.com">Demo</a>
    </p>
    <p>作者：<a href="https://github.com/ruying-suixing">如形</a></p>
    <p align="center">
        <a href="https://github.com/rusin-dev/astro-theme-cyanwind/blob/main/LICENSE"><img src="https://img.shields.io/github/license/rusin-dev/astro-theme-cyanwind" alt="License" /></a>
        <a href="https://github.com/rusin-dev/astro-theme-cyanwind/releases"><img src="https://img.shields.io/github/release/rusin-dev/astro-theme-cyanwind" alt="latest version" /></a>
        <a href="https://github.com/rusin-dev/astro-theme-cyanwind/releases"><img src="https://img.shields.io/github/downloads/rusin-dev/astro-theme-cyanwind/total?color=%239F7AEA&logo=github" alt="Downloads" /></a>
        <a href="https://github.com/rusin-dev/astro-theme-cyanwind/stargazers"><img src="https://img.shields.io/github/stars/rusin-dev/astro-theme-cyanwind" alt="Stars" /></a>
        <a href="https://github.com/rusin-dev/astro-theme-cyanwind/network/members"><img src="https://img.shields.io/github/forks/rusin-dev/astro-theme-cyanwind" alt="Forks" /></a>
        <a href="https://www.repostatus.org/#active"><img src="https://img.shields.io/badge/repo%20status-Active-Green" alt="Project Status: Active – The project has reached a stable, usable state and is being actively developed."></a>
        <a href="./"><img src="https://img.shields.io/badge/astro--theme-cyanwind-cyan" alt="theme">
        </a>
        <a href="./"><img src="https://img.shields.io/badge/version-2.0.0-blue?style=flat-square" alt="version"></a>
    </p>
</div>

一个现代化、功能丰富的 Astro 主题，专为个人博客和内容创作设计。采用 Astro、Tailwind CSS 和 TypeScript 构建，提供最佳的开发体验。

---

## ✨ 特性

- **🚀 性能优先** - 基于 Astro 构建，提供闪电般的静态网站生成速度
- **🎨 精美设计** - 简洁现代的 UI 设计，Tailwind CSS 驱动，支持深色模式
- **📝 MDX 支持** - 使用 Markdown 编写内容并嵌入组件
- **🔍 全文搜索** - 内置 Pagefind 搜索功能
- **💬 评论系统** - 集成 Waline 评论系统
- **📊 博客统计** - 跟踪写作统计数据
- **🏷️ 标签分类** - 通过标签和学术分类组织内容
- **🔗 友情链接** - 展示和管理友情链接
- **📱 响应式设计** - 完全适配所有设备
- **🌐 多语言支持** - 支持中英文双语
- **📱 社交分享** - 支持分享到微博、X 和 Bluesky
- **🎯 SEO 优化** - 网站地图、RSS 订阅、结构化数据
- **⚡ 图片优化** - 使用 Sharp 自动优化图片
- **🧮 数学公式** - 支持 KaTeX 数学公式
- **🎀 易于定制** - 灵活的主题配置选项

---

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- pnpm (推荐) 或 npm

### 安装步骤

1. **克隆仓库**

   ```bash
   # npm 7+
   npm create astro@latest cyanwind-blog -- --template rusin-dev/astro-theme-cyanwind

   # 或 pnpm（用 npm install -g pnpm 安装）
   pnpm dlx create-astro cyanwind-blog --template rusin-dev/astro-theme-cyanwind
   
   cd cyanwind-blog
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **配置网站**

   编辑 `src/site.config.ts` 进行自定义:
   - 网站标题和作者信息
   - 导航菜单
   - 个人信息和社交链接
   - 主题设置和集成选项

4. **启动开发服务器**

   ```bash
   pnpm dev
   ```

   访问 `http://localhost:3000` 查看你的网站

5. **生产构建**

   ```bash
   pnpm build
   ```

---

## 📖 可用命令

| 命令 | 说明 |
| :------: | :------: |
| `pnpm dev` | 启动开发服务器，自动重载 |
| `pnpm dev:force` | 强制重启开发服务器 |
| `pnpm dev:check` | 开发服务器 + TypeScript 检查 |
| `pnpm build` | 生产环境构建 |
| `pnpm preview` | 预览生产构建结果 |
| `pnpm check` | 运行 TypeScript 类型检查 |
| `pnpm lint` | 代码检查并自动修复 |
| `pnpm format` | 使用 Prettier 格式化代码 |
| `pnpm quality` | 运行所有代码质量检查 |
| `pnpm sync` | 同步 Astro 内容集合 |
| `pnpm clean` | 清理构建产物 |
| `pnpm new "name"` | 新建文章（`pnpm new -h` 查看详细信息） |

---

## 🛠️ 配置

### 主配置文件: `src/site.config.ts`

#### 基础设置

```typescript
export const theme: ThemeUserConfig = {
  title: "你的博客标题",
  titleEn: '你的英语博客标题',
  author: "你的名字",
  author: "你的英文名",
  description: "博客描述",
  descriptionEn: "博客英文描述"
  favicon: "/favicon/favicon.ico",
  locale: { /* 语言和日期设置 */ }
}
```

#### 导航菜单

```typescript
header: {
  menu: [
    { title: '文章', titleEn: 'Articles', link: '/article' },
    { title: '学术', titleEn: 'Academic', link: '/academic' },
    // 添加更多菜单项...
  ]
}
```

#### 集成功能

```typescript
export const integ: IntegrationUserConfig = {
  pagefind: true,      // 启用搜索
  waline: { enable: true }, // 启用评论
  // 更多集成选项...
}
```

具体如何配置 waline 评论，参见[官方文档](https://waline.js.org)。

查看 `src/site.config.ts` 了解完整的配置选项。

---

## 📁 项目结构

```text
.
├── src/
│   ├── assets/           # 图片和静态资源
│   ├── components/       # 可复用的 Astro 组件
│   ├── content/          # Markdown 内容文件
│   ├── layouts/          # 页面布局
│   ├── pages/            # 路由页面
│   ├── schemas/          # 内容集合 Schema
│   ├── site.config.ts    # 主配置文件
│   └── types/            # TypeScript 类型定义
├── public/               # 静态文件
├── astro.config.mjs      # Astro 配置
├── tailwind.config.mjs   # Tailwind CSS 配置
└── package.json          # 项目依赖
```

---

## 📝 内容组织

### 博客文章

在 `src/content/` 中放置博客文章或者使用 `pnpm new "title"` | `pnpm new -l en "title"` 新建以 `title` 为题的 markdown 文章，详见 `pnpm new -h` | See `pnpm new -h en`，使用以下 frontmatter 格式（`pnpm new` 可以自动生成 `publishDate`）：

```markdown
---
title: "文章标题"
publishDate: 2024-01-01
tags: [标签1, 标签2]
description: "文章描述"
category: (可选)
heroImage: #头图
  src: (可选)
  color: "#7da7d4" (可选)
---

你的内容在这里...
```

### 页面类型

- **文章** - 主要博客文章 (`/article`)
- **学术** - 学术内容 (`/academic`)
- **项目** - 项目展示 (`/projects`)
- **友链** - 友情链接管理 (`/links`)
- **关于** - 关于页面 (`/about`)
- **标签** - 标签页面（`/tags`）

自定义请在 ./src/pages 中更改，也可以提交 PR。

---

## 🎨 自定义

### 主题与样式

- 在 `tailwind.config.mjs` 中自定义 Tailwind CSS
- 在 `src/components/` 中修改组件样式
- 在 `src/site.config.ts` 中通过 `customCss` 选项添加自定义 CSS

### 添加自定义页面

1. 在 `src/pages/` 中创建新的 `.astro` 或 `.md` 文件
2. 使用 `src/layouts/` 中的相应布局
3. 文件会自动生成对应的路由

---

## 🔗 部署

本主题支持多个部署平台:

### Vercel

```bash
pnpm build:vercel
```

### Cloudflare Pages

```bash
pnpm build:cloudflare
```

### GitHub Pages

```bash
pnpm build:github
```

### 静态托管

```bash
pnpm build
# 输出在 `dist/` 目录
```

---

## 🔧 技术栈

- **框架:** [Astro 7.2+](https://astro.build)
- **样式:** [Tailwind CSS 3](https://tailwindcss.com)
- **语言:** [TypeScript 5](https://www.typescriptlang.org)
- **内容:** MDX 和 Markdown 支持
- **搜索:** [Pagefind](https://pagefind.app)
- **评论:** [Waline](https://waline.js.org)
- **代码高亮:** [Shiki](https://shiki.matsu.io)
- **数学公式:** [KaTeX](https://katex.org)
- **图标:** [Simple Icons](https://simpleicons.org)
- **图片处理:** [Sharp](https://sharp.pixelplumbing.com)

---

## 📦 核心依赖

| 包名 | 用途 |
|------|------|
| `astro` | 静态网站生成器 |
| `@astrojs/mdx` | MDX 集成 |
| `tailwindcss` | 实用优先的 CSS 框架 |
| `typescript` | 类型安全 |
| `@pagefind/default-ui` | 全文搜索 |
| `@waline/client` | 评论系统 |
| `shiki` | 语法高亮 |
| `rehype-katex` | 数学公式支持 |

---

## 🤝 贡献指南

欢迎贡献！请自由提交 Issue 和 Pull Request。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证。详见 LICENSE 文件。

---

## 🙏 致谢

- 基于 [Astro](https://astro.build) 构建
- 样式由 [Tailwind CSS](https://tailwindcss.com) 驱动
- 评论系统由 [Waline](https://waline.js.org) 提供
- 搜索功能由 [Pagefind](https://pagefind.app) 提供

---

## 📞 支持与联系

- **作者:** 如形 (Rusin)
- **GitHub:** [ruying-suixing](https://github.com/ruying-suixing)
- **邮箱:** [i@rusin7.com](mailto:i@rusin7.com)
- **网站:** [https://blog.rusin7.com](https://blog.rusin7.com)

---

**用 ❤️ 由 Rusin 制作**

