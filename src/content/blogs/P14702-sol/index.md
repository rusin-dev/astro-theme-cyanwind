---
title: '题解：P14702 [ICPC 2024 Tehran R] Boat'
publishDate: 2026-04-03 20:38:22
tags: [题解,C++]
description: 本文讲述了如何使用 C++ 完成洛谷的 题解：P14702 [ICPC 2024 Tehran R] Boat，思路清晰、排版精美
category: solution
heroImage:
  src: https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp
  color: "#7da7d4"
---

![111](https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp)

[题目传送门](https://www.luogu.com.cn/problem/P14702)

贪心，细节较多。

## 思路分析

先特判无解情况。

:::info[提示]{open}

* 如果某个重量大于最大载重量 $w$，输出 `−1`，结束。
* 如果最轻的两个人重量之和超过了 $w$，即**无人**可以当船夫，输出 `−1`，结束。

:::
否则**一定**有解，尽量让**两人配对上船**，为了用最少次数，先 sort 从小到大排序，再让最轻的人作为船夫，分为两种情况：

* 如果 $a_i+a_1 \leq w$，可以和最轻的人一起上船，可载两人。这样运送要 $2$ 次，$ans \leftarrow ans+2$。
* 否则，不可以和最轻的人一起上船，只载一人。这样运送要 $4$ 次，$ans \leftarrow ans+4$。

最后船夫不回来，所以输出 $ans-1$。

## 代码

按思路写即可，注意细节，这里不放了。

## 结语

感谢您的阅读！
