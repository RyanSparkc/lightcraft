# Vue.js 電商專案開發檢查清單

## 📋 專案功能清單

### ✅ 已完成功能

#### 🛒 結帳流程 API 整合與商品列表顯示修正
**完成日期:** 2024-12-19

**功能細節:**
- **功能目的:** 修正結帳流程中的 API 調用問題，確保地址頁面正確建立訂單，付款頁面顯示完整的商品列表與金額資訊
- **實作組件與模組:**
  - `CheckoutAddress.vue` - 地址頁面，按照 API 文件正確調用建立訂單 API
  - `CheckoutPayment.vue` - 付款頁面，新增商品列表顯示和保存購物車資料功能
  - `cartStore.js` - 修正 payOrder 方法，符合 API 規格要求
  - localStorage 機制，保存訂單建立前的購物車資料

- **API 規格與整合方式:**
  - 建立訂單 API: `POST /v2/api/{api_path}/order`
    - 請求格式: `{ data: { user: { name, email, tel, address }, message } }`
    - 回應: `{ success: true, orderId: "xxx", message: "已建立訂單" }`
  - 付款 API: `POST /v2/api/{api_path}/pay/{order_id}`
    - 無需額外 body 參數，直接 POST 到指定 orderId 即可完成付款

- **資料流程描述:**
  1. 用戶在 `CheckoutAddress.vue` 填寫資訊，點擊「建立訂單並前往付款」
  2. 建立訂單前先保存購物車資料到 localStorage
  3. 調用 createOrder API 建立訂單，獲得 orderId
  4. 跳轉到 `CheckoutPayment.vue?orderId=xxx`
  5. 付款頁面從 localStorage 載入保存的購物車資料顯示商品列表
  6. 用戶確認付款，調用 payOrder API
  7. 付款成功後清除暫存資料，跳轉到完成頁面

**開發歷程與錯誤記錄:**

**遇到的挑戰:**
- 結帳流程中 API 調用時機混亂：原本在付款頁面重複建立訂單
- 付款頁面商品資訊缺失：訂單建立後購物車被清空，無法顯示商品列表
- API 參數格式問題：付款 API 不需要額外參數但程式碼傳送了不必要的資料

**錯誤現象與解決方案:**

1. **問題:** 地址頁面沒有調用建立訂單 API
   ```javascript
   // ❌ 原本只保存地址資料
   localStorage.setItem('checkoutAddress', JSON.stringify(this.form));
   this.$router.push('/checkout/payment');
   
   // ✅ 修正：建立訂單並傳遞 orderId
   const response = await this.createOrder(orderData);
   this.$router.push(`/checkout/payment?orderId=${response.orderId}`);
   ```

2. **問題:** 付款頁面商品列表為空，金額顯示 0
   ```javascript
   // ❌ 問題原因：訂單建立後購物車被清空
   async createOrder(orderData) {
     const res = await axios.post('/order', { data: orderData });
     this.getCart(); // 這裡會重新獲取購物車，通常為空
   }
   
   // ✅ 解決方案：建立訂單前保存購物車資料
   // CheckoutAddress.vue
   const cartData = { carts: this.carts, total: this.total, final_total: this.final_total };
   localStorage.setItem('orderCartData', JSON.stringify(cartData));
   
   // CheckoutPayment.vue
   mounted() {
     const savedCartData = localStorage.getItem('orderCartData');
     if (savedCartData) {
       this.orderCartData = JSON.parse(savedCartData);
     }
   }
   ```

3. **問題:** 付款 API 調用格式錯誤
   ```javascript
   // ❌ 錯誤：傳送不必要的參數
   async payOrder(orderId, paymentMethod) {
     await axios.post(`/pay/${orderId}`, { 
       data: { payment_method: paymentMethod } 
     });
   }
   
   // ✅ 正確：根據 API 文件，不需額外參數
   async payOrder(orderId) {
     await axios.post(`/pay/${orderId}`);
   }
   ```

4. **問題:** 付款頁面 UI 缺少商品列表
   ```html
   <!-- ❌ 原本只有總額資訊 -->
   <div class="info-item">
     <div class="info-label">商品總額</div>
     <div class="info-value">NT$ {{ formattedTotal }}</div>
   </div>
   
   <!-- ✅ 新增商品列表顯示 -->
   <div class="order-items mb-3">
     <h4 class="items-subtitle mb-2">訂購商品</h4>
     <div class="order-item" v-for="item in displayCarts" :key="item.id">
       <div class="item-info">
         <div class="item-name">{{ item.product.title }}</div>
         <div class="item-details">
           <span class="item-qty">數量: {{ item.qty }}</span>
           <span class="item-price">NT$ {{ item.product.price.toLocaleString() }}</span>
         </div>
       </div>
       <div class="item-total">
         NT$ {{ (item.product.price * item.qty).toLocaleString() }}
       </div>
     </div>
   </div>
   ```

**經驗總結與學習心得:**
- 📋 **API 時序:** 建立訂單應在地址確認階段，付款階段只處理付款邏輯
- 💾 **資料保存:** 當 API 操作會改變狀態時，需要提前保存必要的顯示資料
- 📝 **API 文件:** 嚴格按照 API 文件的參數格式，避免傳送不必要的資料
- 🎯 **用戶體驗:** 付款前用戶需要能清楚看到購買的商品列表和金額明細
- 🔧 **資料流設計:** localStorage 適合暫存跨頁面的業務資料，但要記得清理
- 🛠️ **除錯技巧:** 先確認 API 調用是否成功，再處理前端顯示邏輯

