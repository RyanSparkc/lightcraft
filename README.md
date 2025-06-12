# LightCraft - 專業燈具購物網站 💡

**Live Demo:** [點我查看線上網站](https://your-demo-link.com) &nbsp;&nbsp; | &nbsp;&nbsp; **專案 Repo:** [GitHub](https://github.com/your-repo-link)

> 點亮您的生活，從 LightCraft 開始。

一個使用 Vue 3、Vite 和 Pinia 技術棧打造的現代化燈具電商網站。從產品列表、購物車到文章專區，此專案完整模擬了一個真實世界的前端購物應用。

![專案首頁](docs/images/001.png)

---

## ✨ 專案亮點 (Features)

* **SPA 架構**：採用 Vue Router 實現快速、流暢的單頁應用體驗。
* **響應式設計**：使用 Bootstrap 5 確保在桌面、平板和手機上都有最佳瀏覽效果。
* **狀態管理**：透過 Pinia 集中管理購物車、使用者資訊等全域狀態。
* **模組化元件**：將 UI 切分為可複用的元件，提高開發效率與可維護性。
* **清晰的產品展示**：動態載入商品列表，包含分類篩選、價格、折扣與評價。
* **內容行銷**：設有文章專區，可發布與產品相關的內容，增加使用者互動。
* **環境變數管理**：使用 `.env` 檔案管理 API 路徑等敏感資訊，方便部署。

## 📸 專案截圖 (Screenshots)

| 商品列表頁 | 文章專區 |
| :---: | :---: |
| ![商品列表](docs/images/02.png) | ![文章專區](docs/images/03.png) |

## 🛠️ 技術棧 (Tech Stack)

* **前端框架**: Vue 3 (Options API / Composition API)
* **建置工具**: Vite
* **路由**: Vue Router 4
* **狀態管理**: Pinia
* **CSS 框架**: Bootstrap 5 & Sass
* **HTTP 客戶端**: Axios
* **程式碼規範**: ESLint (based on Airbnb)

---

## 🚀 快速開始 (Getting Started)

此章節將引導你如何將此專案安裝到你的電腦上並成功運行。

### 環境需求

* Node.js `v18.17.1` 或以上版本

### 1. 取得專案

從 GitHub 複製此專案：

```bash
git clone https://github.com/your-repo-link.git
cd your-project-folder
```

### 2. 安裝依賴套件

使用 `npm` 安裝所有需要的套件：

```bash
npm install
```

### 3. 設定環境變數

將 `.env.example` 檔案複製一份並重新命名為 `.env`。此檔案用於存放 API 路徑等環境變數。

```bash
cp .env.example .env
```

接著，請修改 `.env` 檔案中的內容：

```env
# API 伺服器路徑 (請填寫實際 API URL)
VITE_API_URL=https://your-api-server.com/api

# 您的 API Path (請填寫實際 API Path)
VITE_API_PATH=your-api-path
```

### 4. 啟動開發伺服器

執行以下指令，專案將會在 `http://localhost:5173` (預設) 上運行。

```bash
npm run dev
```

### 其他可用指令

* **建置專案 (用於生產環境)**:

  ```bash
  npm run build
  ```

* **檢查程式碼風格**:

  ```bash
  npm run lint
  ```

---

## 📁 資料夾結構

專案遵循標準的 Vue 專案結構，核心程式碼位於 `src` 資料夾。

```
/
├── docs/
│   └── images/          # 專案截圖
├── public/              # 不需編譯的靜態資源
├── src/
│   ├── assets/          # CSS, Fonts, Images
│   ├── components/      # 可複用 UI 元件
│   ├── router/          # Vue Router 路由設定
│   ├── stores/          # Pinia 狀態管理
│   ├── views/           # 頁面級元件
│   ├── App.vue          # 根元件
│   └── main.js          # 應用程式進入點
├── .eslintrc.js
├── package.json
├── README.md
└── vite.config.js
```

---
