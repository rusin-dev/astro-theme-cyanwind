---
title: 网络流笔记
description: 增广路ek模板Dinic模板,网络流的定义
publishDate: 2026-06-06
tags: [笔记,C++]
category: ccf
---

## 增广路

ek 模板：

```cpp
#include<bits/stdc++.h>
using ll=long long;
using namespace std;
const int N=205,M=5005;
int n,m,s,t,cnt=1,head[N],pre[N],mf[N];
/*
mf：当前增广路可通过水流
*/
struct edge{
	int nxt,to,w;
}e[2*M];
void add(int u,int v,int w){
	e[++cnt].w=w;
	e[cnt].to=v;
	e[cnt].nxt=head[u];
	head[u]=cnt;
}
bool bfs(){
	memset(mf,0,sizeof mf);
	queue<int>q;
	q.push(s);
	mf[s]=1e9;
	while(!q.empty()){
		int u=q.front();
		q.pop();
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(mf[v]==0&&e[i].w){
				mf[v]=min(mf[u],e[i].w);
				pre[v]=i;
				q.push(v);
				if(v==t)return 1;
			}
		}
	}
	return 0;
}
ll ek(){
	ll fl=0;
	while(bfs()){
		int v=t;
		while(v!=s){
			int i=pre[v];
			e[i].w-=mf[t];
			e[i^1].w+=mf[t];
			v=e[i^1].to;
		}
		fl+=mf[t];
	}
	return fl;
}
int main(){
	cin>>n>>m>>s>>t;
	for(int i=1;i<=m;++i){
		int u,v,w;
		cin>>u>>v>>w;
		add(u,v,w);
		add(v,u,0);
	}
	cout<<ek();
	return 0;
}
```

Dinic 模板：

```cpp line-umbers
#include<bits/stdc++.h>
#define ll long long
using namespace std;
const int M=5005;
int n,m,s,t,head[M],tot=1,d[M],cur[M];
struct edge{
	int v,nxt;
	ll flow;
}e[2*M];
void add(int u,int v,int w){
	e[++tot]={v,head[u],w},head[u]=tot;
}
bool bfs(){
	memset(d,0,sizeof d);
	memcpy(cur,head,sizeof head);
	queue<int>q;
	q.push(s);
	d[s]=1;
	while(!q.empty()){
		int u=q.front();
		q.pop();
		for(int i=head[u];~i;i=e[i].nxt){
			int v=e[i].v;
			if(!d[v]&&e[i].flow){
				d[v]=d[u]+1;
				if(v==t)return true;
				q.push(v);
			}
		}
	}
	return false;
}
ll dfs(int u,ll flow){
	if(u==t||!flow)return flow;
	ll rest=flow;
	for(int &i=cur[u];~i;i=e[i].nxt){
		int v=e[i].v;
		if(d[v]==d[u]+1&&e[i].flow){
			ll k=dfs(v,min(rest,e[i].flow));
			if(!k)d[v]=0;
			e[i].flow-=k,e[i^1].flow+=k;
			if(!(rest-=k))break;
		}
	}
	return flow-rest;
}
ll dinic(){
	ll maxflow=0;
	while(bfs())maxflow+=dfs(s,INT_MAX);
	return maxflow;
}
int main(){
	memset(head, -1, sizeof(head));
	cin>>n>>m>>s>>t;
	for(int i=1;i<=m;++i){
		int u,v,w;
		cin>>u>>v>>w;
		add(u,v,w),add(v,u,0);
	}
	cout<<dinic();
	return 0;
}
```

