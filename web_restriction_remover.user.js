// ==UserScript==
// @name         全能网页限制解除与媒体一键提取助手
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  自动解除任意网页的复制、剪切、右键、选中文本限制。并在右下角提供极简浮动工具箱，支持一键提取网页所有图片，且内置打赏通道支持作者。
// @author       czx110202 & xiilxj
// @match        *://*/*
// @match        http://localhost/*
// @match        http://127.0.0.1/*
// @match        file:///*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 默认开启解除限制
    let config = {
        removeRestrictions: true,
        afdianLink: 'https://afdian.com/a/czx110202' // 宝宝注册爱发电后可修改此链接
    };

    // 安全注入 CSS 的辅助函数
    function safeInjectStyle(cssText, id) {
        const inject = () => {
            if (id && document.getElementById(id)) return;
            const style = document.createElement('style');
            if (id) style.id = id;
            style.innerHTML = cssText;
            const target = document.head || document.documentElement;
            if (target) {
                target.appendChild(style);
            }
        };

        if (document.head || document.documentElement) {
            inject();
        } else {
            // 如果此时 DOM 还没准备好，就等待 DOMContentLoaded 或 readystatechange
            document.addEventListener('DOMContentLoaded', inject);
        }
    }

    // ================= 核心逻辑：解除网页限制 =================
    const eventsToBlock = ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'];
    
    function enableRemover() {
        // 1. 监听并阻止各类限制事件的传播
        eventsToBlock.forEach(eventName => {
            document.addEventListener(eventName, preventRestriction, true);
        });

        // 2. 动态注入 CSS，强制覆盖所有 user-select 禁用样式
        const restrictCss = `
            * {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            ::-moz-selection { background: #3390FF !important; color: #fff !important; }
            ::selection { background: #3390FF !important; color: #fff !important; }
        `;
        safeInjectStyle(restrictCss, 'restrict-remover-css');
    }

    function disableRemover() {
        eventsToBlock.forEach(eventName => {
            document.removeEventListener(eventName, preventRestriction, true);
        });
        const style = document.getElementById('restrict-remover-css');
        if (style) style.remove();
    }

    function preventRestriction(e) {
        if (config.removeRestrictions) {
            e.stopPropagation();
        }
    }

    // 初始化运行限制解除
    enableRemover();

    // ================= 界面逻辑：右下角悬浮工具箱 =================
    // UI 样式
    const uiStyle = `
        #remover-float-btn {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #3390FF, #1E66D6);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 999999;
            transition: all 0.3s ease;
            user-select: none !important;
        }
        #remover-float-btn:hover {
            transform: scale(1.1) rotate(15deg);
        }
        #remover-menu-box {
            position: fixed;
            bottom: 135px;
            right: 20px;
            width: 220px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.18);
            z-index: 999999;
            padding: 15px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: none;
            flex-direction: column;
            gap: 10px;
            user-select: none !important;
        }
        .remover-menu-title {
            font-weight: bold;
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .remover-menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
            color: #555;
            padding: 6px 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .remover-menu-item:hover {
            background: #f5f5f5;
        }
        .remover-btn {
            background: #3390FF;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        }
        .remover-btn:hover {
            background: #1E66D6;
        }
        /* Switch 开关样式 */
        .remover-switch {
            position: relative;
            display: inline-block;
            width: 34px;
            height: 20px;
        }
        .remover-switch input { opacity: 0; width: 0; height: 0; }
        .remover-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
        }
        .remover-slider:before {
            position: absolute;
            content: "";
            height: 14px; width: 14px;
            left: 3px; bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .remover-slider { background-color: #3390FF; }
        input:checked + .remover-slider:before { transform: translateX(14px); }

        /* 图片预览弹窗 */
        #remover-img-gallery {
            position: fixed;
            top: 10%; left: 10%; width: 80%; height: 80%;
            background: rgba(255,255,255,0.98);
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.25);
            z-index: 1000000;
            display: none;
            flex-direction: column;
            padding: 20px;
            font-family: sans-serif;
        }
        .gallery-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
            overflow-y: auto;
            margin-top: 15px;
            flex-grow: 1;
            padding: 10px;
        }
        .gallery-item {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #eee;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafafa;
        }
        .gallery-item img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
        }
        .gallery-download-btn {
            position: absolute;
            bottom: 5px; right: 5px;
            background: rgba(0,0,0,0.6);
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
        }
        .gallery-download-btn:hover { background: #3390FF; }
    `;

    // 安全注入 UI 样式
    safeInjectStyle(uiStyle, 'remover-ui-css');

    // 等待 DOMContentLoaded 后初始化 UI 元素
    const initUI = () => {
        if (document.getElementById('remover-float-btn')) return; // 防止重复注入

        // 创建浮动按钮
        const floatBtn = document.createElement('div');
        floatBtn.id = 'remover-float-btn';
        floatBtn.innerHTML = '🔓';
        floatBtn.title = '网页限制解除助手';
        document.body.appendChild(floatBtn);

        // 创建菜单框
        const menuBox = document.createElement('div');
        menuBox.id = 'remover-menu-box';
        menuBox.innerHTML = `
            <div class="remover-menu-title">
                <span>⚡ 限制解除助手</span>
                <span style="font-size: 11px; color: #888;">v1.1</span>
            </div>
            <div class="remover-menu-item">
                <span>解除网页复制限制</span>
                <label class="remover-switch">
                    <input type="checkbox" id="remover-toggle-switch" ${config.removeRestrictions ? 'checked' : ''}>
                    <span class="remover-slider"></span>
                </label>
            </div>
            <div class="remover-menu-item" id="remover-fetch-images">
                <span>🖼️ 一键提取网页图片</span>
                <button class="remover-btn">提取</button>
            </div>
            <a class="remover-menu-item" href="${config.afdianLink}" target="_blank" style="text-decoration: none; background: #FFF4F4; border: 1px dashed #FFCCCC; margin-top: 5px;">
                <span style="color: #FF5A5A; font-weight: bold;">☕ 觉得好用？赞助作者</span>
                <span style="font-size: 11px; color: #FF9999;">去打赏 ➔</span>
            </a>
        `;
        document.body.appendChild(menuBox);

        // 创建画廊弹窗
        const gallery = document.createElement('div');
        gallery.id = 'remover-img-gallery';
        gallery.innerHTML = `
            <div class="gallery-header">
                <h3 style="margin: 0;">🖼️ 网页无水印大图提取画廊</h3>
                <button id="gallery-close-btn" class="remover-btn" style="background: #e74c3c;">关闭窗口</button>
            </div>
            <div class="gallery-grid" id="gallery-container"></div>
        `;
        document.body.appendChild(gallery);

        // ================= 事件交互绑定 =================
        // 展开/折叠菜单
        floatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = menuBox.style.display === 'flex';
            menuBox.style.display = isVisible ? 'none' : 'flex';
        });

        document.addEventListener('click', () => {
            menuBox.style.display = 'none';
        });
        menuBox.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 切换开关
        const toggleSwitch = document.getElementById('remover-toggle-switch');
        toggleSwitch.addEventListener('change', (e) => {
            config.removeRestrictions = e.target.checked;
            if (config.removeRestrictions) {
                enableRemover();
            } else {
                disableRemover();
            }
        });

        // 提取图片画廊逻辑
        const fetchImagesBtn = document.getElementById('remover-fetch-images');
        const galleryContainer = document.getElementById('gallery-container');
        const closeGalleryBtn = document.getElementById('gallery-close-btn');

        fetchImagesBtn.addEventListener('click', () => {
            menuBox.style.display = 'none';
            galleryContainer.innerHTML = '';
            
            // 抓取页面所有图片链接（去重并过滤无效链接）
            const imgUrls = new Set();
            document.querySelectorAll('img').forEach(img => {
                const src = img.src || img.getAttribute('data-src');
                if (src && src.startsWith('http')) {
                    imgUrls.add(src);
                }
            });

            if (imgUrls.size === 0) {
                alert('未在此页面上找到有效图片。');
                return;
            }

            imgUrls.forEach(url => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img src="${url}" loading="lazy" />
                    <button class="gallery-download-btn" data-url="${url}">保存</button>
                `;
                galleryContainer.appendChild(item);
            });

            // 绑定下载按钮
            galleryContainer.querySelectorAll('.gallery-download-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const downloadUrl = e.target.getAttribute('data-url');
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = 'extracted_image';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            });

            gallery.style.display = 'flex';
        });

        closeGalleryBtn.addEventListener('click', () => {
            gallery.style.display = 'none';
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        initUI();
    }

    console.log("%c⚡ 全能网页限制解除与媒体一键提取助手已激活！觉得好用可以支持作者哦：" + config.afdianLink, "color: #3390FF; font-weight: bold; font-size: 12px;");
})();
