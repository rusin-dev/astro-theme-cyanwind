---
title: '题解：P14730 [ICPC 2022 Seoul R] Palindrome Type'
tags: [题解,C++]
pubDatetime: 2026-03-30 21:35:32
description: 本文讲述了如何使用 C++ 完成洛谷的 P14730 [ICPC 2022 Seoul R] Palindrome Type，思路清晰、排版精美
---

![111](https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp)

[**纯享阅读区**](https://www.luogu.com.cn/article/twhfrn73 "纯享阅读区")  
[题目传送门](https://www.luogu.com.cn/problem/P14730 "P14730 [ICPC 2022 Seoul R] Palindrome Type")

## 总体分析

**核心**：修改字符串 $s$ 使其成为回文串，记最小次数为 $k$，如果 $k\leq3$，输出 $k$，否则输出 `-1` 。

因此，可以从 $k=0\sim3$ 依次进行 DFS 搜索，只要有一次成功，输出 $k$，结束。

## 思路引导

{% note warning flat %}
**提问**
如何 DFS **搜索**修改过程算出 $k$？
{% endnote %}

{% note success flat %}
**DFS 函数**
使用 [双指针](https://oi-wiki.org/misc/two-pointer/)。

当 $l<r$ 时：
* 如果左指针 $l$ 和右指针 $r$ 对应的 $s_l=s_r$，那么这部分已经是回文的，$l$ 向右移，$r$ 向左移。
* 否则：
  + 如果剩余次数 $step=0$，无法继续修改，返回无法完成。
  + 如果删除 $l+1$ 或 $r+1$ 可完成，返回可以完成。
  + 否则返回无法完成。

返回无法完成。
{% endnote %}

{% note error flat %}
**警告**
如果 $k\leq 3$ 都不可以，最后输出 `-1` 。
{% endnote %}

## 核心代码

```cpp
bool dfs(int l, int r, int step){

    while(l<r){
        if(s[l]==s[r])l++,r--;
        else{
            if(!step)return 0;
            if(dfs(l+1,r,step-1)||dfs(l,r-1,step-1))return 1;
            return 0;
        }
    }
    return 1;

}
```
