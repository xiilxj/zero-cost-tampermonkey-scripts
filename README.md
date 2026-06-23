# 🚀 WebUnblocker Elite - 网页全能解密锁 & 媒体提取终极神器

![Banner](banner.png)

> **网页复制、右键、选择限制的降维打击！一键获取网页任意无损原图媒体，永久开源免费，零成本闭环被动收益方案。**

一个完全免费、零成本的开源油猴脚本项目。旨在无视并破解任意网页中的前端防复制、文本选择限制，并提供快捷的一键大图提取导出服务，自带赞助引流被动收入闭环。

---

## 📂 项目结构

- 📜 [web_restriction_remover.user.js](web_restriction_remover.user.js) - 核心油猴脚本源码。
- 🖼️ [banner.png](banner.png) - 项目展示横幅大图。
- 🖼️ [demo.png](demo.png) - 脚本运行界面与悬浮窗功能演示图。

---

## 🌟 核心特性

- **🔓 终极限制解除 (De-Restriction)**：强力拦截防复制、防剪切、防选中文本、防右键菜单等 JavaScript 限制事件，并强行注入重置 CSS 的 `user-select` 属性。
- **🖼️ 网页大图无损提取 (Media Extraction)**：右下角提供优雅的 Glassmorphism（玻璃拟物化）微动工具箱，点击“提取”按钮瞬间扫描全网页大图并以网格画廊展示，支持一键保存到本地。
- **🔌 完美跨平台兼容 (Cross-Platform)**：兼容 Chrome、Edge、Firefox、Safari、Brave、Arc 等市面上几乎所有现代浏览器及主流油猴插件管理器。
- **💸 被动收入打赏闭环 (Monetization)**：在脚本面板底部内嵌了醒目的“爱发电”咖啡赞助引流通道，流量无缝转化为真实打赏。

---

## 🖥️ 运行效果演示

项目在网页中激活后，会在屏幕右下角生成透明磨砂感控制小锁头图标 🔓，点击可展开配置面板：

![Demo](demo.png)

---

## 🚀 详细安装与使用说明 (包含重要环境配置)

### 1. 安装脚本管理器
首先，你的浏览器需要安装一个用户脚本管理器。推荐使用以下扩展程序：
- [Chrome 应用商店 - Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmfejjeihpkobabaakgokg)
- [Microsoft Edge 商店 - Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepcnochpjnboba)
- [Firefox Add-ons - Tampermonkey](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)

---

### ⚠️ 2. 【极其重要】Chrome 浏览器环境配置要求
在最新的 Google Chrome 浏览器（Chrome 120 版本及以上）中，受 **Manifest V3** 安全规范限制，**你必须开启浏览器的“开发者模式”，油猴脚本才能正常加载运行。** 否则脚本会被浏览器静默拦截。

#### 💡 开启步骤：
1. 在 Chrome 浏览器地址栏中输入并回车：`chrome://extensions/`
2. 在打开的扩展程序页面右上角，找到 **“开发者模式” (Developer mode)** 开关。
3. 将该开关切换为 **开启（绿色激活状态）**。
4. 重新刷新你要使用脚本的网页即可。

---

### 3. 一键安装此脚本
打开我们在 GreasyFork 的发布页面，点击绿色的 **“安装此脚本”** 按钮即可一键挂载：
👉 [GreasyFork 脚本发布主页](https://greasyfork.org/zh-CN/scripts/583996-%E5%85%A8%E8%83%BD%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4%E4%B8%8E%E5%AA%92%E4%BD%93%E4%B8%80%E9%94%AE%E6%8F%90%E5%8F%96%E5%8A%A9%E6%89%8B)

---

### 4. 使用方法
- **解除复制**：脚本在后台自动拦截各大网站的防复制机制，你只需要直接在网页上划选文字、复制即可，无需手动开启。
- **提取图片**：点击右下角 🔓 图标展开面板，点击 **“提取”** 按钮，会弹出一个无边框的画廊窗口，直接点击图片下方的“保存”即可下载该图片。

---

## 🌐 兼容浏览器与管理器列表

本脚本经过跨浏览器测试，具备极高的兼容性：

| 浏览器 (Browser) | 脚本管理器 (Manager) | 兼容性 (Compatibility) |
| :--- | :--- | :--- |
| **Google Chrome** | Tampermonkey / Violentmonkey | 🟢 完美兼容 (100%，需开启开发者模式) |
| **Microsoft Edge** | Tampermonkey / Violentmonkey | 🟢 完美兼容 (100%) |
| **Mozilla Firefox** | Tampermonkey | 🟢 完美兼容 (100%) |
| **Apple Safari** | Tampermonkey / Userscripts | 🟢 兼容 (95%，部分UI在iOS端缩放稍有差异) |
| **Brave / Arc / Opera** | Tampermonkey | 🟢 完美兼容 (100%) |

---

## ❓ 常见问题 (FAQ)

#### Q1: 为什么在某些网页上依然无法复制？
- **A**:
  1. 请检查你的油猴插件是否处于“开启”状态；
  2. 如果你使用的是 Chrome，请确保按照上述指南开启了 **“开发者模式”**；
  3. 某些极为特殊的极速加载网页可能在脚本注入前完成了事件绑定，尝试按 `F5` 刷新页面即可解决；
  4. 某些 PDF 嵌入式阅读器本身并不属于普通 HTML 元素，因而无法直接通过前端手段解除。

#### Q2: 一键提取图片功能会抓取到广告吗？
- **A**: 脚本内置了智能去噪算法，会自动分解并过滤包含 script、style、iframe 以及类名和ID中含有 `ad`、`popup`、`share`、`sidebar` 等广告块的低质小图片，只为你呈现高质量正文配图。

#### Q3: 运行这个脚本会泄露我的网页浏览隐私吗？
- **A**: **100% 不会**。本脚本为纯前端静态逻辑，除点击“赞助作者”会新开标签页跳转至官方爱发电主页外，无任何外部网络请求，更不会上传你的任何隐私，代码完全开源，接受社区监督。

---

## ☕ 赞助与打赏

如果你觉得这个工具极大地提升了你的工作和学习效率，欢迎请作者喝杯冰可乐！(◍´꒳`◍)

👉 [前往我的爱发电赞助页面](https://afdian.com/a/czx110202)
