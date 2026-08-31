---
title: 在 Hexo 中复现洛谷插件
description: 前言OIer都知道，洛谷中有个，非常好用，效果如下：succ
tags: [Hexo,安知鱼美化]
publishDate: 2026-06-07
category: tech
---

## 前言

OIer 都知道，洛谷中有个 [Markdown 插件](https://www.luogu.com.cn/article/70w8j2pj "插件 README")，非常好用，效果如下：

:::info[这是一个提示]
我是提示内容。
:::

:::::warning[我是父容器]

我是一些文字。

::::success[我是子容器 1]{open}
我是内容 1。
::::

我是一些文字。

::::success[我是子容器 2]{open}
:::error[我是子容器 3]{open}
我是内容 2。
:::
::::

我是一些文字。

:::::

:::epigraph[——otto]
大家好啊，我是说的道理。
:::

:::align{left}
居左内容。
:::

:::align{center}
居中内容。
:::

:::align{right}
居右内容。
:::

源码：

```markdown
:::info[这是一个提示]
我是提示内容。
:::

:::::warning[我是父容器]

我是一些文字。

::::success[我是子容器 1]{open}
我是内容 1。
::::

我是一些文字。

::::success[我是子容器 2]{open}
:::error[我是子容器 3]{open}
我是内容 2。
:::
::::

我是一些文字。

:::::

:::epigraph[——otto]
大家好啊，我是说的道理。
:::

:::align{left}
居左内容。
:::

:::align{center}
居中内容。
:::

:::align{right}
居右内容。
:::
```

还有更多……

尽管 [安知鱼主题](https://docs.anheyu.com) 自带很多 [标签外挂](https://hexo.anheyu.com/posts/d50a.html)，但仍然无法满足~~复制洛谷文章到博客~~编写习惯性的需求，于是，我**全网首发**了在 Hexo 中使用洛谷 Md 插件教程。

:::info[闲话]
由于~~不良~~习惯，我的所有 Markdown 文章编写均遵循洛谷的 [专栏全站推荐规范](https://help.luogu.com.cn/rules/academic/article-standard)、[洛谷主题库题解规范](https://help.luogu.com.cn/rules/academic/solution-standard)和[如何用 Markdown 和 LaTeX 写一篇排版整齐的题解？](https://help.luogu.com.cn/rules/academic/guide/solution)
:::

## 方法

:::align{center}
知其然，知其所以然
:::

用 Javasript 自定义 Hexo 的 markdown 解析，用正则匹配把标识等进行匹配，转换为 Html，最后由 Css 完成样式。

## 实现

:::warning{open}
本教程以 anzhiyu 主题为例，其他主题亦可，视情况更改 Css 文件目录和引用方式，~~参见你的博客主题的文档~~*以后可能会更新*下这篇文章，搞个多主题支持。
:::

首先，在博客中新建 Css （`~/themes/···（主题名称）/source/css/custom_marked.css`）粘贴以下代码并引入（Anzhiyu 主题可以在 config.yml 中的 Inject.head 配置项中引入）。

```css
.align-left {
  text-align: left !important;
}

.align-center {
  text-align: center !important;
}

.align-right {
  text-align: right !important;
}

.epigraph {
  width: 40%;
  margin-left: 60%;
}

.epigraph > :last-child {
  margin-top: 0;
  border-top: 1px solid #888;
  text-align: right;
}

summary {
  list-style: none;
  -webkit-user-select: none;
  user-select: none;
  outline: 0;
  margin: 0;
  position: relative;
  padding-left: 24px;
  font-weight: 700;
  list-style: none;
  display: list-item;
  min-height: 1em;
}

.foldable {
  padding: 0.5em 1em;
  margin: 1em 0 1em 0.2em;
  border-left-width: 5px;
  border-left-style: solid;
  overflow: hidden;
}

.foldable.info {
  border-left-color: rgb(52, 152, 219);
}

.foldable.warning {
  border-left-color: rgb(255, 193, 22);
}

.foldable.success {
  border-left-color: rgb(82, 196, 26);
}

.foldable.error {
  border-left-color: rgb(231, 76, 60);
}

.foldable.bug {
  border-left-color: rgb(231, 76, 60);
}

.foldable.flask {
  border-left-color: rgb(155, 89, 182);
}

details.info > summary {
  color: rgb(52, 152, 219);
}

details.warning > summary {
  color: rgb(255, 193, 22);
}

details.success > summary {
  color: rgb(82, 196, 26);
}

details.error > summary {
  color: rgb(231, 76, 60);
}

details.bug > summary {
  color: rgb(231, 76, 60);
}

details.flask > summary {
  color: rgb(155, 89, 182);
}

details.info > summary::before {
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>');
}

details.success > summary::before {
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>');
}

details.warning > summary::before {
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>');
}

details.error > summary::before {
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"%20viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>');
}

details.bug > summary::before {
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons:CC BY 4.0,Fonts:SIL OFL 1.1,Code:MIT License) Copyright 2024 Fonticons,Inc. --><path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons:CC BY 4.0,Fonts:SIL OFL 1.1,Code:MIT License) Copyright 2024 Fonticons,Inc. --><path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>');
}

details.flask > summary::before {
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons:CC BY 4.0,Fonts:SIL OFL 1.1,Code:MIT License) Copyright 2024 Fonticons,Inc. --><path d="M288 0L160 0 128 0C110.3 0 96 14.3 96 32s14.3 32 32 32l0 132.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512l309.2 0c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5L320 64c17.7 0 32-14.3 32-32s-14.3-32-32-32L288 0zM192 196.8L192 64l64 0 0 132.8c0 23.7 6.6 46.9 19 67.1L309.5 320l-171 0L173 263.9c12.4-20.2 19-43.4 19-67.1z"/></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons:CC BY 4.0,Fonts:SIL OFL 1.1,Code:MIT License) Copyright 2024 Fonticons,Inc. --><path d="M288 0L160 0 128 0C110.3 0 96 14.3 96 32s14.3 32 32 32l0 132.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512l309.2 0c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5L320 64c17.7 0 32-14.3 32-32s-14.3-32-32-32L288 0zM192 196.8L192 64l64 0 0 132.8c0 23.7 6.6 46.9 19 67.1L309.5 320l-171 0L173 263.9c12.4-20.2 19-43.4 19-67.1z"/></svg>');
}

summary::before {
  content: "";
  background-color: currentcolor;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

summary:after {
  content: "";
  background-color: currentcolor;
  -webkit-mask-size: contain;
  mask-size: contain;
  mask-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20512%22%3E%3Cpath%20d%3D%22M246.6%20278.6c12.5-12.5%2012.5-32.8%200-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8%2016.6-19.8%2029.6l0%20256c0%2012.9%207.8%2024.6%2019.8%2029.6s25.7%202.2%2034.9-6.9l128-128z%22%2F%3E%3C%2Fsvg%3E");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

details[open] > summary::after {
  transform: translateY(-50%) rotate(90deg);
}

pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

code[class*="language-"],
pre {
  background: #fefefe;
  color: #383a42;
  font-family:
    Fira Code,
    Fira Mono,
    Menlo,
    Consolas,
    DejaVu Sans Mono,
    monospace;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

code[class*="language-"]::-moz-selection,
code[class*="language-"] *::-moz-selection,
pre *::-moz-selection {
  background: #e5e5e6;
  color: inherit;
}

code[class*="language-"]::selection,
code[class*="language-"] *::selection,
pre *::selection {
  background: #e5e5e6;
  color: inherit;
}

pre {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 0.3em;
}

:not(pre) > code[class*="language-"] {
  padding: 0.2em 0.3em;
  border-radius: 0.3em;
  white-space: normal;
}

.copy-button[data-v-a7061ca4] {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    0.2s ease-in-out opacity,
    0.2s ease-in-out color,
    0.2s ease-in-out background-color;
  opacity: 0;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #555;
}

.code-container {
  margin: 1rem 0;
  position: relative;
  border-radius: 0.3em;
}

.code-container:hover > .copy-button {
  opacity: 1;
}

.code-container:hover > .copy-button:hover {
  background-color: #ddd;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

h1 {
  margin: 1.5rem 0 1rem;
  font-size: 2em;
  padding-bottom: 0.1em;
  border-bottom: solid 1px #d8d8d8;
}

h2 {
  margin: 1.2rem 0 1rem;
  font-size: 1.5em;
  padding-bottom: 0.1em;
  border-bottom: solid 1px #d8d8d8;
}

h3 {
  margin: 1.2rem 0 1rem;
  font-size: 1.2em;
}

h4 {
  margin: 1rem 0;
  font-size: 1.1em;
}

h5 {
  margin: 1rem 0;
  font-size: 1em;
}

h6 {
  margin: 1rem 0;
  font-size: 1em;
  color: #666;
}

img {
  max-width: 100%;
}

ul,
ol {
  padding-left: 2em;
}

li + li {
  margin-top: 0.2em;
}

li.task-list-item {
  position: relative;
  list-style-type: none;
}

li.task-list-item > input:first-child {
  position: absolute;
  left: -1.5em;
  top: 55%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
}

hr {
  margin: 1em 0;
  height: 0;
  border: none;
  border-bottom: solid 1px #eee;
}

a {
  text-decoration: none;
  transition: filter 0.1s ease;
  color: rgb(var(--lcolor--link, 52, 152, 219));
  cursor: pointer;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  display: block;
  width: 100%;
  overflow: auto;
  word-break: keep-all;
  margin: 10px;
  font-variant-numeric: tabular-nums;
}

th,
td {
  border: 1px solid #ddd;
  padding: 6px 13px;
}

blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  border-left: 5px solid #eee;
}

a {
  background-color: transparent;
}
```

然后直接在 `~/themes/···（主题名称）/scripts` 中新建 custom_marked.js（也可以是别的名字），粘贴以下代码即可，**不用引入**。

```javascript
const allowedFoldableTypes = new Set(['info', 'warning', 'success', 'error', 'bug', 'flask']);

function renderMarkdown(content) {
  return hexo.render.renderSync({ text: content.trim(), engine: 'markdown' });
}

function renderCustomBlock(blockType, title, opt, body) {
  const type = blockType.toLowerCase();
  const content = renderMarkdown(body.trim());

  if (type === 'align') {
    const dir = title ? title.trim() : 'left';
    return `\n<div class="align-${dir}">\n${content}\n</div>\n`;
  }

  if (type === 'epigraph') {
    const author = title ? `<p class="epigraph-author">${title}</p>` : '';
    return `\n<div class="epigraph">\n${content}${author}\n</div>\n`;
  }

  if (allowedFoldableTypes.has(type)) {
    const openAttr = opt && opt.includes('open') ? ' open' : '';
    const summary = title ? title.trim() : '详情';
    return `\n<details class="foldable ${type}"${openAttr}>\n  <summary>${summary}</summary>\n  <div>\n${content}\n  </div>\n</details>\n`;
  }

  return null;
}

function parseCustomBlocks(content) {
  const lines = content.split(/\r?\n/);
  const root = { type: 'root', children: [] };
  const stack = [root];
  let codeFence = null;
  const openRule = /^\s*(:{3,})([a-zA-Z]\w*)(?:\s*\[([^\]]*)\])?(?:\s*\{([^}]*)\})?\s*$/;
  const closeRule = /^\s*(:{3,})\s*$/;

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const fence = fenceMatch[1];
      if (!codeFence) {
        codeFence = fence;
      } else if (codeFence === fence) {
        codeFence = null;
      }
      stack[stack.length - 1].children.push({ type: 'text', value: line });
      continue;
    }

    if (codeFence) {
      stack[stack.length - 1].children.push({ type: 'text', value: line });
      continue;
    }

    const openMatch = line.match(openRule);
    if (openMatch) {
      const level = openMatch[1].length;
      const blockType = openMatch[2].toLowerCase();
      const title = openMatch[3] || '';
      const opt = openMatch[4] || '';
      const node = { type: 'block', level, blockType, title, opt, children: [] };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
      continue;
    }

    const closeMatch = line.match(closeRule);
    if (closeMatch) {
      const level = closeMatch[1].length;
      if (stack.length > 1 && stack[stack.length - 1].level === level) {
        stack.pop();
        continue;
      }
    }

    stack[stack.length - 1].children.push({ type: 'text', value: line });
  }

  return renderNode(root);
}

function renderNode(node) {
  if (node.type === 'root') {
    return node.children.map(renderNode).join('\n');
  }
  if (node.type === 'text') {
    return node.value;
  }
  if (node.type === 'block') {
    const inner = node.children.map(renderNode).join('\n');
    const customHtml = renderCustomBlock(node.blockType, node.title, node.opt, inner);
    if (customHtml !== null) {
      return customHtml;
    }
    const start = `${':'.repeat(node.level)}${node.blockType}${node.title ? `[${node.title}]` : ''}${node.opt ? `{${node.opt}}` : ''}`;
    const end = ':'.repeat(node.level);
    return `${start}\n${inner}\n${end}`;
  }
  return '';
}

hexo.extend.filter.register('before_post_render', data => {
  if (typeof data.content !== 'string') return data;
  hexo.log.debug('custom_marked before_post_render', data.source || data.path || data.title || 'unknown');
  data.content = parseCustomBlocks(data.content);
  return data;
});
```

:::info[为什么不用引入？]{open}
与前面引入的 Css 不同的是，任意主题的目录 `~/themes/···（主题名称）/scripts` 功能都都一样，Hexo 解析时都会运行改此目录下的**所有** Javascript 文件。
:::

:::error[可能的错误]
一不小心放到了 `~/themes/anzhiyu/source/js/custom_marked.js` 里。~~唐~~
:::

## 完结

```bash
hexo new "plugin-test"
hexo cl&&hexo g&&hexo s
```

赶紧在文章里尝试并体验一下吧！是不是很好用？如果有什么建议，可以在[评论区](#post-comment)告诉我哦！
