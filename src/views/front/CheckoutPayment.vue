<template>
  <div class="container my-5">
    <h2 class="section-title mb-4">付款與訂單確認</h2>

    <div class="row">
      <!-- 左側：購物車商品列表 -->
      <div class="col-lg-7 mb-4 mb-lg-0">
        <div class="cart-items-card">
          <h3 class="card-title">購物車商品</h3>

          <div
            v-if="cartStore.carts && cartStore.carts.length > 0"
            class="cart-items"
          >
            <div
              v-for="item in cartStore.carts"
              :key="item.id"
              class="cart-item"
            >
              <div class="item-image">
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.title"
                  class="img-fluid rounded"
                />
              </div>
              <div class="item-details">
                <h5 class="item-title">{{ item.product.title }}</h5>
                <div class="item-category">{{ item.product.category }}</div>
                <div class="item-quantity">數量：{{ item.qty }}</div>
              </div>
              <div class="item-price">
                <div class="price">NT$ {{ formatPrice(item.total) }}</div>
                <div
                  v-if="item.product.origin_price > item.product.price"
                  class="original-price"
                >
                  NT$ {{ formatPrice(item.product.origin_price * item.qty) }}
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-cart-message">
            購物車中沒有商品，請先選購商品。
          </div>
        </div>
      </div>

      <!-- 右側：寄送地址、付款方式與訂單資訊 -->
      <div class="col-lg-5">
        <!-- 寄送地址摘要 -->
        <div class="info-card mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="card-title mb-0">寄送地址</h3>
            <button class="btn-edit" @click="goToAddress">
              <i class="bi bi-pencil-fill"></i> 編輯
            </button>
          </div>
          <div class="address-summary">
            <div v-if="addressData">
              <div>
                <span class="fw-medium">姓名：</span>{{ addressData.name }}
              </div>
              <div>
                <span class="fw-medium">電話：</span>{{ addressData.phone }}
              </div>
              <div>
                <span class="fw-medium">Email：</span>{{ addressData.email }}
              </div>
              <div>
                <span class="fw-medium">地址：</span>{{ addressData.address }}
              </div>
            </div>
            <div v-else class="text-muted">尚未填寫寄送資訊</div>
          </div>
        </div>

        <!-- 付款方式選擇 -->
        <div class="info-card mb-4">
          <h3 class="card-title mb-3">選擇付款方式</h3>

          <div class="payment-options">
            <div
              class="payment-option"
              :class="{ active: paymentMethod === 'credit' }"
              @click="selectPayment('credit')"
            >
              <div class="payment-radio">
                <div
                  class="radio-inner"
                  v-if="paymentMethod === 'credit'"
                ></div>
              </div>
              <div class="payment-label">
                <span class="payment-name">信用卡付款</span>
                <span class="payment-desc">Visa, Mastercard, JCB</span>
              </div>
            </div>

            <div
              class="payment-option"
              :class="{ active: paymentMethod === 'transfer' }"
              @click="selectPayment('transfer')"
            >
              <div class="payment-radio">
                <div
                  class="radio-inner"
                  v-if="paymentMethod === 'transfer'"
                ></div>
              </div>
              <div class="payment-label">
                <span class="payment-name">銀行轉帳</span>
                <span class="payment-desc">收到款項後才出貨</span>
              </div>
            </div>

            <div
              class="payment-option"
              :class="{ active: paymentMethod === 'atm' }"
              @click="selectPayment('atm')"
            >
              <div class="payment-radio">
                <div class="radio-inner" v-if="paymentMethod === 'atm'"></div>
              </div>
              <div class="payment-label">
                <span class="payment-name">ATM 轉帳</span>
                <span class="payment-desc">收到款項確認後才出貨</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 訂單資訊摘要 -->
        <div class="info-card">
          <h3 class="card-title">訂單資訊</h3>
          <div class="info-item">
            <div class="info-label">商品小計</div>
            <div class="info-value">NT$ {{ formatPrice(cartStore.total) }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">運費</div>
            <div class="info-value">NT$ 0</div>
          </div>
          <div v-if="showCoupon" class="info-item">
            <div class="info-label">已套用優惠券</div>
            <div class="info-value text-success">
              {{ cartStore.carts[0].coupon.code }}
            </div>
          </div>
          <div v-if="showCoupon" class="info-item">
            <div class="info-label">折扣金額</div>
            <div class="info-value text-success">
              -NT$ {{ formatPrice(discountAmount) }}
            </div>
          </div>
          <div class="info-item total">
            <div class="info-label">總計</div>
            <div class="info-value text-danger">
              NT$ {{ formatPrice(cartStore.final_total) }}
            </div>
          </div>
        </div>

        <!-- 安全說明 -->
        <div class="security-notice mt-2 mb-2">
          <i class="bi bi-shield-lock me-2"></i>
          所有交易均使用SSL加密技術進行保護，確保您的個人資料安全。
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-3">
      <button class="btn-secondary" @click="$router.push('/checkout/address')">
        上一步
      </button>
      <button class="btn-primary" @click="nextStep">確認付款並送出訂單</button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useCartStore from '@/stores/cartStore';

export default {
  name: 'CheckoutPayment',
  data() {
    return {
      paymentMethod: 'credit',
      addressData: null,
    };
  },
  computed: {
    ...mapStores(useCartStore),
    showCoupon() {
      return this.cartStore.carts
        && this.cartStore.carts.length > 0
        && this.cartStore.carts[0].coupon;
    },
    discountAmount() {
      if (this.showCoupon) {
        return this.cartStore.total - this.cartStore.final_total;
      }
      return 0;
    },
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    selectPayment(method) {
      this.paymentMethod = method;
    },
    goToAddress() {
      this.$router.push('/checkout/address');
    },
    nextStep() {
      // 直接前往完成頁面，跳過review
      this.$router.push('/checkout/complete');
    },
    loadAddressData() {
      // 從本地存儲中獲取地址數據
      const addressData = localStorage.getItem('checkoutAddress');
      if (addressData) {
        this.addressData = JSON.parse(addressData);
      }
    },
  },
  mounted() {
    this.loadAddressData();
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

/* 購物車商品列表樣式 */
.cart-items-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-height: 0;
  max-height: none;
  border: 1px solid #ddd;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 70px;
  height: 70px;
  margin-right: 1rem;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex-grow: 1;
  padding-right: 1rem;
}

.item-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.item-category {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.item-quantity {
  font-size: 0.9rem;
  color: #666;
}

.item-price {
  text-align: right;
  min-width: 100px;
}

.price {
  font-weight: 600;
  color: #333;
}

.original-price {
  font-size: 0.85rem;
  color: #999;
  text-decoration: line-through;
}

.empty-cart-message {
  padding: 2rem 0;
  text-align: center;
  color: #888;
}

/* 表單樣式 */
.info-card {
  background: white;
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.8rem;
  min-height: 0;
  height: auto;
  overflow: visible;
  border: 1px solid #ddd;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #eee;
}

.address-summary {
  color: #555;
  line-height: 1.4;
  font-size: 0.95rem;
}

/* 付款選項樣式 */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.payment-option:hover {
  border-color: #ddd;
  background-color: #f9f9f9;
}

.payment-option.active {
  border-color: #333;
  background-color: #f5f5f5;
}

.payment-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #999;
  margin-right: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-option.active .payment-radio {
  border-color: #333;
}

.radio-inner {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #333;
}

.payment-label {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.payment-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.15rem;
  font-size: 0.95rem;
}

.payment-desc {
  font-size: 0.85rem;
  color: #888;
}

/* 訂單資訊卡片樣式 */
.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #f5f5f5;
  font-size: 0.95rem;
}

.info-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-item.total {
  border-top: 1px solid #eee;
  margin-top: 0.4rem;
  padding-top: 0.6rem;
  font-weight: 600;
  font-size: 1rem;
}

.info-label {
  color: #666;
}

.info-value {
  font-weight: 500;
  color: #333;
}

/* 安全說明 */
.security-notice {
  font-size: 0.85rem;
  color: #666;
  padding: 0.25rem 0;
  text-align: center;
}

/* 編輯按鈕 */
.btn-edit {
  background: transparent;
  color: #555;
  border: 1px solid #ddd;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: #f5f5f5;
  color: #333;
}

/* 左右欄位高度控制 */
.col-lg-7, .col-lg-5 {
  display: flex;
  flex-direction: column;
}
</style>
