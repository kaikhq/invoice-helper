# Invoice Generator

Invoice Generator 是一個基於 React、TypeScript 與 Vite 的輕量級發票生成網頁應用程式，主要用途是讓使用者能夠透過填寫表單來生成、預覽及計算發票金額，並可利用 URL 參數預設部分欄位數據。此專案同時內建 Cloudflare Pages 與 Wrangler 部署相關設定，使部署更為簡便。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kaikhq/invoice-helper/)

## 目錄

- [Invoice Generator](#invoice-generator)
  - [目錄](#目錄)
  - [功能簡介](#功能簡介)
  - [技術棧](#技術棧)
  - [快速開始](#快速開始)
    - [前置需求](#前置需求)
    - [安裝專案依賴](#安裝專案依賴)
    - [本地開發](#本地開發)
    - [建置專案](#建置專案)
    - [預覽建置產物](#預覽建置產物)
  - [專案結構](#專案結構)
  - [貢獻指南](#貢獻指南)
  - [授權條款](#授權條款)
  - [特別感謝](#特別感謝)

## 功能簡介

- **發票生成**：使用者可以輸入買家資訊、統一編號、金額、發票品項等資訊，自動計算發票金額（支援總額或未稅金額計算），並依據稅率類型（一般、零稅率、免稅）做相應調整。
- **預覽發票**：即時預覽生成的發票格式，並支援移動裝置顯示摘要資訊。
- **URL 預填功能**：可透過 URL 查詢參數（如 uniformNumber、amount、itemName）自動填入資訊，方便快速生成發票。
- **響應式設計**：使用 Tailwind CSS 實現現代化、響應式且易於擴展的 UI 風格。
- **部署整合**：內建 Cloudflare Pages 與 Wrangler 的設定，支持快速部署至 Cloudflare Workers 平台。
- **截圖功能**：依賴 html2canvas，可選擇未來加入將發票預覽截圖下載或分享的功能。

## 技術棧

- [React](https://reactjs.org/) · 構建互動式 UI
- [TypeScript](https://www.typescriptlang.org/) · 提供靜態型別檢查
- [Vite](https://vitejs.dev/) · 極速開發與構建工具
- [Tailwind CSS](https://tailwindcss.com/) · 高效的 CSS 寫法
- [Cloudflare Pages](https://pages.cloudflare.com/) & [Wrangler](https://developers.cloudflare.com/workers/wrangler/) · 部署與運行無服務器應用
- 其他依賴：date-fns、date-fns-tz、html2canvas 以及 lucide-react

## 快速開始

### 前置需求

- Node.js (建議版本 >= 14)
- npm 或 yarn

### 安裝專案依賴

```bash
npm install
# 或者使用 yarn:
yarn install
```

### 本地開發

啟動開發伺服器：

```bash
npm run dev
```

專案會開啟在預設的 Vite 開發伺服器上，通常是 <http://localhost:3000。>

### 建置專案

```bash
npm run build
```

### 預覽建置產物

```bash
npm run preview
```

## 專案結構

```
├── dist/                   // 打包後的產物
├── functions/              // Cloudflare Workers 相關函式與路由設定
├── node_modules/           // 依賴套件
├── src/                    // 前端原始碼
│   ├── components/         // UI 組件（如 InvoiceForm、InvoicePreview、FormCard、PreviewCard、AdCard、MobileCalculationSummary）
│   ├── hooks/              // 自定義 React hooks
│   ├── services/           // 與後端或外部 API 整合的服務函式
│   ├── types/              // TypeScript 型別定義
│   ├── utils/              // 工具函式（如 invoiceUtils, dateUtils）
│   ├── App.tsx             // 主要 App component
│   └── main.tsx            // 應用程式進入點
├── public/ 或 index.html   // HTML 範本
├── package.json            // 專案依賴與腳本
├── tsconfig.json           // TypeScript 設定檔
├── vite.config.ts          // Vite 設定檔
├── tailwind.config.js      // Tailwind CSS 設定檔
├── postcss.config.js       // PostCSS 設定
└── wrangler.toml           // Cloudflare Workers Pages 配置
```

## 貢獻指南

歡迎任何形式的貢獻！如果你發現問題或有改進建議，請提出 issue 或直接提交 pull request。

1. Fork 此專案。
2. 建立你的 feature branch (`git checkout -b feature/你的功能描述`)
3. Commit 你的更改 (`git commit -m '新增一些功能'`)
4. Push 到該 branch (`git push origin feature/你的功能描述`)
5. 提交 pull request，描述你的更改內容。

## 授權條款

本專案採用 [MIT License](LICENSE) 授權，詳細條款請參閱 LICENSE 文件。

## 特別感謝

- [台灣公司資料](https://company.g0v.ronny.tw/) 提供統一編號查詢服務

---

Invoice Generator 旨在提供一個簡單且高效的解決方案，協助使用者快速生成符合規範的發票。希望這對你的業務流程帶來便利與效率！
