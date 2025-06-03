<template>
  <div class="container my-5">
    <h2 class="mb-4">訂單確認</h2>
    <p>此處待實作訂單確認內容，如購物車明細及金額。</p>
    <div class="d-flex justify-content-between mt-4">
      <button class="btn-secondary" @click="$router.back()">上一步</button>
      <button class="btn-primary">確認送出訂單</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutReview',
};
</script>

<style scoped>
/* 按鈕樣式 - 從 CheckoutPayment.vue 複製 */
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
