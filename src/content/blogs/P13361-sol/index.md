---
title: 题解：P13361 [GCJ 2011 Qualification] Bot Trust
publishDate: 2026-06-06
tags: [题解,C++]
top_img: https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp
cover: https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp
description: 本文讲述了如何使用 C++ 完成洛谷的 P13361 [GCJ 2011 Qualification] Bot Trust」水落溪流浅浅，思路清晰、排版精美
category: solution
heroImage:
  src: https://image.rusin7.com/file/hexo/cover/kuKbfhkc.webp
  color: "#7da7d4"
---

本题解被打回无法重新提交嘤嘤嘤

## 题意理解

### 形式化翻译

题目翻译有点难懂（~~其实是本蒟蒻懒得看~~），让本蒟蒻来形式化一下：

对于每组测试用例，有 $n$ 个执行任务的机器人和对应的按钮， $2$ 个机器人需**依次**按下自己对应的按钮，求计算 $2$ 个机器人按完按钮所需的最少时间。  

### 注意事项

- 必须严格按照给定顺序操作，后一个按钮的操作必须在前一个完成后才能开始。
- 机器人可同时移动但**不能同时执行**按键操作。

## 解题思路

### 状态跟踪

需使用记录两个机器人的当前位置 $poso$ 和 $posb$ （ $poso$ 对应`Orange`， $posb$ 对应`Blue`）和各自上次操作完成的时间 $timeo$ 和 $timeb$ ，以及整个流程的总时间 $s$ 。  
对于每组测试用例，**千万不要忘记**对 $poso$ 、 $posb$ 、 $timeo$ 和 $timeb$ 进行**初始化**！

### 操作逻辑

- 对每个命令，先确定执行的机器人（判断输入为`O`或`B`）。
- 计算从到达目标位置的时间 $|a_i-poso/posb| \times1$ 。
- 确定实际完成时间：取到达时间和当前总时间的最大值（保证顺序性），再加 $1$ 秒按键时间，用公式表达即为：  
   > $$ntime \leftarrow \max\{timeo+|a_i-poso/posb|,s\}$$ 
- 更新机器人位置、对应完成时间和总时间。

## 代码实现

```cpp
#include<bits/stdc++.h>
using namespace std;
// 存储每个命令的结构体：机器人类型和目标位置
struct Command{
    char robot; 
    int pos;
}a[100]; 
int t,n,poso,posb,timeo,timeb,s,p,ntime;
char c;

// 初始化函数：重置机器人初始状态
void init(){
    poso=1;  // 初始位置均为1
    posb=1;
    timeo=0;  // 初始时间为0
    timeb=0;
    s=0;  // 总时间初始为0
}

int main(){
    cin>>t;
    for (int k=1;k<=t;k++) {
        cin>>n;
        for (int i= 0;i<n;i++) {
            cin>>a[i].robot>>a[i].pos;
        }
        init();  // 初始化状态
        for(int i=0;i<n;++i){
            //核心：顺序按下每个按钮
            c=a[i].robot;  // 当前命令的机器人
            p=a[i].pos;    // 当前命令的目标位置
            if(c=='O'){  // Orange机器人操作
                // 计算完成时间：到达时间与总时间取最大后+1秒按键
                ntime=max(timeo+abs(p-poso),s)+1;
                poso=p;  // 更新位置
                timeo=s=ntime;  // 更新时间
            }else{  // Blue机器人操作
                ntime=max(timeb+abs(p-posb),s)+1;
                posb=p;  //同上
                timeb=s=ntime;
            }
        }
        // 格式化输出结果
        cout<<"Case #"<<k<<": "<<s<<endl;
    }
    return 0;
}
```

## 复杂度分析

时间复杂度： $O(n)$ ，其中 $n$ 为命令数量，只需遍历一次所有命令。   
空间复杂度： $O(n)$ ，用于存储命令数组（可优化为 $O(1)$ ，边读边处理）。  

## 闲话

~~真是一道水题！~~  
提交后，那[只有两个的测试点和 20pts](https://www.luogu.com.cn/record/231500600 "点此查看我的AC记录") 着实让我大跌眼镜。  
本蒟蒻的第一篇题解，看了许多大佬的题解学习格式，花了一下午完成，望管理员大大通过。
