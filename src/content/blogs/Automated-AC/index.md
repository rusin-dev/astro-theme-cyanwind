---
title: AC 自动机笔记
description: AC 自动机笔记
publishDate: 2026-06-06 19:22:35
tags: [笔记,C++]
category: ccf
---

![洛谷炸了](https://cdn.luogu.com.cn/upload/image_hosting/ycm2f9av.png)

![洛谷炸了](https://cdn.luogu.com.cn/upload/image_hosting/akus9280.png)

![洛谷炸了](https://cdn.luogu.com.cn/upload/image_hosting/rktfergq.png)

模板代码（[P3808 AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808)）

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,tot,cnt[1000005],ch[1000005][30],ne[1000005];
void insert(string s){
	int u=0;
	for(char c:s){
		int v=c-'a';
		if(!ch[u][v])ch[u][v]=++tot;
		u=ch[u][v];
	}
	cnt[u]++;
}
void build(){
	queue<int>q;
	for(int i=0;i<26;++i){
		if(ch[0][i])q.push(ch[0][i]);
	}
	while(!q.empty()){
		int u=q.front();
		q.pop();
		for(int i=0;i<26;++i){
			int v=ch[u][i];
			if(v)ne[v]=ch[ne[u]][i],q.push(v);
			else ch[u][i]=ch[ne[u]][i];
		}
	}
}
int query(string s){
	int ans=0;
	for(int k=0,i=0;s[k];k++){
		i=ch[i][s[k]-'a'];
		for(int j=i;j&&~cnt[j];j=ne[j]){
			ans+=cnt[j],cnt[j]=-1;
		}
	}
	return ans;
}
string t;
int main(){
	cin>>n;
	for(int i=1;i<=n;++i){
		string s;
		cin>>s;
		insert(s);
	}
	cin>>t;
	build();
	cout<<query(t);
	return 0;
}
```
