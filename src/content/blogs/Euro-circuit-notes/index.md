---
title: 图论之欧拉回路、差分约束——算法笔记
publishDate: 2026-04-03 21:17:47
tags: [题解,C++]
description: 本文讲述了图论之欧拉回路、差分约束的 C++ 代码，并推荐了比赛和题目以便练习。
category: solution
---

![111](https://blog.rusin7.com/img/top_cover/2472048401.webp)

# 图论之欧拉回路、差分约束——算法笔记

[比赛](https://vjudge.net/contest/767358)
## 欧拉回路
无向代码1：
```cpp
void dfs(int x){
	while(f[x]<to[x].size()){
		int y=to[x][f[x]].first,idx=to[x][f[x]].second;
		f[x]++;
		if(!vis[idx]){
			vis[idx]=vis[idx^1]=1;
			dfs(y);
			c[++l]=y;
		}
	}
}
```
无向代码2：
```cpp
int x=0,y=0,z=0;
for(int i=1;i<=n;++i){
	if(d[i]&1)x=i,++y;
}
if(y&&y!=2){
	cout<<"Impossible"<<endl;
}
```
有向[题目](https://www.luogu.com.cn/problem/P7771)：
```cpp
#include<bits/stdc++.h>
using namespace std;
int n,m,d[100005],c[100005],f[100005]/*表示遍历到第几个点*/;
vector<int>a[100005];
stack<int>st;
void dfs(int x){
	int l=0;
	while(f[x]<a[x].size()){
		int y=a[x][f[x]];
		f[x]++;
		dfs(y);
		c[++l]=y;
	}
	st.push(x);
}
int main(){
	cin>>n>>m;
	int ind[100005],outd[100005],u,v;
	for(int i=1;i<=m;++i){
		cin>>u>>v;
		a[u].push_back(v);
		ind[v]++,outd[u]++;
	}
	for(int i=1;i<=n;++i)sort(a[i].begin(),a[i].end());
	int x=1,y=0,z=0;
	for(int i=1;i<=n;++i){
		if(ind[i]+1==outd[i])x=i,++y;
		if(ind[i]!=outd[i])++z;
	}
	if(!((y==1&&z==2)||!z)){
		cout<<"No"<<endl;
		return 0;
	}
	dfs(x);
	while(!st.empty()){
		cout<<st.top()<<" ";
		st.pop();
	}
	return 0;
}
```
## 差分约束
Bellman_Ford：
```cpp
void Bellman_Ford(int n){
	auto relax=[&](){
		bool f=0;
		for(int i=1;i<=n;++i){
			for(auto k:to[i]){
				if(ans[i]>ans[k.first]+k.second){
					ans[i]=min(ans[i],ans[k.first]+k.second),f=1;
				}
			}
		}
		return f;
	};
	for(int i=0;i<n-1;++i)relax();
	if(relax())cout<<"NO";
	else for(int i=1;i<=n;++i)cout<<ans[i]<<" ";
}
```
完整[题目](https://www.luogu.com.cn/problem/P7771)：
```cpp
#include<bits/stdc++.h>
using namespace std;
int ans[5005];
vector<pair<int,int>>to[5005];
void Bellman_Ford(int n){
	auto relax=[&](){
		bool f=0;
		for(int i=1;i<=n;++i){
			for(auto k:to[i]){
				if(ans[i]>ans[k.first]+k.second){
					ans[i]=min(ans[i],ans[k.first]+k.second),f=1;
				}
			}
		}
		return f;
	};
	for(int i=0;i<n-1;++i)relax();
	if(relax())cout<<"NO";
	else for(int i=1;i<=n;++i)cout<<ans[i]<<" ";
}
int n,m,c1,c2,y;
int main() {
	cin>>n>>m;
	fill(ans,ans+n+1,0);
	for(int i=1;i<=m;++i){
		cin>>c1>>c2>>y;
		to[c1].push_back({c2,y});
	}
	Bellman_Ford(n);
    return 0;
}
```
