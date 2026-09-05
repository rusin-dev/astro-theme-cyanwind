---
title: 单源最短路算法
description: 本文将会单源最短路的定义，并给出 SPFA、Bellman-Ford、Dijkstra 等多种用于求单源最短路的算法并进行比较。
publishDate: 2026-09-05
language: zh
category: ccf
tags: [c++, 笔记]
---

## 定义

**单源最短路**的定义：给定一个起点，求它到所有其他点的最短距离。

:::info[注]{open}
这里给出的定义较宽泛，没有提到边权的非负性。  
在做题过程中，这点需要注意，并根据题面选择算法。
:::

现在，来看看怎么解决此类问题。

模板题：  
[P3371 【模板】单源最短路径（弱化版）](https://www.luogu.com.cn/problem/P3371)  
[P4779 【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)

## Dijkstra 算法

### 算法思想

**前提**：所有边权非负。

Dijkstra 核心思想：贪心 + 逐步确定。

想象从起点 $s$ 出发，初始只知道到 $s$ 自己的距离是 $0$，到其他点都设为无穷大。然后不断做一件事：

> 在**还没确定最短距离**的点中，选一个**当前距离最小**的点，这个距离就是它的最终最短距离。

反证法：如果这个距离不是它的最终最短距离，则必存在一条距离更短的路，但不可能通过其他未确定点再绕路到 $u$ 得到更短距离，因为任何绕路都会先经过一个距离更大的点，再加上非负边权，只会更远。故假设不成立，结论成立。

所以我们可以把这个点“确定”下来，并用它去更新它的邻接点，直到所有点都被最终最短距离都被确定。

### 算法步骤

$s$ 表示源点。

初始化整个 $dis$ 为 INF，然后令 $dis_s = 0$。  
遍历最多 $n$ 次，每次确定一个点 $u$ 的最终最短距离（松弛）：

- 在所有未确定的点中，找到 $dis_u$ 最小的点 $u$。
- 将 $u$ 标记为已确定，此时 $dis_u$ **已经是** $s$ 到 $u$ 的最短距离，后续不会再被更新。
- 如果没有任何未确定的点，则说明所有点最短距离已确定，可以 `break`。否则遍历 $u$ 的所有出边 $u \to v$，如果 $dis_u+w<dis_v$，更新 $dis_v$。

### 朴素实现

朴素实现每次找最小值要扫一遍所有点，时间复杂度 $O(n^2)$。对于稠密图（边数接近 $n^2$），这样反而简单。

代码：

```cpp
//P3371
#include<bits/stdc++.h>
using namespace std;
const int N=10005,M=500005;
int n,m,s,head[N],cnt,dis[N],vis[N];
struct edge{
    int w,to,nxt;
}e[M];
void add(int u,int v,int w){
    e[++cnt].w=w;
    e[cnt].to=v;
    e[cnt].nxt=head[u];
    head[u]=cnt;
}
void dij(int s){
    for(int i=0;i<N;++i)dis[i]=0x3f3f3f3f;
    dis[s]=0;
    for(int i=1;i<=n;++i){
        int u=-1;
        for(int j=1;j<=n;++j){
            if(!vis[j]&&(u==-1||dis[j]<dis[u])){
                u=j;
            }
        }
        if(u==-1)break;
        vis[u]=1;
        for(int j=head[u];~j;j=e[j].nxt){
            int v=e[j].to;
            if(dis[u]+e[j].w<dis[v]){
                dis[v]=dis[u]+e[j].w;
            }
        }
    }
}
int main(){
    cin>>n>>m>>s;
    memset(head,-1,sizeof head);
    for(int i=1;i<=m;++i){
        int u,v,w;
        cin>>u>>v>>w;
        add(u,v,w);
    }
    dij(s);
    for(int i=1;i<=n;++i){
        if(dis[i]==0x3f3f3f3f)cout<<2147483647<<' ';
        else cout<<dis[i]<<" ";
    }
    return 0;
}
```

### 堆优化实现

把“找最小 dist 的点”交给优先队列。但要注意：优先队列里可能存多个同一个点的不同距离记录，取出时需要判断是否已经确定过。

关键数据结构：优先队列。用于维护小根堆。

代码：

```cpp
//P4779
#include<bits/stdc++.h>
#define pii pair<int,int>
using namespace std;
const int N=100005,M=200005;
int n,m,s,head[N],cnt,dis[N],vis[N];
struct edge{
    int w,to,nxt;
}e[M];
void add(int u,int v,int w){
    e[++cnt].w=w;
    e[cnt].to=v;
    e[cnt].nxt=head[u];
    head[u]=cnt;
}
priority_queue<pii,vector<pii>,greater<pii> >pq;
void dij(int s){
    for(int i=0;i<N;++i)dis[i]=0x3f3f3f3f;
    dis[s]=0;
    pq.push(make_pair(0,s));
    while(!pq.empty()){
        pii t=pq.top();
        pq.pop();
        int d=t.first,u=t.second;
        if(vis[u])continue;
        vis[u]=1;
        for(int i=head[u];~i;i=e[i].nxt){
            int v=e[i].to,w=e[i].w;
            if(dis[u]+w<dis[v]){
                dis[v]=dis[u]+w;
                pq.push(make_pair(dis[v],v));
            }
        }
    }
}
int main(){
    cin>>n>>m>>s;
    memset(head,-1,sizeof head);
    for(int i=1;i<=m;++i){
        int u,v,w;
        cin>>u>>v>>w;
        add(u,v,w);
    }
    dij(s);
    for(int i=1;i<=n;++i){
        if(dis[i]==0x3f3f3f3f)cout<<2147483647<<' ';
        else cout<<dis[i]<<" ";
    }
    return 0;
}
```

## Bellman-Ford 算法

Bellman-Ford 是 SPFA 的简单版，它比 SPFA 更基础，理解了它，SPFA 就是水到渠成的事。

### 算法思想

Dijkstra 是“每次确定一个点”，而 Bellman-Ford 换了一种思路：不知道哪个点可以确定，那就干脆每一轮把所有边都松弛一遍，反复进行，直到所有距离都稳定下来。  
因作者实力原因（？），此处暂不提供算法正确性证明。

如果要判负环，则在 $n-1$ 轮结束后，再进行 $1$ 轮，如果仍然有边能被松弛，说明存在负权环。因为正常最短路最多 $n-1$ 条边，超过这个边数还能继续变短，只能是环上总权为负，绕圈会无限变短。

和 Dijkstra 不同，它能处理带负权边的图。

:::warning[提醒]
由于复杂度较高，如果是判负环，可以用 SPFA，如果单源最短路，那就有更多更优算法可使用了，所以 Bellman-Ford 在实际竞赛中不如 SPFA 常用。但它的思想是 SPFA 和差分约束等算法的基础
:::

### 算法步骤

初始化整个 $dis$ 为 INF，然后令 $dis_s = 0$。

循环 $n-1$ 次，遍历的所有边 $u \to v$，如果 $dis_u+w<dis_v$，更新 $dis_v$ 即可。

:::info[为什么是 n-1 轮]{open}
一条最短路径最多经过 $n$ 个点，也就是最多有 $n-1$ 条边。每完整松弛一轮所有边，相当于把路径上“已知最短距离”的信息向后推进至少一条边。最坏情况下，第一轮只能确定只经过 $1$ 条边的最短路，第二轮确定经过 $2$ 条边的，依此类推。所以 $n-1$ 轮足够覆盖任何最短路径。
:::

如果要判负环，则再进行 $1$ 轮，如果仍然有边能被松弛，则存在负权环。

复杂度 $O(nm)$。

### 代码

单源最短路代码暂不提供，见 SPFA。

判负环：

```cpp
//P3385
#include<bits/stdc++.h>
using namespace std;
const int N=2e3+5,M=3e3+5;
int T,n,m,cnt,dis[N];
struct edge{
    int u,v,w;
}e[2*M];
void add(int u,int v,int w){
    e[++cnt]={u,v,w};
}
bool BellmanFord(){
    bool f=0;
    for(int i=1;i<=n;++i){
        bool upd=0;
        for(int j=1;j<=cnt;++j){
            int u=e[j].u,v=e[j].v,w=e[j].w;
            if(dis[u]!=0x3f3f3f3f&&dis[u]+w<dis[v]){
                dis[v]=dis[u]+w;
                upd=1;
            }
        }
        if(!upd)break;
        if(i==n&&upd)f=1;
    }
    return f;
}
int main(){
    cin>>T;
    while(T--){
        cin>>n>>m;
        cnt=0;
        for(int i=1;i<=m;++i){
            int u,v,w;
            cin>>u>>v>>w;
            if(w>=0){
                add(u,v,w);
                add(v,u,w);
            }else{
                add(u,v,w);
            }
        }
        for(int i=0;i<N;++i)dis[i]=0x3f3f3f3f;
        dis[1]=0;
        cout<<(BellmanFord()?"YES":"NO")<<'\n';
    }
    return 0;
}
```

## SPFA 算法

### 改进之处

它是 Bellman-Ford 的队列优化版。

Bellman-Ford 每一轮都无脑遍历所有边，不管这条边有没有可能被松弛。但事实上，只有当某个点的 $dis$ 在上一次被更新后，它**才可能**去更新它的邻居。  
如果这一轮某个点的距离没变，那用它去松弛邻居也是白费功夫。SPFA 就抓住了这一点，只处理“距离刚被更新的点”。

### 算法思想

维护一个队列，里面放着“距离刚被更新、还没处理”的点。每次从队首取一个点，尝试松弛它的所有出边。如果某个邻居被成功更新，且它不在队列中，就把它入队。如此反复，直到队列为空。  
这个过程很像 BFS，但点可以多次入队，因为一个点的距离可能被多次更新。

如果要判负环：因为在无负环的图中，每个点最多被松弛 $n-1$ 次，所以入队次数不会超过 $n-1$。如果某个点入队次数达到 $n$ 次，说明它被松弛了至少 $n$ 次，必然存在负环。

### 算法流程

初始化整个 $dis$ 为 INF，然后令 $dis_s = 0$。  
把 $s$ 入队，标记 $inq_s=1$。  
当队列非空：

- 取队首 $u$，出队，$inq_u=0$。
- 遍历 $u$ 的所有出边 $u \to v$，如果 $dis_u+w<dis_v$：
  - 更新 $dis_v$。
  - 如果 $inq_v=0$，把 $v$ 入队，$inq_v=1$。

如果要判负环，就开一个 $cnt\_inq$ 记录每个点入队次数。每次入队时 `cnt_inq[v]++`，如果 $cnt_inq[v] \ge n$，就判定有负环。

### 和 Bellman-Ford 对比

| 对比项 | Bellman-Ford | SPFA |
| :------: | :-----------: | :---: |
| 核心操作 | 每轮遍历所有边 | 只处理更新过的点 |
| 判负环 | 第 $n$ 轮还能松弛 | 某点入队次数 $\ge n$ |
| 时间复杂度 | 稳定 $O(nm)$ | 平均 $O(km)$，最坏 $O(nm)$ |
| 实际速度 | 慢 | 通常快很多，但可能被卡 |

### 代码

单源最短路:

```cpp
//P3371
#include<bits/stdc++.h>
using namespace std;
const int N=10005,M=500005;
int n,m,s,head[N],cnt,dis[N],vis[N],inq[N];
struct edge{
    int w,to,nxt;
}e[M];
void add(int u,int v,int w){
    e[++cnt].w=w;
    e[cnt].to=v;
    e[cnt].nxt=head[u];
    head[u]=cnt;
}
queue<int>q;
void spfa(int s){
    for(int i=0;i<N;++i)dis[i]=0x3f3f3f3f;
    dis[s]=0;
    q.push(s);
    inq[s]=1;
    while(!q.empty()){
        int u=q.front();
        q.pop();
        inq[u]=0;
        for(int i=head[u];~i;i=e[i].nxt){
            int v=e[i].to,w=e[i].w;
            if(dis[u]+w<dis[v]){
                dis[v]=dis[u]+w;
                if(inq[v]==0){
                    q.push(v);
                    inq[v]=1;
                }
            }
        }
    }
}
int main(){
    cin>>n>>m>>s;
    memset(head,-1,sizeof head);
    for(int i=1;i<=m;++i){
        int u,v,w;
        cin>>u>>v>>w;
        add(u,v,w);
    }
    spfa(s);
    for(int i=1;i<=n;++i){
        if(dis[i]==0x3f3f3f3f)cout<<2147483647<<' ';
        else cout<<dis[i]<<" ";
    }
    return 0;
}
```

判负环：

```cpp
//P3385
#include<bits/stdc++.h>
using namespace std;
const int N=2e3+5,M=3e3+5;
int T,n,m,head[N],cnt,dis[N],inq[N],quecnt[N];
struct edge{
    int w,to,nxt;
}e[2*M];
void add(int u,int v,int w){
    e[++cnt].w=w;
    e[cnt].to=v;
    e[cnt].nxt=head[u];
    head[u]=cnt;
}
queue<int>q;
bool spfa(){
    for(int i=0;i<N;++i)dis[i]=0x3f3f3f3f;
    dis[1]=0;
    q.push(1);
    inq[1]=1;
    quecnt[1]++;
    while(!q.empty()){
        int u=q.front();
        q.pop();
        inq[u]=0;
        if(dis[u]==0x3f3f3f3f)continue;
        for(int i=head[u];~i;i=e[i].nxt){
            int v=e[i].to,w=e[i].w;
            if(dis[u]+w<dis[v]){
                dis[v]=dis[u]+w;
                if(inq[v]==0){
                    q.push(v);
                    quecnt[v]++;
                    if(quecnt[v]>=n)return true;
                    inq[v]=1;
                }
            }
        }
    }
    return false;
}
int main(){
    cin>>T;
    while(T--){
        cin>>n>>m;
        cnt=0;
        memset(head,-1,sizeof head);
        memset(inq,0,sizeof inq);
        memset(quecnt,0,sizeof quecnt);
        while(!q.empty())q.pop();
        for(int i=1;i<=m;++i){
            int u,v,w;
            cin>>u>>v>>w;
            if(w>=0){
                add(u,v,w);
                add(v,u,w);
            }else{
                add(u,v,w);
            }
        }
        cout<<(spfa()?"YES":"NO")<<'\n';
    }
    return 0;
}
```

更多算法待补充……

## 对比

| 算法 | 能否处理负权边 | 是否判负环 | 时间复杂度 | 实现难度 | 稳定性 |
| :------: | :---------------: | :-----------: | :-----------: | :---------: | :--------: |
| Dijkstra（朴素） | 不能 | 不能 | $O(n² + m)$ | 简单 | 稳定 |
| Dijkstra（堆优化） | 不能 | 不能 | $O((n+m) log m)$ | 中等 | 稳定 |
| Bellman-Ford | 能 | 能 | $O(nm)$ | 较简单 | 稳定 |
| SPFA | 能 | 能 | 平均 $O(km)$，最坏 $O(nm)$ | 中等 | 不稳定（可被卡） |

## 结语

在 [NOI 大纲 2025 修订版](https://www.noi.cn/upload/resources/file/2025/04/18/NOI_Syllabus_Edition_2025.pdf) 中，单源最短路位于提高组 $2.2.4$ 中的 7.图论算法中的第【6】项，是图论中较为基础的算法。学会它，也可以为以后更多更复杂的图论算法打下坚实的基础。
