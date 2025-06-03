<template>
  <div class="container my-5">
    <h2 class="section-title mb-4">付款方式</h2>

    <div class="row">
      <!-- 左欄：付款方式 -->
      <div class="col-md-8">
        <div class="form-card mb-4">
          <h3 class="payment-subtitle mb-3">選擇付款方式</h3>

          <div class="payment-options">
            <div class="payment-option">
              <input
                type="radio"
                id="credit"
                name="payment"
                value="credit"
                class="payment-radio"
                checked
              />
              <label for="credit" class="payment-label">
                <span class="payment-name">信用卡付款</span>
                <span class="payment-desc">Visa, Mastercard, JCB</span>
              </label>
            </div>

            <div class="payment-option">
              <input
                type="radio"
                id="transfer"
                name="payment"
                value="transfer"
                class="payment-radio"
              />
              <label for="transfer" class="payment-label">
                <span class="payment-name">銀行轉帳</span>
                <span class="payment-desc">收到款項後才出貨</span>
              </label>
            </div>

            <div class="payment-option">
              <input
                type="radio"
                id="atm"
                name="payment"
                value="atm"
                class="payment-radio"
              />
              <label for="atm" class="payment-label">
                <span class="payment-name">ATM 轉帳</span>
                <span class="payment-desc">收到款項確認後才出貨</span>
              </label>
            </div>
          </div>
        </div>

        <!-- 安全說明 -->
        <div class="security-info mt-3 mb-4">
          <div class="d-flex align-items-center">
            <i class="bi bi-shield-lock me-2"></i>
            <span>本站使用 SSL 加密技術，保障您的交易安全</span>
          </div>
        </div>
      </div>

      <!-- 右欄：訂單摘要 -->
      <div class="col-md-4">
        <div class="info-card">
          <h3 class="card-title">訂單資訊</h3>

          <!-- 優惠券輸入 -->
          <div class="coupon-section mb-3">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="couponCode"
                placeholder="請輸入優惠券代碼"
              />
              <button
                class="btn-apply"
                @click="applyCouponCode"
                :disabled="!couponCode.trim()"
              >
                套用
              </button>
            </div>
          </div>

          <div class="info-item">
            <div class="info-label">商品總額</div>
            <div class="info-value">NT$ {{ formattedTotal }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">運費</div>
            <div class="info-value">NT$ 0</div>
          </div>
          <div class="info-item">
            <div class="info-label">稅金</div>
            <div class="info-value">NT$ 0</div>
          </div>
          <div class="info-item discount" v-if="hasDiscount">
            <div class="info-label">優惠折扣</div>
            <div class="info-value">
              -NT$ {{ discountAmount.toLocaleString() }}
            </div>
          </div>
          <div class="info-item total">
            <div class="info-label">總計</div>
            <div class="info-value">NT$ {{ formattedFinalTotal }}</div>
          </div>

          <!-- 條款確認 -->
          <div class="terms-section mt-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="terms"
                checked
              />
              <label class="form-check-label" for="terms">
                我已閱讀並同意<a href="#" class="terms-link">服務條款</a>與<a
                  href="#"
                  class="terms-link"
                  >隱私政策</a
                >
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按鈕 -->
    <div class="d-flex justify-content-between mt-4">
      <button class="btn-secondary" @click="$router.back()">上一步</button>
      <button
        class="btn-primary"
        @click="completeOrder"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '處理中...' : '確認付款並送出訂單' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import useCartStore from '@/stores/cartStore';

export default {
  name: 'CheckoutPayment',
  data() {
    return {
      selectedPayment: 'credit',
      couponCode: '',
      isSubmitting: false,
      termsAccepted: true,
    };
  },
  computed: {
    ...mapState(useCartStore, ['carts', 'total', 'final_total']),
    formattedTotal() {
      return Math.round(this.total).toLocaleString();
    },
    formattedFinalTotal() {
      return Math.round(this.final_total).toLocaleString();
    },
    discountAmount() {
      return Math.round(this.total - this.final_total);
    },
    hasDiscount() {
      return this.discountAmount > 0;
    },
  },
  methods: {
    ...mapActions(useCartStore, ['getCart', 'applyCoupon', 'createOrder']),
    async applyCouponCode() {
      if (!this.couponCode.trim()) return;

      try {
        await this.applyCoupon(this.couponCode.trim());
        this.couponCode = '';
      } catch (error) {
        // 錯誤已在 store 中處理
      }
    },
    async completeOrder() {
      if (this.isSubmitting) return;

      try {
        this.isSubmitting = true;

        // 從 localStorage 取得配送資訊
        const addressData = JSON.parse(localStorage.getItem('checkoutAddress') || '{}');

        if (!addressData.name || !addressData.email || !addressData.phone || !addressData.address) {
          this.addMessage({
            title: '提醒',
            content: '請先完成配送資訊填寫',
            style: 'warning',
          });
          this.$router.push('/checkout/address');
          return;
        }

        // 準備訂單資料
        const orderData = {
          user: {
            name: addressData.name,
            email: addressData.email,
            tel: addressData.phone,
            address: addressData.address,
          },
          message: addressData.message || '',
        };

        // 提交訂單
        const response = await this.createOrder(orderData);

        // 清除 localStorage 中的配送資訊
        localStorage.removeItem('checkoutAddress');

        // 跳轉到完成頁面，攜帶訂單 ID
        this.$router.push(`/checkout/complete/${response.orderId}`);
      } catch (error) {
        // 錯誤訊息已在 store 中處理
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    // 載入購物車資料
    this.getCart();
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.payment-subtitle, .cart-subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #444;
}

/* 表單與卡片樣式 */
.form-card, .info-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 付款選項樣式 */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.payment-option:hover {
  border-color: #ccc;
}

.payment-radio {
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.payment-label {
  display: flex;
  flex-direction: column;
  margin: 0;
  cursor: pointer;
  width: 100%;
}

.payment-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.payment-desc {
  font-size: 0.9rem;
  color: #888;
}

/* 訂單資訊卡片樣式 */
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-item.total {
  border-top: none;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
}

.info-item.discount {
  color: #dc3545;
}

.info-item:nth-last-child(2) {
  border-bottom: 2px solid #eee;
}

.info-label {
  font-weight: 500;
  color: #666;
}

.info-value {
  font-weight: 600;
  color: #333;
}

/* 優惠券輸入樣式 */
.coupon-section {
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
}

.form-control {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-apply {
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 8px 8px 0;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-apply:hover {
  background: #eee;
}

/* 條款確認樣式 */
.terms-section {
  font-size: 0.85rem;
}

.terms-link {
  color: #007bff;
  text-decoration: underline;
}

/* 安全說明樣式 */
.security-info {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

/* 按鈕樣式 */
.btn-primary {
  background: #333;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #222;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
</style>
