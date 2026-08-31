---
title: Cyanwind 主题 markdown 语法
description: 学习 Markdown 的基础语法，从入门到精通。
publishDate: 2026-08-28
updatedDate: 2026-08-31
tags:
  - 教程
  - markdown
category: tech
language: zh
draft: false
comment: true
---
## Markdown 是什么

[Markdown](https://markdown.com.cn/ "官网") 是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用，如Github、Wikipedia、简书等。

## Markdown 编辑器

Markdown 入门的最佳方式就是多使用它。由于有大量免费工具的存在，上手 Markdown 是很方便的。比较遗憾的一点是**各平台可能采用不同语言实现的 Markdown 解析引擎**，例如 Gridea 和 Luogu 就不同，而且可能有不同程度的定制与扩展，这导致在不同平台上使用 Markdown 写作时体验并不完全一致。不过幸好对于大家公认的一些标准语法，各家都是支持的。
你甚至都不需要下载任何程序，就可以使用[在线 Markdown 编辑器](https://markdown.com.cn/editor/)来编写 Markdown。进入其站点就可以开始在左侧窗格中书写了。渲染后的文档在右侧窗格预览。

阅读本指南时，你可以打开[在线 Markdown 编辑器](https://markdown.com.cn/editor)。这样，你就可以一边学习 Markdown 语法一边练习了。熟悉 Markdown 之后，再选择一个顺手的 Markdown 的应用程序。

## Markdown 标题语法

Markdown 的标题是在行首插入 $1$ 到 $6$ 个 `#`，`#` 和标题文字之间使用一个或多个空格，对应到标题 $1$ 到 $6$ 级。

:::error[警告]
标题**不用来**强调，滥用标题可能会让读者感到困惑。
:::

### 预览

![预览](https://image.rusin7.com/file/hexo/article/markdown/851kcAXJ.png)

### 源码

```markdown
# 1级标题 
## 2级标题 
### 3级标题 
#### 4级标题 
##### 5级标题 
###### 6级标题 
这是正文
```

### 可选语法

还可以在文本下方添加任意数量的 `==` 号来标识一级标题，或者 `--` 号来标识二级标题。

> **警告**
> 如果你想在一句正文后添加分割线，请使用`***`而非`---`避免错误地标识二级标题。

#### 预览

![预览](https://image.rusin7.com/file/hexo/article/markdown/OtaGC9sA.png)

#### 源码

```markdown
1级标题 
===============
2级标题
---------------
```

## Markdown 强调语法

通过将文本设置为粗体、斜体、删除线、高亮来强调其重要性。

### 预览

*单星号斜体*
*单下划线斜体*
**双星号加粗**
**双下划线加粗**
~~删除线~~
***混合效果***

### 源码

```markdown
*单星号斜体*
_单下划线斜体_
**双星号加粗**
__双下划线加粗__
~~删除线~~
***混合效果***
```

如果要在文字前后直接插入普通的星号或底线，可以用反斜线（`\`）（参见下面的[“转义字符”部分](#markdown-%E8%BD%AC%E4%B9%89%E8%AF%AD%E6%B3%95)）。

### 预览

使用反斜线开头的被当做是普通的字符

### 源码

```markdown
\*使用反斜线开头的\*被当做是普通的字符\*
```

## Markdown 代码语法

### 大段代码

Markdown 建立代码块的方法：将 `` 置于这段代码的首行和末行，独立成一行。第一行的 `` 后面可以加上语言名称，例如 c++、java、c、pascal、markdown、latex 等。

#### 预览

```c++
#include<bits/stdc++.h>
using namespace std;

int main(){
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}
```

#### 源码

```markdown
```c++
#include<bits/stdc++.h>
using namespace std;

int main(){
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}
```
```

### 小段代码

需要引用代码时，如果引用的语句只有一段，不分行，可以用 ` 将语句包起来。

#### 预览

这样 `不分行引用代码` 就行了。

#### 源码

```markdown
这样 `不分行引用代码` 就行了。
```

## Markdown 引用语法

### 预览

> Markdown 标记区块引用的方法是在行的最前面加 `>`。
>
> 也可以只在整个段落的第一行最前面加上 `>`。
>
> > 区块引用内部可以嵌套，只要根据层次加上不同数量的 `>` 即可。
> >
> > *我是内部嵌套区块，我可以使用其他 Markdown 语法哦。*
> >
> > ### 引用区块内可以使用标题语法。
> >
> > - Yes，可以加入列表.
> > - No，可以加入列表.
> >
> > ```java
> > //在引用区块内可以加入代码块
> > import java.net.URL;
> > import java.util.Arrays;
> > import java.util.Date;
> > import java.util.Set;
> > ```

### 源码

```markdown
> Markdown 标记区块引用的方法是在行的最前面加 `>`。
> 
> 也可以只在整个段落的第一行最前面加上 `>`。
> > 区块引用内部可以嵌套，只要根据层次加上不同数量的 `>` 即可。
> > 
> > *我是内部嵌套区块，我可以使用其他 Markdown 语法哦。*
> > 
> > ### 引用区块内可以使用标题语法。
> > - [x] Yes，可以加入列表.
> > - [ ] No，可以加入列表.
> > ```java
> > //在引用区块内可以加入代码块
> > import java.net.URL;
> > import java.util.Arrays;
> > import java.util.Date;
> > import java.util.Set;
> > ```
```

## Markdown 列表语法

Markdown 支持有序列表和无序列表以及任务列表。无序列表使用星号、加号或是减号作为列表标记，有序列表则使用数字接着一个英文句点。两种列表方式格式都是：列表标记 + 空格 + 列表项，即列表项目标记通常是放在最左边，也可以缩进最多 $3$ 个空格，项目标记后面则一定要接着至少一个空格或制表符。
列表**可以**嵌套。

### 无序列表

星号、加号或是减号三种列表方式效果等同。

#### 预览

- Red
- Green
- Blue

- Red
- Green
  - Blue

- Red
  - Green
    - Blue

#### 源码

```markdown
*   Red
*   Green
*   Blue

+   Red
+   Green
    +   Blue

-   Red
    -   Green
         -   Blue
```

### 有序列表

有序列表则使用数字接着一个英文句点 `.` 或英文括号 `(`，添加带有数字和周期的行项。数字**不必**按数字顺序排列，但列表应从数字 $1$ 开始。

#### 预览

1. First item
2. Second item
3. Third item
4. Fourth item

---

1. First item
2. Second item
3. Third item
4. Fourth item

---

1. First item
2. Second item
3. Third item
  1. 缩进项
  2. 缩进项
4. Fourth item

#### 源码

```markdown
1. First item
2. Second item
3. Third item
4. Fourth item
---
1. First item
1. Second item
1. Third item
1. Fourth item
---
1) First item
3) Second item
8) Third item
    1) 缩进项
    2) 缩进项
5) Fourth item
```

### 任务列表

务列表是一种特殊的列表，它可以在列表项前添加复选框，用于表示任务是否完成。任务列表的格式为：-   任务项 或 - x 任务项，其中   表示未完成任务，x 表示已完成任务。

#### 预览

- 学习 Markdown 语法
- 完成 Markdown 语法学习
- 编写 Markdown 文档

#### 源码

```
- [ ] 学习 Markdown 语法
- [x] 完成 Markdown 语法学习
- [ ] 编写 Markdown 文档
```

## Markdown 链接语法

使用链接带给读者更好的网站跳转效果和渲染机制。

### 美观链接

链接文本放在中括号内，链接地址放在后面的括号中，链接title是当鼠标悬停在链接上时会出现的文字，这个title是可选的，它放在圆括号中链接地址后面，跟链接地址之间以空格分隔。

#### 预览

[行内式链接标题（无title）](https://ruying-suixing.github.io/)  
[行内式链接标题（有title），可将光标移至链接上查看 title 效果。](https://ruying-suixing.github.io/ "可选标题")  

**[行内式** *链接* 标题（含 Markdown 语法）](https://ruying-suixing.github.io/) 

#### 源码

```markdown
[行内式链接标题（无title）](https://ruying-suixing.github.io/)  
[行内式链接标题（有title），可将光标移至链接上查看 title 效果。](https://ruying-suixing.github.io/ "可选标题")  

[**行内式** _链接_ 标题（含 Markdown 语法）](https://ruying-suixing.github.io/ "可选标题")
```


## Markdown 图片语法

Markdown 使用一种和链接很相似的语法来标记图片。在互联网上发表含有图片的内容时，需要将该图片上传至可公开访问的存储空间内（也就是俗称的图床），可以使用图床上传图片后复制图片引用地址来使用该图片，行内式的图片语法如下： 
`![图片下方文字](图片相对路径或绝对路径)`
`![图片下方文字](图片相对路径或绝对路径 "可选标题")`
详细叙述如下：一个英文感叹号 `!`，接着一个方括号，里面放上图片的替代文字（这些文字将在图片加载失败的时候显示），接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上选择性的 title 文字，像链接语法一样。

### 预览

无title：![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/1620655.png) 
有title，可将光标移至图片上查看 title 效果：![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/1620655.png "可选标题") 
无用链接，有title，可将光标移至错误文字上查看 title 效果：
![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/9999999.png "可选标题")

图片套链接：![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/1620655.png "可选标题")[](https://ruying-suixing.github.io/) 

### 源码

```markdown
无title：![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/1620655.png) 
有title，可将光标移至图片上查看 title 效果：![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/1620655.png "可选标题") 
无用链接，有title，可将光标移至错误文字上查看 title 效果：
![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/9999999.png "可选标题")

图片套链接：![我的博客图片](https://cdn.luogu.com.cn/upload/usericon/1620655.png "可选标题")[](https://ruying-suixing.github.io/) 
```

## Markdown 转义语法

要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符  。

渲染效果如下：

 Without the backslash, this would be a bullet in an unordered list.

### 可做转义的字符

以下列出的字符都可以通过使用反斜杠字符从而达到转义目的。


| Character | Name |
| --------- | ------------------- |
|  | backslash |
|  | backtick |
|  | asterisk |
|  | underscore |
| { } | curly braces |
|  | brackets |
| ( ) | parentheses |
| # | pound sign |
| + | plus sign |
|  | minus sign (hyphen) |
| . | dot |
| ! | exclamation mark |


### 预览

   反斜线
   反引号
   星号
   底线
}  花括号
]  方括号
)  括弧
   井字号
   加号
   减号
   英文句点
   惊叹号

### 源码

```markdown
\\   反斜线
\`   反引号
\*   星号
\_   底线
\{}  花括号
\[]  方括号
\()  括弧
\#   井字号
\+   加号
\-   减号
\.   英文句点
\!   惊叹号
```

## Markdown 分隔线语法

要创建分隔线，请在单独一行上使用三个或多个星号 (`***`)、破折号 (`---`) 或下划线 (`___`) ，并且不能包含其他内容。

### 预览

这是第一段内容。

---

---

---

这是第二段内容。

### 源码

```markdown
这是第一段内容。

***

---

_________________

这是第二段内容。
```

## Markdown 表格语法

使用 `|` 划分单元格，并使用 `:` 与三个及以上的 `-` 在第二行用于调整对齐。

### 预览


| 我是左对齐 | 我是居中对齐 | 我是右侧对齐 |
| ----- | ------ | ------ |
| 内容 | 内容 | 内容 |


### 源码

```markdown
| 我是左对齐 | 我是居中对齐 | 我是右侧对齐 |
|:---|:---:|---:|
| 内容 | 内容 | 内容 |
```

**源码中**单元格宽度可以变化，如下所示。呈现的输出将看起来相同。

### 预览


| 我是左对齐 | 我是居中对齐 | 我是右侧对齐 |
| ----- | ------ | ------ |
| 内容 | 内容 | 内容 |


### 源码

```markdown
| 我是左对齐 | 我是居中对齐 | 我是右侧对齐 |
|    :---    |    :---:     |    ---:     |
| 内容 | 内容 | 内容 |
```

表格行数可以变化，如下所示。

### 预览


| 我是左对齐 | 我是居中对齐 | 我是右侧对齐 |
| ----- | ------ | ------ |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |


### 源码

```markdown

| 我是左对齐 | 我是居中对齐 | 我是右侧对齐 |
|:---|:---:|---:|
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |
```

## Markdown 注释语法

Markdown 没有内置的注释功能，但可以使用一种非官方的 Hack 方法。

### 预览

这是可见的段落。

这是另一个可见的段落。

### 源码

```markdown
这是可见的段落。

[这是一个隐藏的注释]: # 

这是另一个可见的段落。
```

## Cyanwind 主题扩展语法

Cyanwind 主题集成了很多来自于[洛谷](https://www.luogu.com.cn/article/70w8j2pj)的扩展语法，供写文章使用。

当然，在 Hexo 中也可以通过修改源码实现，教程详见[在 Hexo 中复现洛谷插件](/article/luogu-plugin-in-hexo)。

Markdown 没有文本对齐的语法，但可以使用本主题自带的扩展语法解决。

### 预览

:::align{left}
居左内容。
:::

:::align{center}
居中内容。
:::

:::align{right}
居右内容。
:::

### 源码

```markdown
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

Markdown 没有折叠框的语法，但也可以使用本主题自带的扩展语法解决。

### 预览

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

### 源码

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
```

Markdown 没有 Codeforces 风格的引言的语法，但也可以使用本主题自带的扩展语法解决。

### 预览

:::epigraph[——otto]
大家好啊，我是说的道理。
:::

### 源码

```
:::epigraph[——otto]
大家好啊，我是说的道理。
:::
```

尽管支持嵌套，**但请不要滥用**。