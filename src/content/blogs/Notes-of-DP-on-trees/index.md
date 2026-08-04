---
title: 笔记——树形动态规划
description: 若如图所示，当前dfs至点u，则转移方程得
tags: [笔记,C++]
publishDate: 2026-06-07 17:45:33
category: ccf
---

:::info{open}
**设计状态**：用 $dp_{u,0/1}$ 表示以 $u$ 为根的子树的最大快乐指数。

**答案**：$\max\{dp_{root,1},dp_{root,0}\}$。
:::

## [P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)

若如图所示，当前 dfs 至点 $u$，则转移方程如下：
$$dp_{u,0}\leftarrow dp_{u,0}+\max(dp_{v,0},dp_{v,1})$$
$$dp_{u,1}\leftarrow dp_{u,1}+dp_{v,0}$$

![1](https://cdn.luogu.com.cn/upload/image_hosting/dizzn16u.png)

所以可以写出以下代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,r[6005],in[6005],rt,dp[6005][2];
vector<int>g[6005];
void dfs(int u){
    for(int v:g[u]){
        dfs(v);
        dp[u][0]+=max(dp[v][0],dp[v][1]);
        dp[u][1]+=dp[v][0];
    }
    dp[u][1]+=r[u];
}
int main(){
    cin>>n;
    for(int i=1;i<=n;++i){
        cin>>r[i];
    }
    for(int i=1;i<n;++i){
        int u,v;
        cin>>u>>v;
        g[v].push_back(u);
        in[u]=1;
    }
    for(int i=1;i<=n;++i){
        if(!in[i]){
            rt=i;
            break;
        }
    }
    dfs(rt);
    cout<<max(dp[rt][0],dp[rt][1];
}
```

## [P2016 [SEERC 2000] 战略游戏](https://www.luogu.com.cn/problem/P2016)

在开始是初始化一下 $dp_{u,0/1}$ 即可。
:::error[为什么不需要初始化 $dp$ 为无穷大]{open}
在 dfs 中会遍历每个子节点，所以初始化子节点即可，**树形 DP 无需 memset** $dp$ 数组。
:::

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,in[5005],dp[5005][2],rt;
vector<int>g[5005];
void dfs(int u){
    dp[u][0]=0;
    dp[u][1]=1;
    for(int v:g[u]){
        dfs(v);
        dp[u][0]+=dp[v][1];
        dp[u][1]+=min(dp[v][0],dp[v][1]);
    }
}
int main(){
    cin>>n;
    for(int i=1;i<=n;++i){
        int u,k,v;
        cin>>u>>k;
        u++;
        for(int j=1;j<=k;++j){
            cin>>v;
            v++;
            g[u].push_back(v);
            in[v]=1;
        }
    }
    for(int i=1;i<=n;++i){
        if(!in[i]){
            rt=i;
            break;
        }
    }
    dfs(rt);
    cout<<min(dp[rt][0],dp[rt][1]);
    return 0;
}
```

## [P1122 最大子树和](https://www.luogu.com.cn/problem/P1122)

![1](https://cdn.luogu.com.cn/upload/image_hosting/f1kj14gd.png)

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,a[16005],dp[16005],ans=INT_MIN;
vector<int>g[16005];
void dfs(int u,int fa){
    dp[u]=a[u];
    for(int v:g[u]){
        if(v!=fa){
            dfs(v,u);
            dp[u]+=max(0,dp[v]);
        }
    }
}
int main(){
    cin>>n;
    for(int i=1;i<=n;++i)cin>>a[i];
    for(int i=1;i<n;++i){
        int u,v;
        cin>>u>>v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    dfs(1,0);
    for(int i=1;i<=n;++i){
        ans=max(dp[i],ans);
    }
    cout<<ans;
    return 0;
}
```

## [P2585 [ZJOI2006] 三色二叉树](https://www.luogu.com.cn/problem/P2585)
