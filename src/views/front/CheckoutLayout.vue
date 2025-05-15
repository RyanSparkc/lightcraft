<template>
  <div class="checkout-layout container my-5">
    <!-- 結帳步驟指示器 -->
    <div class="checkout-steps mb-5">
      <div class="step" :class="{ active: activeStep >= 1 }">
        <div class="step-number">1</div>
        <div class="step-label">寄送資訊</div>
      </div>
      <div class="step" :class="{ active: activeStep >= 2 }">
        <div class="step-number">2</div>
        <div class="step-label">付款與訂單確認</div>
      </div>
      <div class="step" :class="{ active: activeStep >= 3 }">
        <div class="step-number">3</div>
        <div class="step-label">完成訂單</div>
      </div>
    </div>
    <div class="checkout-content">
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutLayout',
  computed: {
    activeStep() {
      const { path } = this.$route;
      if (path.includes('/checkout/address')) return 1;
      if (path.includes('/checkout/payment')) return 2;
      if (path.includes('/checkout/complete')) return 3;
      return 1;
    },
  },
};
</script>

<style scoped>
/* 確保結帳頁面至少佔滿視窗高度 */
.checkout-layout {
  /* min-height: calc(100vh - 200px); 減去頁首頁尾和其他固定元素的高度 */
  display: flex;
  flex-direction: column;
}

.checkout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 步驟指示器樣式 */
.checkout-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 2rem 0;
}

.checkout-steps::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  flex: 1;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 8px;
  border: 2px solid white;
  transition: all 0.3s ease;
}

.step-label {
  font-size: 14px;
  color: #888;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background-color: #333;
  color: white;
}

.step.active .step-label {
  color: #333;
  font-weight: 500;
}
</style>