---

#### 🛒 結帳流程與訂單管理功能
**完成日期:** 2024-12-19

**功能細節:**
- **功能目的:** 實現完整的購物車結帳流程，包括訂單建立、API 整合、訂單完成頁面顯示及訂單詳情查看
- **實作組件與模組:**
  - `CheckoutPayment.vue` - 付款頁面，整合 cartStore 的 createOrder 功能
  - `CheckoutComplete.vue` - 訂單完成頁面，顯示實際的訂單 ID
  - `OrderDetailView.vue` - 訂單詳情頁面，透過 API 獲取真實訂單資料
  - `cartStore.js` - 購物車狀態管理，包含 createOrder 方法
  - 路由配置更新，支援動態訂單 ID 參數

- **API 規格與整合方式:**
  - 建立訂單 API: `POST /v2/api/{api_path}/order`
    - 請求格式: `{ data: { user: {...}, message: '' } }`
    - 回應包含 `orderId` 用於後續查詢
  - 獲取訂單詳情 API: `GET /v2/api/{api_path}/order/{order_id}`
    - 回應包含完整訂單資訊、商品清單、用戶資料

- **資料流程描述:**
  1. 用戶在 `CheckoutAddress.vue` 填寫配送資訊，資料存儲至 localStorage
  2. `CheckoutPayment.vue` 整合購物車資料與配送資訊，調用 cartStore.createOrder()
  3. 訂單建立成功後，跳轉至 `CheckoutComplete.vue/{orderId}`
  4. 完成頁面顯示實際訂單 ID，提供查看詳情按鈕
  5. `OrderDetailView.vue` 根據路由參數中的訂單 ID 調用 API 獲取詳細資料

**開發歷程與錯誤記錄:**

**遇到的挑戰:**
- 路由參數傳遞：需要修改路由配置支援動態 orderId 參數
- 資料狀態管理：確保訂單建立後能正確傳遞 ID 到完成頁面
- API 錯誤處理：處理訂單不存在或 API 調用失敗的情況

**錯誤現象與解決方案:**

1. **問題:** 訂單建立後跳轉時沒有傳遞訂單 ID
   ```javascript
   // ❌ 錯誤寫法
   this.$router.push('/checkout/complete');
   
   // ✅ 正確寫法  
   this.$router.push(`/checkout/complete/${response.orderId}`);
   ```

2. **問題:** 路由不支援動態參數
   ```javascript
   // ❌ 錯誤路由配置
   { path: 'complete', component: CheckoutComplete }
   
   // ✅ 正確路由配置
   { path: 'complete/:orderId?', component: CheckoutComplete }
   ```

3. **問題:** 訂單詳情頁面使用模擬資料
   ```javascript
   // ❌ 使用模擬資料
   getOrder(orderId) {
     console.log('獲取訂單：', orderId);
     // 目前使用模擬數據
   }
   
   // ✅ 實際 API 調用
   async getOrder(orderId) {
     const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
     const response = await axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/order/${orderId}`);
     this.order = response.data.order;
   }
   ```

4. **問題:** ESLint 程式碼品質錯誤
   ```javascript
   // ❌ 使用 alert() 和 console 語句
   alert('請先完成配送資訊填寫');
   console.log('訂單建立成功:', response);
   console.error('訂單建立失敗:', error);
   
   // ✅ 使用 toast 通知系統
   this.addMessage({
     title: '提醒',
     content: '請先完成配送資訊填寫',
     style: 'warning',
   });
   // 移除不必要的 console 語句，錯誤處理交由 store
   ```

**經驗總結與學習心得:**
- 📝 **路由設計:** 動態路由參數要在設計初期就考慮，避免後期重構
- 🔄 **狀態傳遞:** 重要資料（如訂單 ID）應通過路由參數而非 localStorage 傳遞
- 🛡️ **錯誤處理:** API 調用需要完善的錯誤處理機制，包括 loading 狀態和錯誤提示
- 🎯 **用戶體驗:** 訂單流程要確保每個步驟都有明確的視覺反饋
- 🔧 **開發調試:** 使用 console.log 追蹤資料流向，確保每個步驟的資料正確性
- 🔍 **程式碼品質:** 遵循 ESLint 規範，避免使用 alert() 和不必要的 console 語句，保持程式碼整潔

---

### 🔄 進行中功能

- 暫無

### 📋 待辦功能

- [ ] 付款狀態更新與通知
- [ ] 訂單狀態追蹤優化
- [ ] 發票功能實作
- [ ] 退貨/退款流程

---

## 🔧 技術架構

- **框架:** Vue 3 (Options API)
- **狀態管理:** Pinia
- **路由:** Vue Router 4
- **HTTP 客戶端:** Axios
- **UI 框架:** Bootstrap 5
- **動畫:** Lottie (vue3-lottie)

## 📚 開發規範

- 遵循 ESLint Airbnb 規範
- 使用 camelCase 命名變數和方法
- 組件檔名使用 PascalCase
- API 調用統一在 stores 中處理
- 錯誤處理使用 toast 通知系統 