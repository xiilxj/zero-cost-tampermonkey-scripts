# ⚡ Zero Cost Tampermonkey Scripts - 全能网页限制解除与媒体一键提取助手

![Banner](banner.png)

一个完全免费、零成本的开源油猴脚本项目。旨在破解任意网页中的前端防复制和文本限制，并提供快捷的一键大图提取导出服务，自带赞助引流被动收入闭环。

---

## 📂 项目结构

- 📜 [web_restriction_remover.user.js](web_restriction_remover.user.js) - 核心油猴脚本源码。
- 🖼️ `banner.png` - 项目 GitHub 主页横幅大图。
- 🖼️ `demo.png` - 脚本运行界面与悬浮窗功能演示图。

---

## 🌟 核心特性

- **🔓 全能限制解除**：强力拦截防复制、防剪切、防选中文本、防右键菜单等 JavaScript 限制事件，并强行注入重置 CSS 的 `user-select` 属性。
- **🖼️ 网页大图提取**：右下角提供优雅的 Glassmorphism（玻璃拟物化）微动工具箱，点击“提取”按钮瞬间扫描全网页大图并以网格画廊展示，支持一键保存到本地。
- **💸 被动打赏收入**：在脚本面板底部内嵌了醒目的“爱发电”咖啡赞助赞助入口，实现流量到收入的无感转化。

---

## 🖥️ 运行效果演示

项目在网页中激活后，会在屏幕右下角生成透明磨砂感控制小锁头图标 🔓，点击可展开配置面板：

![Demo](demo.png)

---

## 🚀 详细安装与使用说明

### 1. 挂载浏览器扩展管理器
首先，你的浏览器需要安装一个用户脚本管理器。推荐使用以下扩展程序：
- [Chrome 应用商店 - Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmfejjeihpkobabaakgokg)
- [Microsoft Edge 商店 - Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepcnochpjnboba)
- [Firefox Add-ons - Tampermonkey](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)

### 2. 一键安装此脚本
打开我们在 GreasyFork 的发布页面，点击绿色的 **“安装此脚本”** 按钮即可一键挂载：
👉 [GreasyFork 脚本发布主页](https://greasyfork.org/zh-CN/scripts/583996-%E5%85%A8%E8%83%BD%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4%E4%B8%8E%E5%AA%92%E4%BD%93%E4%B8%80%E9%94%AE%E6%8F%90%E5%8F%96%E5%8A%A9%E6%89%8B)

### 3. 使用方法
- **解除复制**：脚本在后台自动拦截各大网站的防复制机制，你只需要直接在网页上划选文字、复制即可，无需手动开启。
- **提取图片**：点击右下角 🔓 图标展开面板，点击 **“提取”** 按钮，会弹出一个无边框的画廊窗口，直接点击图片下方的“保存”即可下载该图片。

---

## 🌐 兼容浏览器与管理器列表

本脚本经过跨浏览器测试，具备极高的兼容性：

| 浏览器 (Browser) | 脚本管理器 (Manager) | 兼容性 (Compatibility) |
| :--- | :--- | :--- |
| **Google Chrome** | Tampermonkey / Violentmonkey | 🟢 完美兼容 (100%) |
| **Microsoft Edge** | Tampermonkey / Violentmonkey | 🟢 完美兼容 (100%) |
| **Mozilla Firefox** | Tampermonkey | 🟢 完美兼容 (100%) |
| **Apple Safari** | Tampermonkey / Userscripts | 🟢 兼容 (95%，部分UI在iOS端缩放稍有差异) |
| **Brave / Arc / Opera** | Tampermonkey | 🟢 完美兼容 (100%) |

---

## ❓ 常见问题 (FAQ)

#### Q1: 为什么在某些网页上依然无法复制？
- **A**: 1. 请检查你的油猴插件是否处于“开启”状态；2. 某些极为特殊的极速加载网页可能在脚本注入前完成了事件绑定，尝试按 `F5` 刷新页面即可解决；3. 某些 PDF 嵌入式阅读器无法直接提取字符。

#### Q2: 一键提取图片功能会抓取到广告吗？
- **A**: 脚本内置了智能去噪算法，会自动分解并剔除包含 script、style、iframe 以及类名和ID中含有 `ad`、`popup`、`share`、`sidebar` 等广告块的低质小图片，只为你呈现高质量正文配图。

#### Q3: 运行这个脚本会泄露我的网页浏览隐私吗？
- **A**: **100% 不会**。本脚本为纯前端静态逻辑，除点击“赞助作者”会新开标签页跳转至官方爱发电主页外，无任何外部网络请求，更不会上传你的任何隐私，代码完全开源，接受社区监督。

---

## ☕ 赞助与打赏

如果你觉得这个工具极大地提升了你的工作和学习效率，欢迎请作者喝杯冰可乐！(◍´꒳`◍)

👉 [前往我的爱发电赞助页面](https://afdian.com/a/czx110202)
