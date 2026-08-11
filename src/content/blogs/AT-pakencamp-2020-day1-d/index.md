---
title: 题解：AT_pakencamp_2020_day1_d 立方体を壊せ！
publishDate: 2026-06-06 19:35:33
tags: [题解,C++]
description: 本文讲述了如何使用 C++ 完成洛谷的 AT_pakencamp_2020_day1_d 立方体を壊せ！，思路清晰、排版精美
category: solution
heroImage:
  src: https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp
  color: "#7da7d4"
---
## 问题分析

题目要求计算边长为 $N$ 的立方体被平面 $x+y+z=K$ 切割后，包含原点 $(0,0,0)$ 的部分体积的 **6 倍**是多少。\
立方体的范围为 $0 \le x,y,z \le N$，平面 $x+y+z=K$ 将空间分为两部分，并且**包含原点的部分**满足 $x+y+z \le K$。

## 核心思路

根据 $K$ 与立方体的位置关系，平面切割立方体的效果不同，需分类讨论：

- **平面在立方体外部（$K \le 0$）**：如图 1 ，此时 $x+y+z \le K$ 不包含立方体任何部分，$V_立=0$。\
![1](https://cdn.luogu.com.cn/upload/image_hosting/2gwzloc6.png)$\tiny\color{000000}图 1$
- **平面切割出小四面体（$0<K \le N$）**：如图 2-1 , 平面与立方体相交形成以原点为顶点的四面体，如图 2-2 ，体积可直接用 $V_四$ 公式计算。\
![1](https://cdn.luogu.com.cn/upload/image_hosting/2g4gmpiy.png)  
$$\tiny\color{000000}图 2-1$$
![1](https://cdn.luogu.com.cn/upload/image_hosting/w7d0dm2o.png)
$$\tiny\color{000000}图 2-2$$
- **平面切割立方体中部（$N<K \le 2N$）**：如图 3 ，平面与立方体的三个面相交，形成复杂区域，需通过几何分解推导体积公式。\
  ![1](https://cdn.luogu.com.cn/upload/image_hosting/rlr1lmtg.png)
$$\tiny\color{000000}图 3$$
- **平面靠近立方体对角顶点（$2N<K \le 3N$）**：如图 4 ，平面切割后形成以原点为顶点的七面体，$V_七=V_立-V_四$。\
![1](https://cdn.luogu.com.cn/upload/image_hosting/f55bsela.png)
$$\tiny\color{000000}图 4$$
- **平面完全在立方体外部（$K > 3N$）**：如图 5 ，整个立方体都满足 $x+y+z \le K$，$V_立=$ 立方体体积公式。\
![1](https://cdn.luogu.com.cn/upload/image_hosting/pid9y8n6.png)
$$\tiny\color{000000}图 5$$

## 公式推导

- **当 $K \le 0$**\
  此时 $x+y+z \le K$ 无立方体部分，6 倍体积为：   
  >$6 \times 0=0$
- **当 $0<K \le N$**\
  平面切割出的区域是顶点为 $(0,0,0)、(K,0,0)、(0,K,0)、(0,0,K)$ 的四面体。四面体体积公式为 $V_四=\frac{1}{6}K^3$，因此 6 倍体积为：  
  >$K^3$
- **当 $N < K \leq 2N$**\
  平面与立方体的三个面相交，需通过积分或几何分解计算。推导得 6 倍体积公式：
  >$3K^2N - 3KN^2 + N^3 - 2(K - N)^3$
- 当 $2N < K \le 3N$\
  包含原点的部分是整个立方体减去一个小四面体（顶点为 $(N,N,N)$，边长为 $3N - K$）。\
  立方体 6 倍体积为 $6N^3$，小四面体 6 倍体积为 $(3N - K)^3$，因此结果为：  
  >$6N^3 - (3N - K)^3$
- **当 $K > 3N$**\
  整个立方体都满足 $x + y + z \le K$，6 倍体积为立方体体积的 6 倍：  
  >$6N^3$

## 代码实现

根据上述推导，分情况计算结果：

```cpp
#include<bits/stdc++.h>
using namespace std;
long long n,k,res;
int main(){
    cin>>n>>k;
    if(k==0){
        res=0;
    }else if(k<=n){
        res=k*k*k;
    }else if(k<=2*n){
        res=3*k*k*n-3*k*n*n+n*n*n-2*(k-n)*(k-n)*(k-n);
    }else if(k<=3*n){
        res=6*n*n*n-(3*n-k)*(3*n-k)*(3*n-k);
    }else{
        res=6*n*n*n;
    }
    cout<<res<<endl;
    return 0;
}
```
