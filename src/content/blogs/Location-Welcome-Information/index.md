---
title: 侧边栏添加个性定位欢迎信息
description: 前景介绍使用方法创建JS文件
tags: [Hexo,安知鱼美化,网站开发]
top_img:
uppubDatetimed: '2026-06-03T17:27:37.361+08:00'
publishDate: 2026-04-06 20:58:53
---

![111](https://image.rusin7.com/file/hexo/cover/z7qOAkod.webp)

## 前景介绍

:::info[背景]{open}
基于{% btn 'https://blog.bsgun.cn/posts/ef58a648/',梦爱吃鱼的教程 %}进行修改，主要改进是**更换 API 地址**，因为[原 API](https://api.nsmao.net/) 已经失效。
:::

## 使用方法

### 创建 JS 文件

在博客主题目录的 js 文件夹（~\themes\anzhiyu\source\js）下创建 welcome.js 文件(也可以在source文件夹下另外新建文件夹)。

### 配置经纬度

{% btn 'https://uapis.cn/api/v1/network/myip?source=commercial',点击这里 %}，找到

```
"latitude": xxx,"longitude": xxx,
```

复制对应的经度(lng)和纬度(lat)值。

---

将以下内容复制到 `welcome.js` 中,并修改文件顶部配置信息

:::success[代码]

```javascript
window.IP_CONFIG = {
    BLOG_LOCATION: {
        lng: 121.4, // 博主经度
        lat: 29.9,  // 博主纬度
    },
    CACHE_DURATION: 1000 * 60 * 60, // 缓存1小时
    HOME_PAGE_ONLY: true, // 是否只在首页显示
};

// 添加样式
const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        #welcome-info {
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 212px;
            padding: 10px;
            margin-top: 5px;
            border-radius: 12px;
            background-color: var(--anzhiyu-background);
            outline: 1px solid var(--anzhiyu-card-border);
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 3px solid var(--anzhiyu-main);
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .ip-address {
            filter: blur(5px);
            transition: filter 0.3s ease;
        }
        .ip-address:hover {
            filter: blur(0);
        }
        .error-message {
            color: #ff6565;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .error-message p,
        .permission-dialog p {
            margin: 0;
        }
        .error-icon {
            font-size: 3rem;
        }
        #retry-button {
            margin: 0 5px;
            color: var(--anzhiyu-main);
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        #retry-button:hover {
            transform: rotate(180deg);
        }
    `;
    document.head.appendChild(style);
};

// 获取欢迎信息元素
const getWelcomeInfoElement = () => document.querySelector('#welcome-info');

// 显示加载动画
const showLoadingSpinner = () => {
    const welcomeInfoElement = getWelcomeInfoElement();
    if (!welcomeInfoElement) return;
    welcomeInfoElement.innerHTML = '<div class="loading-spinner"></div>';
};

// 显示错误信息
const showErrorMessage = (message = '抱歉，无法获取信息') => {
    const welcomeInfoElement = getWelcomeInfoElement();
    if (!welcomeInfoElement) return;
  
    welcomeInfoElement.innerHTML = `
        <div class="error-message">
            <div class="error-icon">😕</div>
            <p>${message}</p>
            <p>请<i id="retry-button" class="fa-solid fa-arrows-rotate"></i>重试或检查网络连接</p>
        </div>
    `;
    document.getElementById('retry-button').addEventListener('click', fetchIpInfo);
};

// 缓存相关
const IP_CACHE_KEY = 'ip_info_cache';
const getIpInfoFromCache = () => {
    const cached = localStorage.getItem(IP_CACHE_KEY);
    if (!cached) return null;
  
    const { data, timestamp } = JSON.parse(cached);
    if (publishDate.now() - timestamp > IP_CONFIG.CACHE_DURATION) {
        localStorage.removeItem(IP_CACHE_KEY);
        return null;
    }
    return data;
};

const setIpInfoCache = (data) => {
    localStorage.setItem(IP_CACHE_KEY, JSON.stringify({
        data,
        timestamp: publishDate.now()
    }));
};

// 计算距离
const calculateDistance = (lng, lat) => {
    const R = 6371; // 地球半径(km)
    const rad = Math.PI / 180;
    const dLat = (lat - IP_CONFIG.BLOG_LOCATION.lat) * rad;
    const dLon = (lng - IP_CONFIG.BLOG_LOCATION.lng) * rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(IP_CONFIG.BLOG_LOCATION.lat * rad) * Math.cos(lat * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// 格式化IP显示
const formatIpDisplay = (ip) => {
    if (!ip) return "未知IP";
    return ip.includes(":") ? "IPv6地址" : ip;
};

// 格式化位置
const formatLocation = (region) => {
    if (!region) return '神秘地区';
    return region.replace(/\s+/g, " ");
};

// 时段问候
const getTimeGreeting = () => {
    const hour = new publishDate().getHours();
    if (hour < 11) return "早上好🌤️，一日之计在于晨";
    if (hour < 13) return "中午好☀️，记得午休喔~";
    if (hour < 17) return "下午好🕞，饮茶先啦！";
    if (hour < 19) return "即将下班🚶‍♂️，记得按时吃饭~";
    return "晚上好🌙，夜生活嗨起来！";
};

// ====================== 终极修复：适配 浙江、江苏 这种简写 ======================
const getGreeting = (region) => {
    if (!region) return "带我去你的城市逛逛吧！";

    const parts = region.trim().split(/\s+/).filter(Boolean);
    const province = parts[1] || "";
    const city = parts[2] || "";

    if (city === "南京") return "六朝古都，风华依旧";
    if (city === "苏州") return "上有天堂，下有苏杭";
    if (city === "杭州") return "东风渐绿西湖柳，雁已还人未南归";
    if (city === "郑州") return "豫州之域，天地之中";
    if (city === "洛阳") return "洛阳城里见秋风，欲作家书意万重";
    if (city === "开封") return "包公那叫一个铁面无私，严惩贪官污吏";
    if (city === "宁波") return "海上丝路的起点，和我一个城市。";
    if (city === "西安") return "十三朝古都，长治久安！";

    // 省份匹配（简写版）
    if (province === "北京") return "北京欢迎你~~~";
    if (province === "天津") return "讲段相声吧";
    if (province === "河北") return "山势巍巍成壁垒，天下雄关";
    if (province === "山西") return "展开坐具长三尺，已占山河五百余";
    if (province === "内蒙古") return "天苍苍，野茫茫，风吹草低见牛羊";
    if (province === "辽宁") return "我想吃烤鸡架！";
    if (province === "吉林") return "状元阁就是东北烧烤之王";
    if (province === "黑龙江") return "很喜欢哈尔滨大剧院";
    if (province === "上海") return "众所周知，中国只有两个城市";
    if (province === "江苏") return "散装是必须要散装的";
    if (province === "浙江") return "望海楼明照曙霞，闲塘十里尽梅花";
    if (province === "河南") return "可否带我品尝河南烩面啦？";

    return "欢迎来到我的博客！";
};
// ==============================================================================

// 生成欢迎信息
const generateWelcomeMessage = (region, dist, ipDisplay) => {
    const location = formatLocation(region);
    const timeGreet = getTimeGreeting();
    const cityGreet = getGreeting(region);
  
    return `
        欢迎来自 <b>${location}</b> 的小友💖<br>
        你当前距博主约 <b>${dist}</b> 公里！<br>
        你的IP地址：<b class="ip-address">${ipDisplay}</b><br>
        ${timeGreet}<br>
        Tip：<b>${cityGreet}🍂</b>
    `;
};

const showWelcome = (data) => {
    if (!data || !data.ip) return showErrorMessage();
  
    const welcomeInfo = getWelcomeInfoElement();
    if (!welcomeInfo) return;
  
    const dist = calculateDistance(data.longitude, data.latitude);
    const ipDisplay = formatIpDisplay(data.ip);
  
    welcomeInfo.style.display = 'block';
    welcomeInfo.style.height = 'auto';
    welcomeInfo.innerHTML = generateWelcomeMessage(data.region, dist, ipDisplay);
};

// 从uapis.cn获取IP信息
const fetchIpData = async () => {
    const response = await fetch('https://uapis.cn/api/v1/network/myip?source=commercial');
    if (!response.ok) throw new Error('API请求失败');
    const result = await response.json();
    return result;
};

// 获取IP信息主函数
const fetchIpInfo = async () => {
    showLoadingSpinner();
  
    const cachedData = getIpInfoFromCache();
    if (cachedData) {
        showWelcome(cachedData);
        return;
    }
  
    try {
        const data = await fetchIpData();
        setIpInfoCache(data);
        showWelcome(data);
    } catch (error) {
        console.error('获取IP信息失败:', error);
        showErrorMessage('获取IP信息失败，请重试');
    }
};

const isHomePage = () => {
    return window.location.pathname === '/' || window.location.pathname === '/index.html';
};

// 插入组件
const insertAnnouncementComponent = () => {
    const announcementCards = document.querySelectorAll('.card-widget.card-announcement');
    if (!announcementCards.length) return;
  
    if (IP_CONFIG.HOME_PAGE_ONLY && !isHomePage()) {
        announcementCards.forEach(card => card.remove());
        return;
    }
  
    if (!document.querySelector('#welcome-info')) return;
    fetchIpInfo();
};

document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    insertAnnouncementComponent();
    document.addEventListener('pjax:complete', insertAnnouncementComponent);
});
```

:::

## 插入 JS 文件

在 `_config.anzhiyu.yml` （或其他主题）主题配置文件下 `inject` 配置项中的 `bottom` 引入 `welcome.js`。

```yaml
- <script src="/js/welcome.js"></script>
```

{% tip info %}图片内容仅供参考，具体根据实际情况修改。{% endtip %}

![截屏](/img/2026/2780309151/1.png)

## 配置内容

确认 `_config.anzhiyu.yml` （或其他主题）主题配置文件下 `aside` 配置项中的 `card_announcement` 是否开启，配置参考：

```yaml
card_announcement:
  enable: true # 必须开启
  content: ···（省略）
           <div id="welcome-info"></div> # 必须项
```

![截屏](/img/2026/2780309151/2.png)

---

{% folding yellow, 注意事项 %}

- 确保API密钥正确填写,正确设置白名单
- 经纬度没必要填写详细,为了自身隐私安全
- 选择器可以根据你的主题实际情况修改

{% endfolding %}

## 常见问题

**Q**: 为什么显示"无法获取信息"?
**A**: 可能是 API 炸了，检查配置并重试。实在不行联系我更新文章。

**Q**: 距离显示不准确?
**A**: 正常现象，计算有无法避免的误差，大概就行了。
