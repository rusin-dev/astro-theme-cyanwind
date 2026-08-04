---
title: 第22届浙大宁波理工学院程序设计大赛题解
publishDate: 2026-04-03 21:00:28
tags: [题解,比赛]
description: 本文讲述了第22届浙大宁波理工学院程序设计大赛的 C++ 代码。
category: ccf
---

![111](https://blog.rusin7.com/img/top_cover/74289.webp)

## A. 字符串

按照题意模拟即可，如果想要省掉代码量可以开个 `std::vector<std::pair<char, int>> ve(n)` 前一个记录字符，后一个记录当前的下标，直接进行升序排序，然后直接从k+1个开始输出。 提供排序的代码。

```cpp
void clearlove13(void){
    int n, k;
    std::cin >> n >> k;
    std::string s;
    std::cin >> s;
    std::vector<std::pair<char, int>> ve(n);
    for (int i = 0; i < n; i++) {
        ve[i] = std::make_pair(s[i], i);
    }
    std::sort(ve.begin(), ve.end());
    std::vector<std::pair<char, int>> ans;
    ans.reserve(n);
    for (int i = k; i < n; i++) {
        ans.push_back({ve[i].first, ve[i].second});
    }
    std::sort(ans.begin(), ans.end(), [&](auto & a, auto & b) {
        return a.second < b.second;
    });
    for (auto &[x, y] : ans) {
        std::cout << x;
    }
}
```

## B. 价格跨度

题意大概就是求该 $a_i$ 前面第一个大于该 $a_i$ 的位置，从题目数据可得知，此题我们需要使用 $\mathcal{O(n)}$ 复杂度来写这道题，思考一下可以使用单调栈来实现，只需要等效思想来写即可。

```cpp
void clearlove13(void)
{
    int n;
    std::cin >> n;
    std::vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) {
        std::cin >> a[i];
    }
    std::vector<int>st;
    std::vector<int> ans(n + 1);
    st.reserve(n + 1);
 
    for (int i = 1; i <= n; i++) {
        while (!st.empty() && a[st.back()] <= a[i]) {
            st.pop_back();
        }
        if (st.empty()) {
            ans[i] = i;
        } else {
            ans[i] = i - st.back();
        }
        st.push_back(i);
    }
 
    for (int i = 1; i <= n; i++) {
        std::cout << ans[i];
        if (i != n) std::cout << ' ';
    }
}
```

## C. 斐波那契数

事实上题目已经告诉你了做法直接模拟即可。

```cpp
i64 a[51];
void clearlove13(void)
{
    int n;
    std::cin >> n;
    std::cout << a[n] << '\n';
}
int main(void)
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    a[1] = 1;
    a[0] = 1;
    for (int i = 2; i <= 50; i++) {
        a[i] = a[i - 1] + a[i - 2];
    }
 
    int cas = 1;
    std::cin >> cas;
    while (cas--) clearlove13();
    return 0;
}
```

## D. 回收礼物

设 $f(x\to y)$ 是以 $1$ 为根 ，求x到y的树上最小路径 我们先了解题意，就可以明白是需要求形如 $f(1\to 2)+f(2\to 3)+f(3\to _{\dots})+f(_{\dots}\to 2)$ 这么一个式子，那么我们应该怎么快速去求树上最短路径呢？引入lca求最近公共祖先，有一个小trick就是我们 所以我们就先求出到两个点的深度之和再减去公共祖先的深度就可以写出这道题了。

```cpp
struct LCA {
    int n, lg;
    std::vector<std::vector<int>> up;
    std::vector<int> depth, tin, tout;
    int timer = 0;
 
    LCA(std::vector<std::vector<int>>& ed, int root = 0) {
        n = int(ed.size());
        lg = std::__lg(n) + 1;
        up.assign(n, std::vector<int>(lg));
        depth.assign(n, 0);
        tin.resize(n), tout.resize(n);
        auto dfs = [&](auto self, int u, int p) -> void {
            tin[u] = timer++;
            up[u][0] = p;
            for (int i = 1; i < lg; ++i) up[u][i] = up[up[u][i - 1]][i - 1];
            for (int v : ed[u]) {
                if (v == p) continue;
                depth[v] = depth[u] + 1;
                self(self, v, u);
            }
            tout[u] = timer++;
        };
        dfs(dfs, root, root);
    }
 
    bool is_ancestor(int u, int v) {
        return tin[u] <= tin[v] && tout[v] <= tout[u];
    }
 
    int get_lca(int u, int v) {
        if (is_ancestor(u, v)) return u;
        if (is_ancestor(v, u)) return v;
        for (int i = lg - 1; i >= 0; --i)
            if (!is_ancestor(up[u][i], v)) u = up[u][i];
        return up[u][0];
    }
 
    std::vector<int> get_path(int u, int v) {
        int w = get_lca(u, v);
        std::vector<int> up_path, down_path;
        while (u != w) {
            up_path.push_back(u);
            u = up[u][0];
        }
        up_path.push_back(w);
        while (v != w) {
            down_path.push_back(v);
            v = up[v][0];
        }
        std::reverse(down_path.begin(), down_path.end());
        up_path.insert(up_path.end(), down_path.begin(), down_path.end());
        return up_path;
    }
};
 
void clearlove13() {
    constexpr int lg = 20;
    int n, q, rt;
    std::cin >> n >> q ;
    rt = 1;
    std::vector<std::vector<int>> g(n + 1);
    std::vector<int>ch(q);
    for (int i = 2; i <= n; i++) {
        int u;
        std::cin >> u;
        g[u].push_back(i);
        g[i].push_back(u);
    }
 
    std::vector<int> dep(n + 1);
    std::vector<std::array<int, lg>> up(n + 1);
    for (int i = 1; i <= n; i++) {
        std::fill(up[i].begin(), up[i].end(), -1);
    }
 
    auto dfs = [&](auto self, int u, int fa) -> void {
        up[u][0] = fa;
        for (int i = 1; i < lg; i++) {
            if (up[u][i - 1] != -1) {
                up[u][i] = up[up[u][i - 1]][i - 1];
            }
        }
        for (int v : g[u]) {
            if (v != fa) {
                dep[v] = dep[u] + 1;
                self(self, v, u);
            }
        }
    };
 
    dfs(dfs, rt, -1);
 
    auto lca = [&](i64 u, i64 v) -> int {
        if (dep[u] < dep[v]) std::swap(u, v);
        i64 d = dep[u] - dep[v];
        for (int i = 0; i < lg; i++) {
            if (d >> i & 1) u = up[u][i];
        }
        if (u == v) return u;
        for (int i = lg - 1; i >= 0; i--) {
            if (up[u][i] != up[v][i]) {
                u = up[u][i];
                v = up[v][i];
            }
        }
        return up[u][0];
    };
 
    auto dist = [&](i64 u, i64 v) -> int {
        i64 l = lca(u, v);
        return dep[u] + dep[v] - 2 * dep[l];
    };
 
    for (auto &i : ch) {
        std::cin >> i;
    }
    i64 ans = dist(1, ch[0]);
    for (int i = 1; i < q; i++) {
        ans += dist(ch[i - 1], ch[i]);
    }
    std::cout << ans << '\n';
}
```

## E. 我们都是小怪兽 (Rescue Qfish)

推导公式发现边权每 $4$ 步循环。利用分层图思想，将每个点按时刻拆为 $4$ 层，层间连边，跑 Dijkstra 最短路即可。提供建图的代码。

```cpp
for (ll i = 1; i <= m; i++) {
    cin >> u >> v >> w;
    
    ll w0 = w; //第一层是L
    ll w1 = (w - 1) * quickpow(w + 1, md - 2, md) % md; //第二层是(L-1)/(L+1)
    ll w2 = -quickpow(w, md - 2, md) % md;   //第三层是(-1)/L
    ll w3 = (w + 1) * quickpow((1 - w + md) % md, md - 2, md) % md;//第四层是(L+1)/(1-L) 每四次循环

    if (w1 < 0) w1 += md;
    if (w2 < 0) w2 += md;
    if (w3 < 0) w3 += md;

    g[u].push_back({w0, v + n});
    g[v].push_back({w0, u + n});

    g[u + n].push_back({w1, v + 2 * n});
    g[v + n].push_back({w1, u + 2 * n});

    g[u + 2 * n].push_back({w2, v + 3 * n});
    g[v + 2 * n].push_back({w2, u + 3 * n});

    g[u + 3 * n].push_back({w3, v});
    g[v + 3 * n].push_back({w3, u});
}
```

## F. 爱的魔力转圈圈——终极幸存者挑战赛

这是一道约瑟夫环问题，但是数据开小了遍历也能过，递推公式： $\mathcal{f(n, k)=f(n-1, k)+k}$

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    long long k;  
    cin >> n >> k;
    
    long long res = 0;  // f(1)=0（1个人时位置为0）
    for (int i = 2; i <= n; ++i) {
        res = (res + k) % i;  // 递推计算f(i)
    }
    
    cout << res + 1 << endl;  // 转换为1-based编号
    return 0;
}
```

## G. 探险者的补给路线

直接根据题目意思写就行，$x, y$ 分别是 $a, b$ 的倍数。

```cpp
void clearlove13(void)
{
    i64 a, b, x, y;
    std::cin >> a >> b >> x >> y;
    if (x % a == 0 && y % b == 0 && x >= 0 && y >= 0) {
        std::cout << "YES\n";
    } else {
        std::cout << "NO\n";
    }
}
```

## H. Qfish的法术

首先我们根据题意每次加2，可以知道区间和无论怎么操作奇偶性永远不会改变，由此延申我们进行分类讨论，如果区间长度是奇数的话，经过操作后的区间和直接贪心成偶数的目标去，因没有要求对操作后的值有具体要求，所以区间长度是奇数就一定可以，如果区间长度为偶数，但区间和为奇数，每次+2并不会改变奇偶性，所以无解。

值得注意的是，我们需要对长度为2的区间进行一个简单的特判，区间和直接用前缀和维护就行。

```cpp
void clearlove13(void)
{
    int n, t;
    std::cin >> n >> t;
    std::vector<i64>a(n + 1);
    for (int i = 1; i <= n; i++) {
        std::cin >> a[i];
        a[i] += a[i - 1];
    }
    while (t--) {
        int l, r;
        std::cin >> l >> r;
        if (r - l + 1 == 2 && (a[r] != a[l - 1])) {
            std::cout << "NO\n";
            continue;
        }
        if (((r - l + 1LL) % 2 == 0) && ((a[r] - a[l - 1]) % 2 == 1)) {
            std::cout << "NO\n";
        } else {
            std::cout << "YES\n";
        }
    }
}
```

## I. 字母混淆

直接根据题目来模拟就行。

```cpp
void solve(){
    string s;
    int n;
    cin >> n >> s;
    s = " " + s;
    for (int i = 1; i <= n; ++i)
        cout << (char)((s[i] + 32 - 'a' - 2 + 26) % 26 + 'a');
}
```

## J. 小s的杀戮尖塔

超级大模拟， 首先我们可以观察到，观者的血量不会超过1000，并且大鄂虫每行动3轮攻击力就会永久增加，而观者每轮理想情况下只能有15点格挡。所以计算可知游戏轮数一定不会超过60轮。因此可以使用三维 $dp$ 求解。$dp_{i, j, q}$，$i$ 代表第 $i$ 轮，$j$ 代表大鄂虫剩余 $j$ 滴血，$q$ 代表观者处于的姿态。记录的是观者剩余的血量。每次抽取 $5$ 张牌，用 dfs 记录所有会到达的状态。后面就是漫长的调试代码时间，总复杂度是 $\mathcal{O(60\times b \times  3 \times 5)}$。而且题目的伤害与大鄂虫的格挡实际上都是3的倍数，因此可以把伤害与血量 $\div 3$ 进行计算。实际上由于状态数远不会到达最高复杂度，因此代码可以通过。std 的耗时约 $150ms$。 一些容易导致 WA 的细节： 
* 第一轮的行动 $1$ 与后面轮次的行动 $1$ 不同。后面轮次的行动 $1$ 是有 $9$ 点护甲的，第一轮没有。 
* 最后 $1$ 轮观者战胜大鄂虫时，游戏立即结算，此时观者不会再受到伤害。 
* 把费用用完并不是最优解，例如手里是 $5$ 张暴怒，此时可能会选择一张都不打。 

由于出题人的 std 过于臃肿，因此在这里放上能够通过对拍的 AI 代码。

```cpp
typedef long long ll;