- [OI wiki](https://oi-wiki.org/graph/flow/)
- [problems 1](https://www.luogu.com.cn/problem/list?tag=79) & [problems 2](https://www.luogu.com.cn/problem/list?tag=332)

:::warning[请注意]{open}
本文章使用了 AI 辅助编写，请谨慎鉴别。
:::

## Part. 1 网络流的定义

### 1.1 流网络

一个流网络是一个四元组 $N=(G,c,s,t)$，其中：

- $G=(V,E)$ 是一个无自环有向图。
- $c:E\mapsto[0,+\infty)$ 是容量函数，$c(u,v)\geqslant0$。
- $s\in V$ 是源点，$t\in V$ 是汇点，$s\ne t$。

### 1.2 流

一个流是函数 $f:E\to\mathbb{R}_{\geqslant0}$，满足：

(1) 容量约束：对每条边 $(u,v)\in E$，
$$0\leqslant f(u,v)\leqslant c(u,v)$$

(2) 流量守恒：对每个节点 $u\in V\setminus\{s,t\}$，
$$\sum_{v:(v,u)\in E} f(v,u) = \sum_{v:(u,v)\in E} f(u,v)$$
即，流入量等于流出量。

### 1.4 净流量函数与流的值

对任意节点 $u\in V$，定义净流量：
$$\text{net}_f(u) = \sum_{v:(u,v)\in E} f(u,v) - \sum_{v:(v,u)\in E} f(v,u)$$

于是：

- 对 $u\in V\setminus\{s,t\}$：$\text{net}_f(u)=0$（流量守恒）。
- 对源点：$\text{net}_f(s)=\left\lvert f\right\rvert$。
- 对汇点：$\text{net}_f(t)=-\left\lvert f\right\rvert$。

注：在标准建模中，通常没有边指向源点，此时第二项为 $0$。

## Part. 2 割的定义

设 $S\sub V$ 满足 $s\in S$ 且 $t\notin S$。令 $T=V\setminus S$。

割是指集合对 $(S,T)$。

割的容量定义为：
$$c(S,T) = \sum_{\substack{(u,v)\in E \\ u\in S,\,v\in T}} c(u,v)$$

即从 $S$ 指向 $T$ 的边的容量之和。

最小割是指容量最小的割。

## Part.3 最大流最小割定理

定理：对任意流网络，最大流的值等于最小割的容量：
$$\max\left\lvert f\right\rvert = \min_{S: s\in S,\,t\notin S} c(S,T)$$

::::info[证明]

#### $1\degree$ 弱对偶性（流 $\leqslant$ 割）

引理 1：对任意可行流 $f$ 和任意 $s{-}t$ 割 $(S,T)$，有 $\left\lvert f\right\rvert \leqslant c(S,T)$。

:::info[证明]

首先，可将 $\left\lvert f\right\rvert$ 写成 $S$ 中所有节点的净流量之和：
$$\left\lvert f\right\rvert = \sum_{u\in S} \text{net}_f(u)$$

将净流量展开：
$$\begin{aligned}
\left\lvert f\right\rvert &= \sum_{u\in S} \left( \sum_{v:(u,v)\in E} f(u,v) - \sum_{v:(v,u)\in E} f(v,u) \right) \\
&= \sum_{u\in S}\sum_{v:(u,v)\in E} f(u,v) - \sum_{u\in S}\sum_{v:(v,u)\in E} f(v,u)
\end{aligned}$$

交换求和顺序。第一项中，$(u,v)$ 的起点 $u$ 在 $S$ 中；第二项中，$(v,u)$ 的终点 $u$ 在 $S$ 中，等价于起点 $v$ 可以属于 $S$ 或 $T$。将第二项按起点分类：

$$
\left\lvert f\right\rvert = \sum_{u\in S,\,v\in V} f(u,v) - \sum_{v\in V,\,u\in S} f(v,u)
$$

将 $V$ 拆成 $S$ 和 $T$：

$$\left\lvert f\right\rvert = \cancel{\sum_{u\in S,\,v\in S} f(u,v)} + \sum_{u\in S,\,v\in T} f(u,v) - \cancel{\sum_{v\in S,\,u\in S} f(v,u)} - \sum_{v\in T,\,u\in S} f(v,u) = \sum_{u\in S,\,v\in T} f(u,v) - \sum_{v\in T,\,u\in S} f(v,u)$$

第一项是从 $S$ 到 $T$ 的边的流量之和，第二项是从 $T$ 到 $S$ 的边的流量之和。由于流量非负，第二项 $\geqslant 0$，因此：

$$\left\lvert f\right\rvert \leqslant \sum_{u\in S,\,v\in T} f(u,v)$$

再由容量约束 $f(u,v) \leqslant c(u,v)$，得：

$$\left\lvert f\right\rvert \leqslant \sum_{u\in S,\,v\in T} c(u,v) = c(S,T)$$

证毕！
:::

故，推论：最大流 $\leqslant$ 最小割。

#### $2\degree$ 强对偶性（$\exist$ 流 $=$ 某个割）

引理2：设 $f$ 是最大流，定义 $S$ 为残量网络中从 $s$ 出发可达的节点集合。则 $(S,T)$ 是一个割，且 $\left\lvert f\right\rvert = c(S,T)$。

:::info[残量网络定义]{open}
对原图每条边 $(u,v)$，在残量网络中保留两条有向边：
- 正向残量边：容量为 $c(u,v)-f(u,v)$（还可增加流量）
- 反向残量边：容量为 $f(u,v)$（还可减少流量）
:::

:::info[证明]

**先证明** $t\notin S$。

反证法。假设 $t\in S$，则 $\exist$ 一条从 $s$ 到 $t$ 的残量路径。沿着这条路径，我们可以增加一个正数 $\delta$ 的流量（取路径上 $\min$ 残量），从而得到更大的流，与 $f$ 是最大流矛盾。因此 $t\notin S$，故 $(S,T)$ 是 $s{-}t$ 割。

**再证明** $\forall\,u\in S,\ v\in T$，原边 $(u,v)$ 必然饱和。

依旧反证法。若 $\exist\,u\in S$，$v\in T$ 使得 $f(u,v) < c(u,v)$，则正向残量 $c(u,v)-f(u,v) > 0$，意味着残量网络中有一条从 $u$ 到 $v$ 的边。由于 $u\in S$（从 $s$ 可达），那么 $v$ 也可达，从而 $v\in S$，与 $v\in T$ 矛盾。因此 $f(u,v)=c(u,v)$。

**接着证明** $\forall\,u\in T$，$v\in S$，原边 $(u,v)$ 必然无流量。

还是反证法。若存在 $u\in T$，$v\in S$ 使得 $f(u,v) > 0$，则反向残量 $f(u,v) > 0$，意味着残量网络中有一条从 $v$ 到 $u$ 的边。由于 $v\in S$（从 $s$ 可达），那么 $u$ 也可达，从而 $u\in S$，与 $u\in T$ 矛盾。因此 $f(u,v)=0$。

**最后计算** $\left\lvert f\right\rvert$。

由弱对偶性证明中的等式：
$$\left\lvert f\right\rvert = \sum_{u\in S,\,v\in T} f(u,v) - \sum_{v\in T,\,u\in S} f(v,u)$$

由“再证明”的结论，第一项中 $f(u,v)=c(u,v)$；由“接着证明”的结论，第二项中 $f(v,u)=0$。因此：
$$\left\lvert f\right\rvert = \sum_{u\in S,\,v\in T} c(u,v) = c(S,T)$$

这就找到了一个割，其容量等于 $\left\lvert f\right\rvert$。证毕！
:::

综上，证毕！
::::

## Part. 4 增广路定理

定理：一个可行流 $f$ 是最大流当且仅当残量网络 $G_f$ 中不存在 $s$ 到 $t$ 的路径（称为增广路）。

:::info[证明]
（$\Rightarrow$）若存在增广路 $P$，设 $\delta = \min\{r(u,v): (u,v)\in P\} > 0$。沿 $P$ 增加 $\delta$ 流量：
- 对正向残量边：$f(u,v) \leftarrow f(u,v) + \delta$
- 对反向残量边：$f(v,u) \leftarrow f(v,u) - \delta$

得到的新流仍满足容量约束，且 $|f'| = \left\lvert f\right\rvert + \delta > \left\lvert f\right\rvert$，故 $f$ 不是最大流。逆否命题成立。

（$\Leftarrow$）若无增广路，定义 $S$ 为 $s$ 在 $G_f$ 中可达的节点集，则 $t\notin S$。由 Part.3 “再证明”的证明过程，$\left\lvert f\right\rvert = c(S,T)$，再由弱对偶性知 $f$ 是最大流。证毕！
:::

## Part.5 Dinic 算法的分层图引理

定义：在残量网络中，定义 $d(u)$ 为从 $s$ 到 $u$ 的最短边数（BFS 距离）。边 $(u,v)$ 称为允许边若 $d(v) = d(u) + 1$ 且残量 $>0$。所有允许边构成分层图 $L_f$。阻塞流是指在 $L_f$ 中无法再找到增广路的流。

引理：记 $d_k(t)$ 为第 $k$ 次阻塞流增广后 $t$ 的距离。则 $d_{k+1}(t) > d_k(t)$。

:::info[证明]
设 $f$ 是当前流，$f'$ 是增广一次阻塞流后得到的新流。考虑 $G_{f'}$ 中 $s$ 到 $t$ 的最短路径 $P$。若 $P$ 中存在一条边 $(u,v)$ 在 $G_f$ 中不存在（即由增广操作新产生的反向边），则 $f(v,u) > 0$，这意味着在 $G_f$ 中 $u$ 到 $v$ 有容量 $>0$ 的边。由 $P$ 的最短性可推出矛盾。因此 $P$ 中的所有边都在 $G_f$ 中存在，但阻塞流增广后，至少有一条 $G_f$ 中的最短路径上的边被饱和，故 $P$ 的长度必然大于 $d_k(t)$。证毕！
:::

推论：Dinic 算法中 BFS 的次数不超过 $\lvert V\rvert$，故总复杂度 $O(\lvert V\rvert^2\lvert E\rvert)$。

## Part.6 Dinic 算法实践

### 当前弧优化

代码中的 `cur[]` 实现了当前弧优化。其原理是：在 DFS 过程中，若某条边已被尝试且无法推送更多流量，则同一轮 BFS 分层中无需再次尝试，直接从下一条边开始。

### 代码

```cpp
struct Edge { int to, weight, nxt; } edges[MAXM << 1];
int head[MAXN], ecnt = 2, n, m;
void addedge(int u, int v, int weight) {
    edges[ecnt] = Edge{v, weight, head[u]};
    head[u] = ecnt++;
}

int dep[MAXN], cur[MAXN], s, t;
bool bfs() {
    clean(dep);
    queue < int > q;
    dep[s] = 1;
    q.psh(s);
    while (q.size()) {
        int u = q.front(); q.pop();
        for (int i = head[u]; i; i = edges[i].nxt) {
            int v = edges[i].to;
            if (!dep[v] && edges[i].weight) {
                dep[v] = dep[u] + 1; q.psh(v);
                if (v == t) return true;
            }
        }
    }
    return false;
}

int dfs(int u, int flow) {
    if (u == t) return flow;
    int used = 0;
    for (int &i = cur[u]; i; i = edges[i].nxt) {
        int v = edges[i].to;
        if (dep[v] == dep[u] + 1 && edges[i].weight) {
            int res = dfs(v, min(flow - used, edges[i].weight));
            if (res) {
                edges[i].weight -= res;
                edges[i ^ 1].weight += res;
                used += res;
            }
            if (used == flow) break;
        }
    }
    return used;
}

int dinic() {
    int mf = 0;
    while (bfs()) {
        memcpy(cur, head, sizeof cur);
        while (int res = dfs(s, inf)) mf += res;
    }
    return mf;
}
```

## Part.7 HLPP（最高标号预流推进）算法

### 7.1 算法思想和基本概念

HLPP（Highest-Label Preflow Push）与 Dinic 等增广路算法不同，采用预流推进的思路：

1. 不保持流量守恒：允许节点暂时存储超额流。
2. 高度函数：给每个节点一个高度，流只能从高处向低处推送。
3. 最高标号优先：每次选择高度最高的活跃节点处理。

定义超额流 $e(u)$：
$$e(u) = \sum_{v} f(v,u) - \sum_{v} f(u,v)$$

- 当 $e(u) > 0$ 时，$u$ 称为**活跃节点**
- 源点 $s$ 和汇点 $t$ 除外

定义高度函数 $h(u)$：
- 流只能从高向低推：$h(u) = h(v) + 1$
- 初始高度：从 $t$ 反向 BFS 得到，$h(t)=0$，$h(s)=n$

### 7.2 核心操作

推流：当 $e(u) > 0$ 且存在边 $(u,v)$ 满足 $r(u,v) > 0$ 且 $h(u) = h(v) + 1$ 时，推送流量：
$$\delta = \min(e(u), r(u,v))$$

重贴标签：当 $e(u) > 0$ 但无可推流的邻居时，更新高度：
$$h(u) = \min\{h(v) + 1 \mid r(u,v) > 0\}$$

### 7.4 核心优化

- 最高标号优先：使用优先队列或桶维护活跃节点，每次取高度最大的处理。

- GAP 优化：若某个高度 $k$ 的节点数为 0，则所有高度 $>k$ 的节点无法到达 $t$，直接将其高度设为 $n+1$。

- 当前弧优化：与 Dinic 相同，避免重复遍历已饱和的边。

### 7.5 算法流程

```cpp
HLPP(s, t):
    1. 反向 BFS 初始化高度 h，h[s] = n
    2. 从 s 饱和推流，将活跃节点入桶
    3. while mxh >= 0:
         u = 桶中最高高度的节点
         for 当前弧遍历出边:
             if 边有残量 and h[u] == h[v] + 1:
                 push(u, v)
                 if e[u] == 0: break
         if e[u] > 0:
             relabel(u)
    4. return e[t]
```

### 7.6 代码实现

```cpp
struct Edge { int to, nxt, cap; } edges[MAXM];
int head[MAXN], ecnt = 2, n, m;
void addedge(int u, int v, int cap) {
    edges[ecnt] = {v, head[u], cap}, head[u] = ecnt++;
    edges[ecnt] = {u, head[v], 0}, head[v] = ecnt++;
}

int h[MAXN], eflow[MAXN], cur[MAXN], gap[MAXN << 1], mxh, s, t;
vi bucket[MAXN << 1];
bool inq[MAXN];

void bfs() {
    memset(h, 0x3f, sizeof h);
    static int q[MAXN], qh, qt;
    h[t] = 0, q[qt = 0] = t, qh = 0, ++qt;
    while (qh < qt) {
        int u = q[qh++];
        for (int i = head[u]; i; i = edges[i].nxt) {
            int v = edges[i].to;
            if (edges[i ^ 1].cap && h[v] > h[u] + 1)
                h[v] = h[u] + 1,
                q[qt++] = v;
        }
    }
    h[s] = n;
}

void push(int u) {
    for (int &i = cur[u]; i; i = edges[i].nxt) {
        int v = edges[i].to;
        if (edges[i].cap && h[u] == h[v] + 1) {
            int delta = min(eflow[u], edges[i].cap);
            if (!delta) continue;
            edges[i].cap -= delta, edges[i ^ 1].cap += delta;
            eflow[u] -= delta, eflow[v] += delta;
            if (v != s && v != t && !inq[v] && eflow[v])
                inq[v] = true,
                bucket[h[v]].pb(v),
                mxh = max(mxh, h[v]);
            if (!eflow[u]) break;
        }
    }
}

void relabel(int u) {
    int mnh = inf;
    for (int i = head[u]; i; i = edges[i].nxt)
        if (edges[i].cap) mnh = min(mnh, h[edges[i].to]);
    int nwh = mnh + 1;
    if (!(--gap[h[u]]) && h[u] < n) {
        up(i, 1, n) if (i != s && i != t && h[i] > h[u] && h[i] <= n) h[i] = n + 1;
        up(i, h[u] + 1, n) {
            for (int v : bucket[i]) inq[v] = false;
            bucket[i].clear();
            gap[n] += gap[i], gap[i] = 0;
        }
    }
    h[u] = nwh;
    if (nwh <= n)
        ++gap[nwh],
        bucket[nwh].pb(u),
        inq[u] = true,
        mxh = max(mxh, nwh);
    cur[u] = head[u];
}

int hlpp() {
    if (s == t) return 0;
    bfs(); clean(gap), clean(eflow), clean(inq);
    up(i, 1, n) {
        if (h[i] < n) ++gap[h[i]];
        else ++gap[n];
    }
    for (int i = head[s]; i; i = edges[i].nxt) {
        int v = edges[i].to, cap = edges[i].cap;
        if (cap) {
            edges[i].cap -= cap, edges[i ^ 1].cap += cap;
            eflow[s] -= cap, eflow[v] += cap;
            if (v != t && eflow[v] && !inq[v] && h[v] < n)
                inq[v] = true,
                bucket[h[v]].pb(v),
                mxh = max(mxh, h[v]);
        }
    }
    while (mxh >= 0) {
        while (mxh >= 0 && bucket[mxh].empty()) --mxh;
        if (mxh < 0) break;
        int u = bucket[mxh].back(); bucket[mxh].ppb(); inq[u] = false;
        if (!eflow[u]) continue;
        if (!cur[u]) cur[u] = head[u];
        push(u);
        if (eflow[u]) relabel(u);
    }
    return eflow[t];
}
```

## Part.8 题目选讲 A

### [P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376) & [P4722 【模板】最大流 加强版 / 预流推进](https://www.luogu.com.cn/problem/P4722)

模板题，代码见上。 

### [P2740 [USACO4.2] 草地排水 Drainage Ditches](https://www.luogu.com.cn/problem/P2740)

$$s=1,\ t=n$$

### [P2936 [USACO09JAN] Total Flow S](https://www.luogu.com.cn/problem/P2936)

换成字符。

### [P1343 地震逃生](https://www.luogu.com.cn/problem/P1343)

$ans=0$ 特判。

### [P3386 【模板】二分图最大匹配](https://www.luogu.com.cn/problem/P3386)

构造：

- 虚拟一个 $s$，与左部所有点建边。
- 左右部建边。
- 虚拟一个 $t$，与右部所有点建边。

如图：

![1](https://cdn.luogu.com.cn/upload/image_hosting/u9ov9vcs.png)
