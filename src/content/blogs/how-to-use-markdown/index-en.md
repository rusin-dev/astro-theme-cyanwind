---
title: Cyanwind theme markdown syntax
description: Learn the basic syntax of Markdown from beginner to advanced.
publishDate: 2026-08-28
updatedDate: 2026-08-31
tags:
  - tutorial
  - markdown
category: tech
language: en
draft: false
comment: true
---

## What is Markdown

[Markdown](https://markdown.com.cn/ "Official website") is a lightweight markup language with a simple syntax that allows people to focus more on the content itself rather than formatting. It uses a plain text format that is easy to read and write, and can be mixed with HTML. It can export to HTML, PDF, and its own .md format. Due to its simplicity, efficiency, readability, and ease of writing, Markdown is widely used by platforms like Github, Wikipedia, and Jianshu.

## Markdown Editors

The best way to get started with Markdown is to use it frequently. Thanks to the many free tools available, getting started with Markdown is very convenient. Unfortunately, **different platforms may use Markdown parsing engines implemented in different languages**, for example Gridea and Luogu are different, and they may have different levels of customization and extensions. This means the experience of writing with Markdown on different platforms is not completely consistent. However, thankfully, all platforms support the commonly accepted standard syntax.

You don't even need to download any programs—you can use an [online Markdown editor](https://markdown.com.cn/editor/) to write Markdown. Simply visit the website and start writing in the left pane. The rendered document is previewed in the right pane.

While reading this guide, you can open the [online Markdown editor](https://markdown.com.cn/editor). This way, you can practice Markdown syntax while learning it. Once you're familiar with Markdown, you can choose a Markdown application that suits you.

## Markdown Heading Syntax

Markdown headings are created by inserting 1 to 6 `#` symbols at the beginning of a line, with one or more spaces between the `#` and the heading text, corresponding to heading levels 1 through 6.

:::error[Warning]
Headings are **not meant** for emphasis. Overusing headings may confuse readers.
:::

### Preview

![Preview](https://image.rusin7.com/file/hexo/article/markdown/851kcAXJ.png)

### Source

```markdown
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

This is body text.
```

### Alternative Syntax

You can also add any number of `==` symbols below the text to mark a level 1 heading, or `--` symbols for a level 2 heading.

> **Warning**
> If you want to add a horizontal rule after a line of text, use `***` instead of `---` to avoid mistakenly marking it as a level 2 heading.

#### Preview

![Preview](https://image.rusin7.com/file/hexo/article/markdown/OtaGC9sA.png)

#### Source

```markdown
Heading level 1
===============
Heading level 2
---------------
```

## Markdown Emphasis Syntax

You can emphasize the importance of text by making it bold, italic, strikethrough, or highlighted.

### Preview

*Single asterisk italic*
*Single underscore italic*
**Double asterisk bold**
**Double underscore bold**
~~Strikethrough~~
***Mixed effect***

### Source

```markdown
*Single asterisk italic*
_Single underscore italic_
**Double asterisk bold**
__Double underscore bold__
~~Strikethrough~~
***Mixed effect***
```

If you want to insert a plain asterisk or underscore before or after text, you can use a backslash (`\`) (see the ["Escape Characters" section](#markdown-escape-syntax) below).

### Preview

Using a backslash at the beginning treats it as a plain character.

### Source

```markdown
\*Using a backslash at the beginning\* treats it as a plain character\*
```

## Markdown Code Syntax

### Code Blocks

To create a code block in Markdown, place `` at the beginning and end of the code block, each on its own line. You can add a language name after the opening `` on the first line, such as c++, java, c, pascal, markdown, latex, etc.

#### Preview

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

#### Source

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

### Inline Code

When you need to reference code, if the reference is only a single line and not broken into multiple lines, you can wrap it in backticks.

#### Preview

This way you can `reference code inline`.

#### Source

```markdown
This way you can `reference code inline`.
```

## Markdown Blockquote Syntax

### Preview

> Markdown marks blockquotes by adding `>` at the beginning of the line.
>
> You can also add `>` only at the beginning of the first line of the entire paragraph.
>
> > Blockquotes can be nested by adding different numbers of `>` according to the nesting level.
> >
> > *I am a nested blockquote, and I can use other Markdown syntax.*
> >
> > ### You can use heading syntax inside blockquotes.
> >
> > - Yes, you can add lists.
> > - No, you can add lists.
> >
> > ```java
> > //You can add code blocks inside blockquotes
> > import java.net.URL;
> > import java.util.Arrays;
> > import java.util.Date;
> > import java.util.Set;
> > ```

### Source

```markdown
> Markdown marks blockquotes by adding `>` at the beginning of the line.
> 
> You can also add `>` only at the beginning of the first line of the entire paragraph.
> > Blockquotes can be nested by adding different numbers of `>` according to the nesting level.
> > 
> > *I am a nested blockquote, and I can use other Markdown syntax.*
> > 
> > ### You can use heading syntax inside blockquotes.
> > - [x] Yes, you can add lists.
> > - [ ] No, you can add lists.
> > ```java
> > //You can add code blocks inside blockquotes
> > import java.net.URL;
> > import java.util.Arrays;
> > import java.util.Date;
> > import java.util.Set;
> > ```
```

## Markdown List Syntax

Markdown supports ordered lists, unordered lists, and task lists. Unordered lists use asterisks, plus signs, or hyphens as list markers. Ordered lists use numbers followed by a period. The format for both list types is: list marker + space + list item. List item markers are usually placed at the far left, but can be indented up to 3 spaces. After the list marker, there must be at least one space or tab.

Lists **can** be nested.

### Unordered Lists

The three types of list markers (asterisk, plus sign, and hyphen) produce the same result.

#### Preview

- Red
- Green
- Blue

- Red
- Green
  - Blue

- Red
  - Green
    - Blue

#### Source

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

### Ordered Lists

Ordered lists use numbers followed by a period `.` or parentheses `(`, adding items with numbers and periods. Numbers **do not** have to be in numerical order, but the list should start with the number 1.

#### Preview

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
   1. Indented item
   2. Indented item
4. Fourth item

#### Source

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
    1) Indented item
    2) Indented item
5) Fourth item
```

### Task Lists

Task lists are a special type of list that allow you to add checkboxes before list items to indicate whether a task is complete. The format for task lists is: `- [ ] Task item` or `- [x] Task item`, where `[ ]` indicates an incomplete task and `[x]` indicates a completed task.

#### Preview

- [ ] Learn Markdown syntax
- [x] Complete Markdown syntax learning
- [ ] Write Markdown documentation

#### Source

```
- [ ] Learn Markdown syntax
- [x] Complete Markdown syntax learning
- [ ] Write Markdown documentation
```

## Markdown Link Syntax

Links provide readers with better website navigation and rendering.

### Inline Links

Link text is placed inside square brackets, and the link URL is placed inside parentheses immediately after. The link title is optional text that appears when hovering over the link, placed after the URL inside parentheses and separated by a space.

#### Preview

[Inline link title (no title)](https://ruying-suixing.github.io/)  
[Inline link title (with title), hover over the link to see the title effect.](https://ruying-suixing.github.io/ "Optional title")  

**[Inline** *link* title (with Markdown syntax)](https://ruying-suixing.github.io/)

#### Source

```markdown
[Inline link title (no title)](https://ruying-suixing.github.io/)  
[Inline link title (with title), hover over the link to see the title effect.](https://ruying-suixing.github.io/ "Optional title")  

[**Inline** _link_ title (with Markdown syntax)](https://ruying-suixing.github.io/ "Optional title")
```


## Markdown Image Syntax

Markdown uses syntax similar to links to mark images. When publishing content with images on the internet, you need to upload the image to publicly accessible storage (commonly known as an image host). You can use an image host to upload images and then copy the image reference URL to use the image. The inline image syntax is as follows:

`![Alt text](image relative or absolute path)`
`![Alt text](image relative or absolute path "Optional title")`

The detailed description is: an exclamation mark `!`, followed by square brackets containing alternative text for the image (these words will be displayed if the image fails to load), then parentheses containing the image URL. Finally, you can optionally add title text in quotes, similar to link syntax.

### Preview

No title: ![My blog image](https://cdn.luogu.com.cn/upload/usericon/1620655.png)
With title, hover over the image to see the title effect: ![My blog image](https://cdn.luogu.com.cn/upload/usericon/1620655.png "Optional title")
Invalid link, with title, hover over the error text to see the title effect:
![My blog image](https://cdn.luogu.com.cn/upload/usericon/9999999.png "Optional title")

Image in link: ![My blog image](https://cdn.luogu.com.cn/upload/usericon/1620655.png "Optional title")[](https://ruying-suixing.github.io/)

### Source

```markdown
No title: ![My blog image](https://cdn.luogu.com.cn/upload/usericon/1620655.png)
With title, hover over the image to see the title effect: ![My blog image](https://cdn.luogu.com.cn/upload/usericon/1620655.png "Optional title")
Invalid link, with title, hover over the error text to see the title effect:
![My blog image](https://cdn.luogu.com.cn/upload/usericon/9999999.png "Optional title")

Image in link: ![My blog image](https://cdn.luogu.com.cn/upload/usericon/1620655.png "Optional title")[](https://ruying-suixing.github.io/)
```

## Markdown Escape Syntax

To display characters that are normally used to format Markdown documents, add a backslash character before them.

Rendering effect:

Without the backslash, this would be a bullet in an unordered list.

### Escapable Characters

All of the following characters can be escaped by using a backslash character.

| Character | Name |
| --------- | ------------------- |
| \ | backslash |
| ` | backtick |
| * | asterisk |
| _ | underscore |
| { } | curly braces |
| [ ] | brackets |
| ( ) | parentheses |
| # | pound sign |
| + | plus sign |
| - | minus sign (hyphen) |
| . | dot |
| ! | exclamation mark |


### Preview

\   Backslash
`   Backtick
*   Asterisk
_   Underscore
\{}  Curly braces
\[]  Brackets
\()  Parentheses
\#   Pound sign
\+   Plus sign
\-   Minus sign
\.   Dot
\!   Exclamation mark

### Source

```markdown
\\   Backslash
\`   Backtick
\*   Asterisk
\_   Underscore
\{}  Curly braces
\[]  Brackets
\()  Parentheses
\#   Pound sign
\+   Plus sign
\-   Minus sign
\.   Dot
\!   Exclamation mark
```

## Markdown Horizontal Rule Syntax

To create a horizontal rule, use three or more asterisks (`***`), hyphens (`---`), or underscores (`___`) on a line by themselves, with no other content.

### Preview

This is the first paragraph.

---

---

---

This is the second paragraph.

### Source

```markdown
This is the first paragraph.

***

---

_________________

This is the second paragraph.
```

## Markdown Table Syntax

Use `|` to separate cells, and use `:` with three or more `-` in the second row to adjust alignment.

### Preview


| Left aligned | Center aligned | Right aligned |
| ----- | ------ | ------ |
| Content | Content | Content |


### Source

```markdown
| Left aligned | Center aligned | Right aligned |
|:---|:---:|---:|
| Content | Content | Content |
```

The width of cells in the source can vary, as shown below. The rendered output will look the same.

### Preview


| Left aligned | Center aligned | Right aligned |
| ----- | ------ | ------ |
| Content | Content | Content |


### Source

```markdown
| Left aligned | Center aligned | Right aligned |
|    :---    |    :---:     |    ---:     |
| Content | Content | Content |
```

The number of table rows can vary, as shown below.

### Preview


| Left aligned | Center aligned | Right aligned |
| ----- | ------ | ------ |
| Content | Content | Content |
| Content | Content | Content |
| Content | Content | Content |
| Content | Content | Content |
| Content | Content | Content |


### Source

```markdown

| Left aligned | Center aligned | Right aligned |
|:---|:---:|---:|
| Content | Content | Content |
| Content | Content | Content |
| Content | Content | Content |
| Content | Content | Content |
| Content | Content | Content |
```

## Markdown Comment Syntax

Markdown does not have built-in comment functionality, but you can use an unofficial hack method.

### Preview

This is a visible paragraph.

This is another visible paragraph.

### Source

```markdown
This is a visible paragraph.

[This is a hidden comment]: #

This is another visible paragraph.
```

## Cyanwind Theme Extended Syntax

The Cyanwind theme integrates many extended syntaxes from [Luogu](https://www.luogu.com.cn/article/70w8j2pj) for writing articles.

Of course, you can also achieve this in Hexo by modifying the source code. The tutorial can be found at [Replicating Luogu Plugins in Hexo](/article/luogu-plugin-in-hexo).

Markdown does not have text alignment syntax, but you can use the extended syntax included in this theme to solve this.

### Preview

:::align{left}
Left-aligned content.
:::

:::align{center}
Center-aligned content.
:::

:::align{right}
Right-aligned content.
:::

### Source

```markdown
:::align{left}
Left-aligned content.
:::

:::align{center}
Center-aligned content.
:::

:::align{right}
Right-aligned content.
:::
```

Markdown does not have collapsible box syntax, but you can also use the extended syntax included in this theme to solve this.

### Preview

:::info[This is a tip]
I am tip content.
:::

:::::warning[I am a parent container]

I am some text.

::::success[I am child container 1]{open}
I am content 1.
::::

I am some text.

::::success[I am child container 2]{open}
:::error[I am child container 3]{open}
I am content 2.
:::
::::

I am some text.

:::::

### Source

```markdown
:::info[This is a tip]
I am tip content.
:::

:::::warning[I am a parent container]

I am some text.

::::success[I am child container 1]{open}
I am content 1.
::::

I am some text.

::::success[I am child container 2]{open}
:::error[I am child container 3]{open}
I am content 2.
:::
::::

I am some text.

:::::
```

Markdown does not have Codeforces-style blockquote syntax, but you can also use the extended syntax included in this theme to solve this.

### Preview

:::epigraph[——otto]
Hello everyone, I am talking about reason.
:::

### Source

```
:::epigraph[——otto]
Hello everyone, I am talking about reason.
:::
```

Although nesting is supported, **please do not overuse it**.