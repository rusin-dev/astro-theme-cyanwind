---
title: 题解：CF2139B Cake Collection
tags: [题解,C++]
description: 本文讲述了如何使用 C++ 完成洛谷的 CF2139B Cake Collection，思路清晰、排版精美
pubDatetime: 2026-03-23 21:33:21
---

![111](https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp)

[CF2139B Cake Collection](https://www.luogu.com.cn/problem/CF2139B "CF2139B Cake Collection")  
[**安利一下*博客***](https://blog.rusin7.com/ "博客 🥳🎆🎉祝大家 2026 新年快乐")🥳🎆🎉祝大家 2026 新年快乐！

[纯享阅读区](https://www.luogu.com.cn/article/odez28v6 "纯享阅读区")

## 题意分析

**核心**：用 $m$ 秒去拿 $n$ 个烤好的蛋糕，要拿的尽量多。用 [贪心](https://oi-wiki.org/basic/greedy/ "贪心") 算法。

## 思路引导

:::warning[提问]
如何保证能选到最好的方案？
:::

::::success[成功]
对数组 $a$ 从大到小进行排序，如果 $n \le m$，则可以把所有烤箱中的蛋糕都拿一遍，生产蛋糕越多的**越晚拿**，且后面会给出证明：早拿一次再晚拿一次和直接晚拿一次一样，不如直接晚拿一次简单。否则 $n>m$，就直接拿排序后**最好**（$a_i$ 较大）的烤箱中的蛋糕，同样，生产蛋糕越多的**越晚拿**。

综上，取个 $\min \{n,m\}$ 即可。
:::info[Tip]{open}
从大到小进行排序不用手写 `cmp` 了！使用 `greater<int>()` 可以直接大到小进行排序。
示例代码：

```cpp
sort(a+1,a+n+1,greater<int>());//对数组 a 从大到小进行排序
```

:::
::::
:::warning[提问]
如何证明早拿一次再晚拿一次同一个烤箱，和直接晚拿一次一样？
:::
:::success[成功]
**证明**：  
设早拿的时间为 $p_1$，晚拿的时间为 $p_2$，烤箱每秒生成 $a_i$ 个蛋糕，早拿一次再晚拿一次可以拿走 $p_1 \times a_i+(p_2-p_1) \times a_i=p_2 \times a_i$，晚拿一次可以拿走 $p_2 \times a_i$，两式相等，故结论成立。
:::
:::warning[提问]
每拿一次可以获得多少蛋糕？
:::
:::success[成功]
由于生产蛋糕越多的**越晚拿**，但我们已经从大到小排序了，循环的时间却是从小到大，应该用 $m-i+1$ 才能让下标 $i$ 越小，生产蛋糕 $a_i$ 越多，时间 $m-i+1$ 越大。

因此得出 $a_i$ 的价值为 $(m-i+1)\times a_i$。
:::
:::error[警告]{open}
不开 `long long` 见祖宗，不用 `1LL` 乘见祖宗。
:::

## 完整代码

```cpp
#include<bits/stdc++.h>
using namespace std;
long long t,n,m,a[200005],s;
int main(){
	cin>>t;
	while(t--){
		s=0;
		cin>>n>>m;
		for(int i=1;i<=n;i++)cin>>a[i];
		sort(a+1,a+n+1,greater<int>());
		for(int i=1;i<=min(n,m);i++)s+=1LL*(m-i+1)*a[i];
		cout<<s<<endl;
	}
  return 0;
}
//code by _ruyingsuixing_(UID:1620655)
```
