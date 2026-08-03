---
title: 题解：P8534 「Wdoi-2」比赤色更红的梦
publishDate: 2026-06-06 19:26:35
tags: [题解,C++]
description: 本文讲述了如何使用 C++ 完成洛谷的 P8534 「Wdoi-2」比赤色更红的梦，思路清晰、排版精美
category: solution
---

![111](https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp)

[题目传送门](https://www.luogu.com.cn/problem/P8534)

## 题意分析

**核心**：对于每组数据，判断 $x$ 是否 $\ge 3$ 或 $\ge 5$ 并对应地将残机 $+1$，判断 $s$ 是否 $\ge 10000000$、$\ge 20000000$、$\ge 40000000$ 或 $\ge 60000000$ 并对应地将残机 $+1$。

## 思路引导

:::warning[提问]
如何处理多组数据？
:::

:::success[成功]
使用 `while` 循环语句，每次将 $t-1$，因为 $t=0$ 时布尔值为 $0$, 即 false，所以将会跳出循环，此时循环语句正好执行 $t$ 次。格式如下：

```cpp
while(t--/*布尔表达式*/){
  //执行____
}
```

:::

:::warning[提问]
如何对 $x$ 和 $s$ 的值进行判断？
:::

:::success[成功]
使用 `if` 分支语句，格式如下：

```cpp
//普通版：
if(/*布尔表达式*/){
	//执行____
}
//压行版：
if(/*布尔表达式*/)//执行____（限一句）
```
:::

:::error[警示]{open}
- 如果你将 $s$ 开 int ，那么你将喜提 $\color{E74C3C}{\text{WA}}$，$\color{E74C3C}{\text{25pts}}$。请注意观察数据范围！\
  ~~别问我是[怎么知道的](https://www.luogu.com.cn/record/236917936)~~
- 别忘了每次将 $ans$ 初始化为 $2$。
:::

## 核心代码

只提供 `while` 循环语句内的代码。

```cpp lines=1,3-8
ans=2;
cin>>x>>s;
if(x>=3)ans++;
if(x>=5)ans++;
if(s>=10000000)ans++;
if(s>=20000000)ans++;
if(s>=40000000)ans++;
if(s>=60000000)ans++;
cout<<ans<<endl;
//code by _ruyingsuixing_(UID:1620655)
```
| 1  | 1  |
|-|-|
|  1 | <  |
|  1 | 1  |