ll dp[2][40400][3]; 
ll num[505050];

struct MoveResult {
    ll dmg;        // 造成的伤害
    ll self_blk;   // 获得的格挡
    ll end_stance; // 结束姿态
};
vector<MoveResult> moves_cache[3]; // [起始姿态] -> 结果列表

int main(){
    cin.tie(0); cout.tie(0); ios::sync_with_stdio(0);
    ll t, a, b, n;
    if(!(cin >> t)) return 0;
    
    while(t--){
        cin >> a >> b >> n;
        for(int i=1; i<=n; i++) cin >> num[i];
        
        // 压缩敌方血量
        ll max_b = (b - 1) / 3 + 1;
        
        for(int x=0; x<=max_b; x++) 
            for(int s=0; s<3; s++) dp[0][x][s] = -1;
            
        vector<pair<ll, ll>> q; // 队列: {敌方血量, 姿态}
        q.push_back({max_b, 0});
        dp[0][max_b][0] = a;
        
        ll ans = -1;
        ll turn = 0;
        ll gong = 0; // 力量
        
        while(!q.empty() && turn < 60) {
            ll cur = turn % 2;
            ll nxt = (turn + 1) % 2;
            turn++;
            
            // 重置下一轮DP状态
            for(int x=0; x<=max_b; x++)
                for(int s=0; s<3; s++) dp[nxt][x][s] = -1;
            
            // 1. 确定手牌
            vector<ll> hand;
            for(int i=0; i<5; i++) {
                ll idx = ((turn - 1) * 5 + i) % n + 1;
                hand.push_back(num[idx]);
            }
            sort(hand.begin(), hand.end());
            
            // 2. 预计算所有出牌结果
            for(int s=0; s<3; s++) moves_cache[s].clear();
            
            do {
                for(int start_s=0; start_s<3; start_s++) {
                    ll c = 3, cur_s = start_s;
                    ll raw_dmg = 0, self_blk = 0;
                    
                    // 记录"一张牌都不出"也是一种可能
                    moves_cache[start_s].push_back({0, 0, start_s});
                    
                    for(ll card : hand) {
                        ll cost = (card >= 4) ? 2 : 1;
                        if(c < cost) break;
                        c -= cost;
                        
                        // 伤害计算
                        ll d = 0;
                        if(card == 1) d = 6;
                        else if(card == 3 || card == 4) d = 9;
                        if(cur_s == 1) d *= 2; // 愤怒翻倍
                        raw_dmg += d;
                        
                        // 格挡计算
                        if(card == 2) self_blk += 5;
                        else if(card == 5) self_blk += 8;
                        
                        // 姿态变更
                        ll old_s = cur_s;
                        if(card == 3) cur_s = 0;
                        else if(card == 4) cur_s = 1;
                        else if(card == 5) cur_s = 2;
                        if(old_s == 2 && (card == 3 || card == 4)) c += 2;
                        
                        // 存入结果 (伤害/3, 格挡, 姿态)
                        moves_cache[start_s].push_back({raw_dmg / 3, self_blk, cur_s});
                    }
                }
            } while(next_permutation(hand.begin(), hand.end()));
            
            // 3. 大鄂虫属性计算
            ll chong = (turn - 1) % 3 + 1;
            if(turn > 1 && (turn - 1) % 3 == 0) gong += 5; // 每3回合加一次力量
            
            ll enemy_dmg = 0;
            if(chong == 1) enemy_dmg = 12 + gong;
            else if(chong == 2) enemy_dmg = 7 + gong;
            
            ll enemy_blk_reduce = 0;
            if(turn > 1) {
                ll prev_act = (turn - 2) % 3 + 1;
                if(prev_act == 2) enemy_blk_reduce = 2; // 6/3
                else if(prev_act == 3) enemy_blk_reduce = 3; // 9/3
            }
            
            vector<pair<ll, ll>> next_q;
            
            // 4. 状态转移
            for(auto &st : q) {
                ll e_hp = st.first;
                ll p_stance = st.second;
                ll p_hp = dp[cur][e_hp][p_stance];
                
                for(auto &res : moves_cache[p_stance]) {
                    // 计算实际对敌伤害
                    ll dmg_dealt = max(0LL, res.dmg - enemy_blk_reduce);
                    ll next_e_hp = e_hp - dmg_dealt;
                    
                    // 击杀判定
                    if(next_e_hp <= 0) {
                        ans = max(ans, p_hp);
                        continue; // 敌死，不入队
                    }
                    
                    // 玩家承伤计算
                    ll incoming = enemy_dmg;
                    if(res.end_stance == 1) incoming *= 2; // 愤怒易伤
                    ll take = max(0LL, incoming - res.self_blk);
                    ll next_p_hp = p_hp - take;
                    
                    if(next_p_hp > 0) {
                        if(dp[nxt][next_e_hp][res.end_stance] == -1) {
                            next_q.push_back({next_e_hp, res.end_stance});
                            dp[nxt][next_e_hp][res.end_stance] = next_p_hp;
                        } else {
                            dp[nxt][next_e_hp][res.end_stance] = max(dp[nxt][next_e_hp][res.end_stance], next_p_hp);
                        }
                    }
                }
            }
            q = next_q;
        }
        cout << ans << "\n";
    }
    return 0;
}
```
