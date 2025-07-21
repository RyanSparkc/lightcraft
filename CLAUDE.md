# CLAUDE.md

此文件為 Claude Code (claude.ai/code) 在此專案中工作時提供指導。

## 專案概述

這是一個名為 "LightCraft" 的 Vue 3 燈具電商網站。使用 Vite 建置，包含客戶端商店和管理後台。

## 開發指令

### 核心指令

- `npm run dev` - 啟動開發伺服器 (預設: <http://localhost:5173>)
- `npm run build` - 建置生產版本
- `npm run preview` - 本地預覽生產版本
- `npm run deploy` - 建置並部署到 GitHub Pages

### 代碼品質

- `npm run lint` - 執行 ESLint 檢查
- `npm run lint:fix` - 執行 ESLint 並自動修復

## 技術棧與架構

### 前端框架

- **Vue 3** 同時使用 Options API 和 Composition API 模式
- **Vite** 作為建置工具，支援熱模組替換
- **Vue Router 4** 用於客戶端路由，使用 hash 模式
- **Pinia** 用於狀態管理
- **Bootstrap 5** 配合自定義 SCSS 樣式
- **Axios** 配合 VueAxios 外掛處理 HTTP 請求

### 主要依賴套件

- `@ckeditor/ckeditor5-vue` - 文章富文本編輯器
- `vue-loading-overlay` - 載入指示器
- `lottie-web` & `vue3-lottie` - 動畫效果
- `swiper` - 觸控滑動元件
- `@stagewise/toolbar-vue` - 開發工具列

### 專案結構

```
src/
├── components/          # 可重用 UI 元件 (模態框、導覽列等)
├── views/
│   ├── front/          # 客戶端頁面
│   └── dashboard/      # 管理後台頁面
├── stores/             # Pinia 狀態管理
├── router/             # Vue Router 路由設定
├── composables/        # Vue 3 組合式 API
├── methods/            # 工具函數 (過濾器)
├── assets/             # SCSS、圖片、Lottie 檔案
└── main.js             # 應用程式入口點
```

## 狀態管理

### Pinia 狀態庫

- `cartStore.js` - 購物車操作與訂單管理
- `toastMessage.js` - 吐司通知系統

### 購物車狀態庫主要方法

- `getCart()` - 取得購物車資料
- `addToCart(id, qty)` - 新增商品至購物車
- `updateCartItem(item)` - 更新商品數量
- `removeCartItem(id)` - 移除單一商品
- `clearCart()` - 清空購物車
- `applyCoupon(code)` - 套用優惠券
- `createOrder(orderData)` - 從購物車建立訂單
- `payOrder(orderId)` - 處理付款

## 路由結構

### 前台路由 (/)

- `/` - 首頁
- `/products` - 商品列表
- `/product/:id` - 商品詳情
- `/cart` - 購物車
- `/checkout/` - 結帳流程 (地址 → 付款 → 完成)
- `/articles` - 文章列表
- `/article/:id` - 文章詳情
- `/orders` - 訂單歷史
- `/order/:id` - 訂單詳情

### 管理後台路由 (/admin)

- `/admin/products` - 商品管理
- `/admin/order` - 訂單管理
- `/admin/articles` - 文章管理
- `/admin/coupon` - 優惠券管理

## 環境變數設定

專案使用環境變數進行 API 設定：

- `VITE_APP_URL` - API 基礎網址
- `VITE_APP_PATH` - API 路徑前綴

複製 `.env.example` 為 `.env` 並設定這些值。

## 代碼風格與標準

### ESLint 設定

- 繼承 Airbnb 基礎設定
- Vue 3 核心規則
- 自定義規則：
  - 最大行長度: 150 字元
  - `no-console`: 警告等級
  - 多字元件名稱: 停用

### Vue 模式

- 混合使用 Options API 和 Composition API
- 較新元件使用 `<script setup>`
- 全域過濾器處理貨幣和日期格式
- 透過 `useModal` 組合式 API 包裝 Bootstrap Modal

## 元件架構

### 共用元件

- 模態框元件 (Product, Article, Order, Coupon, Delete, User)
- UI 元件 (Navbar, Pagination, ToastMessages, HeroSection)
- 版面元件 (PageHeader)

### 主要功能

- Bootstrap 5 整合自定義 SCSS
- 響應式設計支援手機/桌面
- 吐司通知系統
- 載入覆蓋層
- CKEditor 富文本編輯
- Lottie 動畫提升使用者體驗

## 開發注意事項

- 使用 `@` 別名指向 `src/` 目錄
- Vite 外掛整合 ESLint 於開發時期
- 自定義檔案清理用於建置輸出
- 支援透過 gh-pages 部署到 GitHub Pages
