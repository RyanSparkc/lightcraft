<template>
  <div class="container my-5">
    <h2 class="section-title mb-4">付款方式</h2>

    <div class="row">
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
      </div>

      <div class="col-md-4">
        <div class="info-card">
          <h3 class="card-title">訂單資訊</h3>
          <div class="info-item">
            <div class="info-label">金額</div>
            <div class="info-value">NT$ 2,560</div>
          </div>
          <div class="info-item">
            <div class="info-label">運費</div>
            <div class="info-value">NT$ 0</div>
          </div>
          <div class="info-item total">
            <div class="info-label">總計</div>
            <div class="info-value">NT$ 2,560</div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4">
      <button class="btn-secondary" @click="$router.back()">上一步</button>
      <button class="btn-primary" @click="nextStep">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPayment',
  methods: {
    nextStep() {
      this.$router.push('/checkout/review');
    },
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.payment-subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #444;
}

/* 表單樣式 */
.form-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
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
.info-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
}

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
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-item.total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
}

.info-label {
  font-weight: 500;
  color: #666;
}

.info-value {
  font-weight: 600;
  color: #333;
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
